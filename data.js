/* data.js - extracted place & tip data */
export const places = [
  {
    id: "recycling_altagracia",
    title: "Puntos de reciclaje - Altagracia",
    gallery: [
      "punooo.jpg"
    ],
    type: "recycling",
    text: "Puntos de reciclaje comunitarios en Altagracia: separa plásticos, vidrio y papel; reciclar protege al lago y apoya iniciativas locales."
  },
  {
    id: "concepcion_zone",
    title: "Zona protegida - Volcán Maderas (Altagracia)",
    gallery: [
      "df39d81bd444bfa01311465181c72f94.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Volcano_trail.jpg"
    ],
    type: "protected",
    text: "Pendientes y senderos al pie del Volcán Maderas cerca de Altagracia; sensibilidad ecológica alta."
  },
  {
    id: "polluted_shore",
    title: "Orilla con acumulación de basura",
    gallery: [
      "basura.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/66/Lago_de_Nicaragua.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4a/Litter_on_shore.jpg"
    ],
    type: "polluted",
    text: "Tramos de costa en Altagracia con residuos acumulados; prioridad para limpieza comunitaria."
  },
  {
    id: "eco_center",
    title: "Centro ecológico - Senderos y pozas",
    gallery: [
      "sendero.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2d/Ojo_de_Agua_Ometepe.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/88/Nature_landscape.jpg"
    ],
    type: "eco_tour",
    text: "Sitios naturales y sostenibles para turismo responsable en Altagracia: guías locales y prácticas de bajo impacto."
  },

  /* New playas, río y reserva requested (each entry includes an image and short text linking to a guardian character) */
  {
    id: "playa_paso_real",
    title: "Playa Paso Real — Chispa el Perrito",
    gallery: [
      "pasoreal.jpg"
    ],
    type: "eco_tour",
    text: "Playa Paso Real: área recreativa; mantén la playa limpia para que Chispa y otros animales disfruten."
  },
  {
    id: "playa_san_miguel",
    title: "Playa San Miguel — Goldi el Pez",
    gallery: [
      "playasanmiguel.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/33/Tropical_fish.jpg"
    ],
    type: "eco_tour",
    text: "Playa San Miguel: aguas y orillas que necesitan protección; Goldi recuerda no arrojar residuos al agua."
  },
  {
    id: "playa_taguizapa",
    title: "Playa Tagüizapa — Rinho el Garrobo",
    gallery: [
      "taguizapa.jpg"
    ],
    type: "eco_tour",
    text: "Playa Tagüizapa: hábitat costero cercano a zonas rocosas, hogar de Rinho; respeta la flora y fauna."
  },
  {
    id: "playa_santa_cruz",
    title: "Playa Santa Cruz — Luna la Mariposa",
    gallery: [
      "stodomingo.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/Monarch_In_May.jpg"
    ],
    type: "eco_tour",
    text: "Playa Santa Cruz: espacios de anidación y descanso; Luna te invita a cuidar la arena y la vegetación costera."
  },
  {
    id: "playa_santo_domingo",
    title: "Playa Santo Domingo — Tito la Tortuga",
    gallery: [
      "santodomingo.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Green_sea_turtle_grazing.jpg"
    ],
    type: "eco_tour",
    text: "Playa Santo Domingo: importante para tortugas y aves; Tito recuerda evitar luces y dejar los nidos intactos."
  },
  {
    id: "playa_mango",
    title: "Playa Mango — Pepe el Loro",
    gallery: [
      "mango.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Ara_macao_-Costa_Rica_-two-8a.jpg"
    ],
    type: "eco_tour",
    text: "Playa Mango: zona con vegetación costera; Pepe promueve el turismo responsable y apoyo a guías locales."
  },
  {
    id: "rio_buen_suceso",
    title: "Río Buen Suceso — Nico el Mono",
    gallery: [
      "riooo.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/47/White-faced_capuchin.jpg"
    ],
    type: "protected",
    text: "Río Buen Suceso: ecosistema acuático y ribereño; Nico te recuerda cuidar la cuenca y evitar contaminación."
  },
  {
    id: "reserva_pena_inculta",
    title: "Reserva Natural Peña Inculta — Perla la Urraca",
    gallery: [
      "peña.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/20/European_magpie_Pica_pica.jpg"
    ],
    type: "protected",
    text: "Reserva Natural Peña Inculta: área protegida con senderos y patrimonio natural; Perla invita a respetar las reglas de la reserva."
  }
];

export const tips = [
  { key: 'tito', icon: '🐢', title: 'Tito la Tortuga', text: 'La basura puede dañar a los animales del lago.', img: 'tito.png' },
  { key: 'luna', icon: '🦋', title: 'Luna la Mariposa', text: 'Reciclar ayuda a mantener limpia la isla.', img: 'luna.png' },
  { key: 'nico', icon: '🐒', title: 'Nico el Mono', text: 'Explora sin contaminar los senderos.', img: 'nico.png' },
  { key: 'pepe', icon: '🦜', title: 'Pepe el Loro', text: '¡Cuida la isla y comparte lo que aprendes!', img: 'pepe.png' },
  { key: 'perla', icon: '🪶', title: 'Perla la Urraca', text: 'Si cuidamos la naturaleza, siempre tendremos un lugar hermoso.', img: 'perla.png' },
  { key: 'goldi', icon: '🐟', title: 'Goldi el Pez', text: 'La basura en el agua afecta a todos los animales.', img: 'goldi.png' },
  { key: 'chispa', icon: '🐶', title: 'Chispa el Perrito', text: 'Una playa limpia es un hogar feliz.', img: 'chispa.png' },
  { key: 'rinho', icon: '🦎', title: 'Rinho el Garrobo', text: 'La naturaleza es nuestro hogar, cuidémosla juntos.', img: 'rinho.png' }
];

export const pinPositions = {
  recycling_altagracia: {x:60,y:160},
  concepcion_zone: {x:220,y:50},
  polluted_shore: {x:300,y:160},
  eco_center: {x:150,y:120},

  /* positions for the newly added playas, río y reserva */
  playa_paso_real: {x:40, y:150},
  playa_san_miguel: {x:80, y:170},
  playa_taguizapa: {x:110, y:180},
  playa_santa_cruz: {x:260, y:150},
  playa_santo_domingo: {x:200, y:170},
  playa_mango: {x:140, y:140},
  rio_buen_suceso: {x:180, y:100},
  reserva_pena_inculta: {x:95, y:70}
};
