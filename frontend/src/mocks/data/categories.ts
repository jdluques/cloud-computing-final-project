import { BookCategorySchema } from "@/types/contents/BookCategorySchema";
import { z } from "zod";

export const MOCK_CATEGORIES: z.infer<typeof BookCategorySchema>[] = [
  {
    title: "Manga y Cómics",
    slug: "manga-y-comics",
    subcategories: [
      {
        title: "Cómics",
        slug: "comics",
        items: [
          {
            title: "Marvel/DC",
            slug: "marvel-dc",
          },
          {
            title: "Cómics Clásicos",
            slug: "comics-clasicos",
          },
          {
            title: "Licencias",
            slug: "licencias",
          },
          {
            title: "Cómic Independiente",
            slug: "comic-independiente",
          },
          {
            title: "Cómic Infantil",
            slug: "comic-infantil",
          },
          {
            title: "Cómic Erótico",
            slug: "comic-erotico",
          },
          {
            title: "Cómic Efectos a IGV",
            slug: "comic-efectos-a-igv",
          },
        ],
      },
      {
        title: "Manga",
        slug: "manga",
        items: [
          {
            title: "Infantil (Kodomo)",
            slug: "infantil-kodomo",
          },
          {
            title: "Juvenil Femenino (Shojo)",
            slug: "juvenil-femenino-shojo",
          },
          {
            title: "Juvenil Masculino (Shonen)",
            slug: "juvenil-masculino-shonen",
          },
          {
            title: "Joven Adulto Femenino (Josei)",
            slug: "joven-adulto-femenino-josei",
          },
          {
            title: "Joven Adulto Masculino (Seinen)",
            slug: "joven-adulto-masculino-seinen",
          },
          {
            title: "Terror",
            slug: "terror",
          },
          {
            title: "Joven Adulto LGTB (Yaoi)",
            slug: "joven-adulto-lgtb-yaoi",
          },
        ],
      },
      {
        title: "Temas Relacionados al Comic y Manga",
        slug: "temas-relacionados-al-comic-y-manga",
        items: [
          {
            title: "Teoría del Cómic",
            slug: "teoria-del-comic",
          },
          {
            title: "Dibujo/Guión",
            slug: "dibujo-guion",
          },
          {
            title: "Dibujo de Manga",
            slug: "dibujo-de-manga",
          },
        ],
      },
      {
        title: "Humor Gráfico",
        slug: "humor-grafico",
        items: [
          {
            title: "Humor Gráfico",
            slug: "humor-grafico",
          },
        ],
      },
    ],
  },
  {
    title: "No Ficción",
    slug: "no-ficcion",
    subcategories: [
      {
        title: "Historia del Perú",
        slug: "historia-del-peru",
        items: [
          {
            title: "Mitos y Leyendas Peruanos",
            slug: "mitos-y-leyendas-peruanos",
          },
          {
            title: "Historia Peruana Contemporánea",
            slug: "historia-peruana-contemporanea",
          },
        ],
      },
      {
        title: "Historia Universal",
        slug: "historia-universal",
        items: [
          {
            title: "Historia Antigua",
            slug: "historia-antigua",
          },
          {
            title: "Historia Contemporánea",
            slug: "historia-contemporanea",
          },
          {
            title: "Historia de Latinoamérica",
            slug: "historia-de-latinoamerica",
          },
          {
            title: "Historia hasta el Siglo XIX",
            slug: "historia-hasta-el-siglo-xix",
          },
        ],
      },
      {
        title: "Derecho",
        slug: "derecho",
        items: [
          {
            title: "Derecho Civil",
            slug: "derecho-civil",
          },
          {
            title: "Derecho Internacional",
            slug: "derecho-internacional",
          },
          {
            title: "Derecho Constitucional",
            slug: "derecho-constitucional",
          },
          {
            title: "Teoría del Derecho",
            slug: "teoria-del-derecho",
          },
          {
            title: "Manuales de Derecho",
            slug: "manuales-de-derecho",
          },
        ],
      },
      {
        title: "Psicología",
        slug: "psicologia",
        items: [
          {
            title: "Psicología y Educación",
            slug: "psicologia-y-educacion",
          },
          {
            title: "Psicología Infantil",
            slug: "psicologia-infantil",
          },
          {
            title: "Temas de Pareja",
            slug: "temas-de-pareja",
          },
          {
            title: "Psicología Social",
            slug: "psicologia-social",
          },
        ],
      },
      {
        title: "Arqueología",
        slug: "arqueologia",
        items: [
          {
            title: "Sitio Arqueológicos",
            slug: "sitio-arqueologicos",
          },
          {
            title: "Textilería",
            slug: "textileria",
          },
        ],
      },
    ],
  },
  {
    title: "Libros Infantiles",
    slug: "libros-infantiles",
    subcategories: [
      {
        title: "Cuentos y Novelas Infantiles",
        slug: "cuentos-y-novelas-infantiles",
        items: [
          {
            title: "Cuentos Clásicos",
            slug: "cuentos-clasicos",
          },
          {
            title: "Cuentos Troquelados",
            slug: "cuentos-troquelados",
          },
          {
            title: "Cuentos Religiosos Infantiles",
            slug: "cuentos-religiosos-infantiles",
          },
          {
            title: "Novelas Clásicas Versión Infantil",
            slug: "novelas-clasicas-version-infantil",
          },
          {
            title: "Novelas y Series Infantiles",
            slug: "novelas-y-series-infantiles",
          },
        ],
      },
      {
        title: "Aprendizaje Temprano",
        slug: "aprendizaje-temprano",
        items: [
          {
            title: "Libros de Tela",
            slug: "libros-de-tela",
          },
          {
            title: "Libros con Texturas",
            slug: "libros-con-texturas",
          },
          {
            title: "Primeros Conceptos (Acortanados)",
            slug: "primeros-conceptos-acortanados",
          },
          {
            title: "Libros Sumergibles",
            slug: "libros-sumergibles",
          },
          {
            title: "Cuentos (Acortonados)",
            slug: "cuentos-acortonados",
          },
        ],
      },
      {
        title: "Libros de Actividades",
        slug: "libros-de-actividades",
        items: [
          {
            title: "Infantiles para Colorear",
            slug: "infantiles-para-colorear",
          },
          {
            title: "Libros con Stickers",
            slug: "libros-con-stickers",
          },
          {
            title: "Actividades de Conocimientos",
            slug: "actividades-de-conocimientos",
          },
          {
            title: "Dibujo y Pintura",
            slug: "dibujo-y-pintura",
          },
          {
            title: "Modelamientos, Construcción y Plastilina",
            slug: "modelamientos-construccion-y-plastilina",
          },
          {
            title: "Libros de Cocina para Niños",
            slug: "libros-de-cocina-para-ninos",
          },
        ],
      },
      {
        title: "Informativos, enciclopedia y deporte infantil",
        slug: "informativos-enciclopedia-y-deporte-infantil",
        items: [
          {
            title: "Temas Generales (Enciclopedia Infantil)",
            slug: "temas-generales-enciclopedia-infantil",
          },
          {
            title: "Dinosaurios (Enciclopedia Infantil)",
            slug: "dinosaurios-enciclopedia-infantil",
          },
          {
            title: "Ciencias Naturales (Enciclopedia Infantil)",
            slug: "ciencias-naturales-enciclopedia-infantil",
          },
          {
            title: "Historia (Enciclopedia Infantil)",
            slug: "historia-enciclopedia-infantil",
          },
          {
            title: "Deportes (Enciclopedia Infantil)",
            slug: "deportes-enciclopedia-infantil",
          },
          {
            title: "Libro sobre Animales",
            slug: "libro-sobre-animales",
          },
          {
            title: "Libro sobre Música",
            slug: "libro-sobre-musica",
          },
          {
            title: "Biografías Ilustradas",
            slug: "biografias-ilustradas",
          },
        ],
      },
    ],
  },
  {
    title: "Libros Juveniles",
    slug: "libros-juveniles",
    subcategories: [
      {
        title: "Ciencia Ficción Juvenil",
        slug: "ciencia-ficcion-juvenil",
        items: [
          {
            title: "Distopía Juvenil",
            slug: "distopia-juvenil",
          },
        ],
      },
      {
        title: "Fantasía Juvenil",
        slug: "fantasia-juvenil",
        items: [
          {
            title: "Fantasía Paranormal",
            slug: "fantasia-paranormal",
          },
          {
            title: "Fantasía Urbana",
            slug: "fantasia-urbana",
          },
        ],
      },
      {
        title: "Otras Obras Juveniles",
        slug: "otras-obras-juveniles",
        items: [
          {
            title: "Youtubers",
            slug: "youtubers",
          },
        ],
      },
    ],
  },
  {
    title: "Ficción",
    slug: "ficcion",
    subcategories: [
      {
        title: "Ciencia Ficción y Fantasía",
        slug: "ciencia-ficcion-y-fantasia",
        items: [
          {
            title: "Ciencia Ficción",
            slug: "ciencia-ficcion",
          },
          {
            title: "Fantasía",
            slug: "fantasia",
          },
        ],
      },
      {
        title: "Narrativa",
        slug: "narrativa",
        items: [
          {
            title: "Cuento Universal",
            slug: "cuento-universal",
          },
          {
            title: "Cuento Peruano",
            slug: "cuento-peruano",
          },
          {
            title: "Narrativa Peruana",
            slug: "narrativa-peruana",
          },
          {
            title: "Narrativa hispanoamericana",
            slug: "narrativa-hispanoamericana",
          },
          {
            title: "Narrativa Mundial",
            slug: "narrativa-mundial",
          },
          {
            title: "Narrativa Histórica",
            slug: "narrativa-historica",
          },
          {
            title: "Narrativa Romántica",
            slug: "narrativa-romantica",
          },
          {
            title: "Narrativa Erótica",
            slug: "narrativa-erotica",
          },
        ],
      },
      {
        title: "Poesía",
        slug: "poesia",
        items: [
          {
            title: "Poesía Peruana",
            slug: "poesia-peruana",
          },
          {
            title: "Poesía Hispanoamericana",
            slug: "poesia-hispanoamericana",
          },
          {
            title: "Poesía Mundial",
            slug: "poesia-mundial",
          },
          {
            title: "Poesía Juvenil",
            slug: "poesia-juvenil",
          },
        ],
      },
      {
        title: "Teatro y Danza",
        slug: "teatro-y-danza",
        items: [
          {
            title: "Teatro Hispanoamericano",
            slug: "teatro-hispanoamericano",
          },
          {
            title: "Teatro Mundial",
            slug: "teatro-mundial",
          },
          {
            title: "Teoría del Teatro",
            slug: "teoria-del-teatro",
          },
          {
            title: "Teatro Infantil",
            slug: "teatro-infantil",
          },
        ],
      },
      {
        title: "Estudios Literarios",
        slug: "estudios-literarios",
        items: [
          {
            title: "Historia de la Literatura",
            slug: "historia-de-la-literatura",
          },
        ],
      },
    ],
  },
  {
    title: "Bienestar y Salud",
    slug: "bienestar-y-salud",
    subcategories: [
      {
        title: "Autoconocimiento y Espiritualidad",
        slug: "autoconocimiento-y-espiritualidad",
        items: [
          {
            title: "Chamanismo",
            slug: "chamanismo",
          },
          {
            title: "Literatura Espiritual",
            slug: "literatura-espiritual",
          },
          {
            title: "Orientalismo",
            slug: "orientalismo",
          },
          {
            title: "Religiones",
            slug: "religiones",
          },
        ],
      },
      {
        title: "Embarazo y Crianza",
        slug: "embarazo-y-crianza",
        items: [
          {
            title: "Adolescentes",
            slug: "adolescentes",
          },
          {
            title: "Crianza de Niños Pequeños",
            slug: "crianza-de-ninos-pequenos",
          },
          {
            title: "Crianza del Bebé",
            slug: "crianza-del-bebe",
          },
          {
            title: "Gruías del Embarazo",
            slug: "guias-del-embarazo",
          },
        ],
      },
      {
        title: "Nutrición y Dietas",
        slug: "nutricion-y-dietas",
        items: [
          {
            title: "Dietas Adelgazantes",
            slug: "dietas-adelgazantes",
          },
          {
            title: "Dietas Terapéuticas",
            slug: "dietas-terapeuticas",
          },
          {
            title: "Nutrición General",
            slug: "nutricion-general",
          },
        ],
      },
      {
        title: "Salud",
        slug: "salud",
        items: [
          {
            title: "Divulgación Médica",
            slug: "divulgacion-medica",
          },
          {
            title: "Ejercicos y Vida Saludable",
            slug: "ejercicios-y-vida-saludable",
          },
          {
            title: "Tratamiento de Enfermedades",
            slug: "tratamiento-de-enfermedades",
          },
        ],
      },
      {
        title: "Sexualidad",
        slug: "sexualidad",
        items: [
          {
            title: "Guías sobre Sexualidad",
            slug: "guias-sobre-sexualidad",
          },
        ],
      },
    ],
  },
  {
    title: "Actualidad y Empresa",
    slug: "actualidad-y-empresa",
    subcategories: [
      {
        title: "Economía",
        slug: "economia",
        items: [
          {
            title: "Macroeconomía",
            slug: "macroeconomia",
          },
        ],
      },
      {
        title: "Empresa y Gestión",
        slug: "empresa-y-gestion",
        items: [
          {
            title: "Administración",
            slug: "administracion",
          },
          {
            title: "Emprendimiento",
            slug: "emprendimiento",
          },
          {
            title: "Estrategia",
            slug: "estrategia",
          },
          {
            title: "Gestión de Proyectos",
            slug: "gestion-de-proyectos",
          },
          {
            title: "Innovación y Creatividad",
            slug: "innovacion-y-creatividad",
          },
          {
            title: "Recursos Tecnológicos",
            slug: "recursos-tecnologicos",
          },
          {
            title: "RR. HH.",
            slug: "rr-hh",
          },
        ],
      },
      {
        title: "Finanzas y Contabilidad",
        slug: "finanzas-y-contabilidad",
        items: [
          {
            title: "Control",
            slug: "control",
          },
          {
            title: "Invesión",
            slug: "inversion",
          },
          {
            title: "Negocios",
            slug: "negocios",
          },
        ],
      },
      {
        title: "Liderazgo",
        slug: "liderazgo",
        items: [
          {
            title: "Coaching",
            slug: "coaching",
          },
          {
            title: "Equipos",
            slug: "equipos",
          },
          {
            title: "PNL",
            slug: "pnl",
          },
        ],
      },
      {
        title: "Ventas y Marketing",
        slug: "ventas-y-marketing",
        items: [
          {
            title: "Branding y Gestión de Marca",
            slug: "branding-y-gestion-de-marca",
          },
          {
            title: "Marketing Digital y Redes Sociales",
            slug: "marketing-digital-y-redes-sociales",
          },
          {
            title: "Técnicas de Venta",
            slug: "tecnicas-de-venta",
          },
          {
            title: "Teoría del Marketing",
            slug: "teoria-del-marketing",
          },
        ],
      },
    ],
  },
] as const;
