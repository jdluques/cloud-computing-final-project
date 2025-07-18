import json
import decimal
from db.purchases_queries import get_purchases
from utils.validate_list import validate_limit
from utils.token_handler import AuthMiddleware

# CORS headers globales
cors_headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
}

def default_serializer(obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    raise TypeError(f"Type {type(obj)} not serializable")

def lambda_handler(event, context):
    try:
        # Extraer y validar token JWT del header Authorization
        decoded_token = AuthMiddleware.validate_token(event['headers'].get('Authorization'))
        tenant_id = decoded_token["tenantId"]
        user_id = decoded_token["user_id"]

        # Leer parámetros desde queryStringParameters (GET)
        params = event.get('queryStringParameters') or {}
        limit = int(params.get('limit', 10))
        last_evaluated_key = params.get('lastEvaluatedKey')

        # Validar el limit
        validate_limit(limit)

        # Consultar compras usando el queries con FilterExpression para user_id
        purchases, new_last_evaluated_key = get_purchases(tenant_id, user_id, limit, last_evaluated_key)

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "purchases": purchases,
                "lastEvaluatedKey": new_last_evaluated_key,
                "message": "Purchases listed successfully"
            }, default=default_serializer)
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({
                "message": "Failed to list purchase",
                "error": str(e)
            }),
        }
