// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bookCategories: {
  title: string;
  subcategories: { title: string; items: { title: string }[] }[];
}[] = [
  {
    title: "Manga y Cómics",
    subcategories: [
      {
        title: "Cómics",
        items: [
          { title: "Marvel/DC" },
          { title: "Cómics Clásicos" },
          { title: "Licencias" },
          { title: "Cómic Independiente" },
          { title: "Cómic Infantil" },
          { title: "Cómic Erótico" },
          { title: "Cómic Efectos a IGV" },
        ],
      },
      {
        title: "Manga",
        items: [
          { title: "Infantil (Kodomo)" },
          { title: "Juvenil Femenino (Shojo)" },
          { title: "Juvenil Masculino (Shonen)" },
          { title: "Joven Adulto Femenino (Josei)" },
          { title: "Joven Adulto Masculino (Seinen)" },
          { title: "Terror" },
          { title: "Joven Adulto LGTB (Yaoi)" },
        ],
      },
      {
        title: "Temas Relacionados al Comic y Manga",
        items: [
          { title: "Teoría del Cómic" },
          { title: "Dibujo/Guión" },
          { title: "Dibujo de Manga" },
        ],
      },
      {
        title: "Humor Gráfico",
        items: [{ title: "Humor Gráfico" }],
      },
    ],
  },
  {
    title: "No Ficción",
    subcategories: [
      {
        title: "Historia del Perú",
        items: [
          { title: "Mitos y Leyendas Peruanos" },
          { title: "Historia Peruana Contemporánea" },
        ],
      },
      {
        title: "Historia Universal",
        items: [
          { title: "Historia Antigua" },
          { title: "Historia Contemporánea" },
          { title: "Historia de Latinoamérica" },
          { title: "Historia hasta el Siglo XIX" },
        ],
      },
      {
        title: "Derecho",
        items: [
          { title: "Derecho Civil" },
          { title: "Derecho Internacional" },
          { title: "Derecho Constitucional" },
          { title: "Teoría del Derecho" },
          { title: "Manuales de Derecho" },
        ],
      },
      {
        title: "Psicología",
        items: [
          { title: "Psicología y Educación" },
          { title: "Psicología Infantil" },
          { title: "Temas de Pareja" },
          { title: "Psicología Social" },
        ],
      },
      {
        title: "Arqueología",
        items: [{ title: "Sitio Arqueológicos" }, { title: "Textilería" }],
      },
    ],
  },
  {
    title: "Libros Infantiles",
    subcategories: [
      {
        title: "Cuentos y Novelas Infantiles",
        items: [
          { title: "Cuentos Clásicos" },
          { title: "Cuentos Troquelados" },
          { title: "Cuentos Religiosos Infantiles" },
          { title: "Novelas Clásicas Versión Infantil" },
          { title: "Novelas y Series Infantiles" },
        ],
      },
      {
        title: "Aprendizaje Temprano",
        items: [
          { title: "Libros de Tela" },
          { title: "Libros con Texturas" },
          { title: "Primeros Conceptos (Acortanados)" },
          { title: "Libros Sumergibles" },
          { title: "Cuentos (Acortonados)" },
        ],
      },
      {
        title: "Libros de Actividades",
        items: [
          { title: "Infantiles para Colorear" },
          { title: "Libros con Stickers" },
          { title: "Actividades de Conocimientos" },
          { title: "Dibujo y Pintura" },
          { title: "Modelamientos, Construcción y Plastilina" },
          { title: "Libros de Cocina para Niños" },
        ],
      },
      {
        title: "Informativos, enciclopedia y deporte infantil",
        items: [
          { title: "Temas Generales (Enciclopedia Infantil)" },
          { title: "Dinosaurios (Enciclopedia Infantil)" },
          { title: "Ciencias Naturales (Enciclopedia Infantil)" },
          { title: "Historia (Enciclopedia Infantil)" },
          { title: "Deportes (Enciclopedia Infantil)" },
          { title: "Libro sobre Animales" },
          { title: "Libro sobre Música" },
          { title: "Biografías Ilustradas" },
        ],
      },
    ],
  },
  {
    title: "Libros Juveniles",
    subcategories: [
      {
        title: "Ciencia Ficción Juvenil",
        items: [{ title: "Distopía Juvenil" }],
      },
      {
        title: "Fantasía Juvenil",
        items: [{ title: "Fantasía Paranormal" }, { title: "Fantasía Urbana" }],
      },
      {
        title: "Otras Obras Juveniles",
        items: [{ title: "Youtubers" }],
      },
    ],
  },
  {
    title: "Ficción",
    subcategories: [
      {
        title: "Ciencia Ficción y Fantasía",
        items: [{ title: "Ciencia Ficción" }, { title: "Fantasía" }],
      },
      {
        title: "Narrativa",
        items: [
          {
            title: "Cuento Universal",
          },
          {
            title: "Cuento Peruano",
          },
          { title: "Narrativa Peruana" },
          { title: "Narrativa hispanoamericana" },
          { title: "Narrativa Mundial" },
          { title: "Narrativa Histórica" },
          { title: "Narrativa Romántica" },
          { title: "Narrativa Erótica" },
        ],
      },
      {
        title: "Poesía",
        items: [
          {
            title: "Poesía Peruana",
          },
          {
            title: "Poesía Hispanoamericana",
          },
          {
            title: "Poesía Mundial",
          },
          {
            title: "Poesía Juvenil",
          },
        ],
      },
      {
        title: "Teatro y Danza",
        items: [
          {
            title: "Teatro Hispanoamericano",
          },
          { title: "Teatro Mundial" },
          { title: "Teoría del Teatro" },
          { title: "Teatro Infantil" },
        ],
      },
      {
        title: "Estudios Literarios",
        items: [{ title: "Historia de la Literatura" }],
      },
    ],
  },
  {
    title: "Bienestar y Salud",
    subcategories: [
      {
        title: "Autoconocimiento y Espiritualidad",
        items: [
          { title: "Chamanismo" },
          { title: "Literatura Espiritual" },
          { title: "Orientalismo" },
          { title: "Religiones" },
        ],
      },
      {
        title: "Embarazo y Crianza",
        items: [
          { title: "Adolescentes" },
          { title: "Crianza de Niños Pequeños" },
          { title: "Crianza del Bebé" },
          { title: "Gruías del Embarazo" },
        ],
      },
      {
        title: "Nutrición y Dietas",
        items: [
          { title: "Dietas Adelgazantes" },
          { title: "Dietas Terapéuticas" },
          { title: "Nutrición General" },
        ],
      },
      {
        title: "Salud",
        items: [
          { title: "Divulgación Médica" },
          { title: "Ejercicos y Vida Saludable" },
          { title: "Tratamiento de Enfermedades" },
        ],
      },
      {
        title: "Sexualidad",
        items: [{ title: "Guías sobre Sexualidad" }],
      },
    ],
  },
  {
    title: "Actualidad y Empresa",
    subcategories: [
      {
        title: "Economía",
        items: [
          {
            title: "Macroeconomía",
          },
        ],
      },
      {
        title: "Empresa y Gestión",
        items: [
          { title: "Administración" },
          { title: "Emprendimiento" },
          { title: "Estrategia" },
          { title: "Gestión de Proyectos" },
          { title: "Innovación y Creatividad" },
          { title: "Recursos Tecnológicos" },
          { title: "RR. HH." },
        ],
      },
      {
        title: "Finanzas y Contabilidad",
        items: [
          { title: "Control" },
          { title: "Invesión" },
          { title: "Negocios" },
        ],
      },
      {
        title: "Liderazgo",
        items: [{ title: "Coaching" }, { title: "Equipos" }, { title: "PNL" }],
      },
      {
        title: "Ventas y Marketing",
        items: [
          { title: "Branding y Gestión de Marca" },
          { title: "Marketing Digital y Redes Sociales" },
          { title: "Técnicas de Venta" },
          { title: "Teoría del Marketing" },
        ],
      },
    ],
  },
];
