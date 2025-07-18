const responseBuilder = require('./utils/responseBuilder');const paginationHelper = require('./utils/paginationHelper');
const authMiddleware = require('./utils/authMiddleware');
const axios = require('axios');

console.log("✅ listProducts.js cargado");

const ES_HOST = "http://34.235.251.214";

const TENANT_PORTS = {
  "ESP": "9217",
  "MEX": "9213",
  "ARG": "9202",
  "COL": "9205",
  "PER": "9201",
  "CHL": "9204",
  "CUB": "9207",
  "VEN": "9219",
  "URY": "9218",
  "DOM": "9208"
};


module.exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    console.log("🟡 Preflight OPTIONS recibido");
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: "CORS preflight OK" })
    };
  }

  try {
    const { limit } = paginationHelper.getPaginationParams(event);
    const queryParams = event.queryStringParameters || {};
    const decodedToken = authMiddleware.validateToken(event.headers.Authorization);
    const tenant_id = decodedToken.tenantId;
    const port = TENANT_PORTS[tenant_id];

    // ------------------------ Fuzzy ------------------------
    if (queryParams.term) {
      const url = `${ES_HOST}:${port}/${tenant_id.toLowerCase()}/_search`;
      const esQuery = {
        query: {
          match: {
            name: {
              query: queryParams.term,
              fuzziness: "AUTO"
            }
          }
        },
        size: limit
      };
      const { data } = await axios.post(url, esQuery);
      const hits = data.hits.hits.map(hit => hit._source);
      return responseBuilder.success({ items: hits });
    }

    // ------------------------ Prefix ------------------------
    if (queryParams.prefix) {
      const url = `${ES_HOST}:${port}/${tenant_id.toLowerCase()}/_search`;
      const esQuery = {
        query: {
          prefix: {
            name: queryParams.prefix.toLowerCase()
          }
        },
        size: limit
      };
      const { data } = await axios.post(url, esQuery);
      const hits = data.hits.hits.map(hit => hit._source);
      return responseBuilder.success({ items: hits });
    }

    // ------------------------ Autocomplete ------------------------
    if (queryParams.autocomplete) {
      const url = `${ES_HOST}:${port}/${tenant_id.toLowerCase()}/_search`;
      const esQuery = {
        query: {
          prefix: {
            name: queryParams.autocomplete.toLowerCase()
          }
        },
        size: 5
      };
      const { data } = await axios.post(url, esQuery);
      const hits = data.hits.hits.map(hit => hit._source);
      return responseBuilder.success({ items: hits });
    }

    // ------------------------ Global ------------------------
    if (queryParams.global === 'true') {
      console.log("🌐 Iniciando búsqueda global...");
      const allResults = [];

      for (const [tenant, tenantPort] of Object.entries(TENANT_PORTS)) {
        const url = `${ES_HOST}:${tenantPort}/${tenant.toLowerCase()}/_search`;
        const esQuery = {
          query: { match_all: {} },
          size: limit
        };

        try {
          console.log(`🔍 Consultando: ${url}`);
          const { data } = await axios.post(url, esQuery);
          const hits = data.hits.hits.map(hit => hit._source);
          allResults.push(...hits);
        } catch (err) {
          console.warn(`⚠️ No se pudo obtener productos de ${tenant}: ${err.code || err.message}`);
        }
      }

      if (allResults.length === 0) {
        console.error("❌ Ningún tenant respondió correctamente");
        return responseBuilder.error("No se pudo obtener productos de ningún tenant", 500);
      }

      console.log(`✅ Total productos globales: ${allResults.length}`);
      return responseBuilder.success({
        items: allResults.slice(0, limit)
      });
    }

    // ------------------------ Tenant normal ------------------------
    const url = `${ES_HOST}:${port}/${tenant_id.toLowerCase()}/_search`;
    const esQuery = {
      query: { match_all: {} },
      size: limit
    };
    const { data } = await axios.post(url, esQuery);
    const hits = data.hits.hits.map(hit => hit._source);

    return responseBuilder.success({ items: hits });

  } catch (error) {
    console.error("❌ Error en listProducts:", error);
    return responseBuilder.error("Error interno del servidor", 500);
  }
};
