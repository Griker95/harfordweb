const HARFORD_ORGANIZATIONS = [
  {
    "id": "compania-harford",
    "name": "Compañía Harford",
    "short": "Harford",
    "icon": "assets/icons/compania-harford.png",
    "category": "propia",
    "categoryLabel": "Organización propia",
    "relation": "Amistoso",
    "relationClass": "friendly",
    "type": "Compañía mercenaria",
    "region": "Variable",
    "status": "Activa",
    "description": [
      "Grupo de mercenarios y operativos independientes liderados originalmente por el infame T. H.",
      "Formada actualmente por mercenarios veteranos y fugitivos de Tol Barad, la compañía se especializa en trabajos de toda índole en territorios hostiles."
    ],
    "known": [
      "Fundada originalmente bajo el mando de T. H.",
      "Reconstruida por veteranos, fugitivos y supervivientes.",
      "Mantiene una relación de colaboración condicionada con el IV:7."
    ],
    "note": "Sí, somos nosotros. No, no pienso escribir aquí todas las deudas pendientes.",
    "group": "general",
    "groupLabel": "Organizaciones principales",
    "order": 10
  },
  {
    "id": "iv7",
    "name": "IV:7",
    "short": "IV:7",
    "icon": "assets/icons/iv7.png",
    "category": "autoridad",
    "categoryLabel": "Servicio de inteligencia",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Inteligencia y operaciones encubiertas",
    "region": "Ventormenta y territorios de la Alianza",
    "status": "Activo",
    "description": [
      "Servicio de inteligencia y operaciones encubiertas de la Alianza.",
      "Especializado en espionaje, infiltración y manipulación política, el IV:7 opera en las sombras para proteger los intereses de Ventormenta y de la Alianza."
    ],
    "known": [
      "Primer contacto relevante registrado en Menethil.",
      "Su relación con Harford combina vigilancia, presión y encargos operativos.",
      "La mayor parte de sus nombres, rutas y procedimientos permanecen restringidos."
    ],
    "note": "Cuando dicen que no necesitamos conocer todos los detalles, casi siempre somos nosotros quienes aparecemos en esos detalles.",
    "group": "general",
    "groupLabel": "Organizaciones principales",
    "order": 20
  },
  {
    "id": "cruzada-argenta",
    "name": "Cruzada Argenta",
    "short": "Cruzada Argenta",
    "icon": "assets/icons/cruzada-argenta.png",
    "category": "orden",
    "categoryLabel": "Orden militar y religiosa",
    "relation": "Amistoso",
    "relationClass": "friendly",
    "type": "Orden militar y religiosa",
    "region": "Azeroth; fuerte presencia en Rasganorte",
    "status": "Activa",
    "description": [
      "Orden militar y religiosa nacida de la unión entre el Alba Argenta y la Orden de la Mano de Plata.",
      "Dedicada a combatir amenazas relacionadas con la no-muerte y proteger Azeroth de fuerzas oscuras, mantiene una fuerte presencia en Rasganorte y opera bajo ideales de sacrificio, disciplina y deber."
    ],
    "known": [
      "Especialistas en amenazas de no-muerte.",
      "Mantienen una relación amistosa con Harford.",
      "Su disciplina suele superar con facilidad la de la compañía."
    ],
    "note": "Gente fiable. También gente que probablemente preferiría que entregáramos los informes a tiempo.",
    "group": "general",
    "groupLabel": "Organizaciones principales",
    "order": 30
  },
  {
    "id": "cartel-bonvapor",
    "name": "Cártel Bonvapor",
    "short": "Bonvapor",
    "icon": "assets/icons/cartel-bonvapor.png",
    "category": "cartel",
    "categoryLabel": "Cártel goblin",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Cártel comercial goblin",
    "region": "Azeroth",
    "status": "Activo",
    "description": [
      "El Cártel Bonvapor ha sido durante mucho tiempo un elemento fijo del comercio goblin.",
      "Son maestros de las finanzas, el comercio y la negociación, y su influencia se extiende por Azeroth."
    ],
    "known": [
      "Amplia red comercial.",
      "Capacidad de negociación y financiación.",
      "La neutralidad termina donde comienza el beneficio."
    ],
    "note": "Con ellos todo tiene un precio. El problema es descubrir qué parte de la conversación ya te han cobrado.",
    "group": "carteles",
    "groupLabel": "Cárteles goblins",
    "order": 40
  },
  {
    "id": "cartel-aguasnegras",
    "name": "Cártel Aguasnegras",
    "short": "Aguasnegras",
    "icon": "assets/icons/cartel-aguasnegras.png",
    "category": "cartel",
    "categoryLabel": "Cártel goblin",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Red comercial, mercenaria y criminal",
    "region": "Bahía del Botín y rutas exteriores",
    "status": "Activo",
    "description": [
      "Uno de los cárteles goblin más poderosos, liderado por el Príncipe Mercante Revilgaz desde Bahía del Botín.",
      "Controla amplias redes comerciales, mercenarias y criminales; pueden llevar cualquier cargamento a cualquier lugar y en cualquier momento."
    ],
    "known": [
      "Control de rutas y transporte.",
      "Acceso a redes mercenarias y criminales.",
      "Capacidad logística muy superior a la de la mayoría de bandas locales."
    ],
    "note": "Pueden llevar cualquier cosa a cualquier parte. Conviene no preguntar en qué compartimento viajamos nosotros.",
    "group": "carteles",
    "groupLabel": "Cárteles goblins",
    "order": 50
  },
  {
    "id": "cartel-pantoque",
    "name": "Cártel Pantoque",
    "short": "Pantoque",
    "icon": "assets/icons/cartel-pantoque.png",
    "category": "cartel",
    "categoryLabel": "Cártel goblin",
    "relation": "Adverso",
    "relationClass": "adverse",
    "type": "Ingeniería, construcción e invención",
    "region": "Variable",
    "status": "Activo",
    "description": [
      "El Cártel Pantoque ha tenido más altibajos que la mayoría, pero nadie sabe construir o inventar como ellos.",
      "Desde ciudades a accesorios de piscina, Pantoque solo construye lo mejor."
    ],
    "known": [
      "Gran capacidad de ingeniería y construcción.",
      "Relación adversa registrada con Harford.",
      "Sus proyectos tienden a ser tan ambiciosos como caros."
    ],
    "note": "Construyen bien. Cobran mejor. Y por algún motivo seguimos encontrándolos donde no nos conviene.",
    "group": "carteles",
    "groupLabel": "Cárteles goblins",
    "order": 60
  },
  {
    "id": "cartel-ventura",
    "name": "Cártel Ventura",
    "short": "Ventura y Cía.",
    "icon": "assets/icons/cartel-ventura.png",
    "category": "cartel",
    "categoryLabel": "Cártel goblin",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Extracción y explotación de recursos",
    "region": "Múltiples territorios",
    "status": "Activo",
    "description": [
      "Ventura y Cía. no cuenta con la mejor reputación entre los cárteles, pero nadie cosecha, extrae minerales ni perfora más rápido que ellos.",
      "¿Quieres algo bonito? Búscate un club de lectura. ¿Quieres materia prima? Cuenta con Ventura."
    ],
    "known": [
      "Especialistas en extracción acelerada.",
      "Reputación cuestionable incluso entre goblins.",
      "Su presencia suele anunciar que algo cercano dejará pronto de parecer un paisaje."
    ],
    "note": "No les importa qué había antes de la excavación. Solo cuánto pueden sacar después.",
    "group": "carteles",
    "groupLabel": "Cárteles goblins",
    "order": 70
  },
  {
    "id": "banda-tuercarrota",
    "name": "Banda de Tuercarrota",
    "short": "Tuercarrota",
    "icon": "assets/icons/banda-tuercarrota.png",
    "category": "criminal",
    "categoryLabel": "Red criminal emergente",
    "relation": "Hostil",
    "relationClass": "hostile",
    "type": "Tráfico de drogas y sustancias experimentales",
    "region": "Rutas clandestinas y enclaves locales",
    "status": "Activa",
    "description": [
      "Red criminal emergente vinculada al tráfico de drogas y sustancias experimentales.",
      "Opera mediante intermediarios locales y organizaciones menores como los Cobras, utilizando rutas clandestinas y mano de obra barata para expandir su influencia sin exponerse directamente."
    ],
    "known": [
      "Emplea intermediarios y organizaciones menores.",
      "Relación identificada con los Cobras.",
      "Evita exponer directamente a sus mandos y recursos principales."
    ],
    "note": "La gente que trabaja para ellos siempre sabe menos de lo que debería y muere antes de poder contarlo.",
    "group": "carteles-menores",
    "groupLabel": "Cárteles menores y redes criminales",
    "order": 80
  },
  {
    "id": "soluciones-fundisombras",
    "name": "Soluciones Fundisombras",
    "short": "Fundisombras",
    "icon": "assets/icons/soluciones-fundisombras.png",
    "category": "criminal",
    "categoryLabel": "Organización clandestina goblin",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Contrabando, sabotaje y tecnología ilegal",
    "region": "Operaciones encubiertas",
    "status": "Activa",
    "description": [
      "Soluciones Fundisombras es una pequeña organización goblin dedicada al contrabando, el sabotaje y los negocios clandestinos.",
      "Operan desde las sombras, comerciando con tecnología ilegal, información robada y cualquier trato que genere beneficios."
    ],
    "known": [
      "Comercio de tecnología ilegal.",
      "Acceso a información robada.",
      "Aceptan operaciones de sabotaje y contrabando."
    ],
    "note": "Que sean pequeños no significa que sean inofensivos. Significa que caben en lugares más difíciles de vigilar.",
    "group": "carteles-menores",
    "groupLabel": "Cárteles menores y redes criminales",
    "order": 90
  },
  {
    "id": "hozen-aullario",
    "name": "Hozen Aullario",
    "short": "Hozen Aullario",
    "icon": "assets/icons/hozen-aullario.png",
    "category": "regional",
    "categoryLabel": "Tribu hozen",
    "relation": "Adverso",
    "relationClass": "adverse",
    "type": "Tribu territorial hozen",
    "region": "Pantano de las Penas",
    "status": "Activa",
    "group": "pantano",
    "groupLabel": "[Zona] Pantano de las Penas",
    "order": 100,
    "description": [
      "Tribu hozen desplazada al pantano después de escapar de esclavistas goblins.",
      "Practicantes de vudú, hacen uso de fetiches, máscaras y tótems troll para proteger su territorio. Aunque suelen mantenerse apartados de los conflictos externos, son territoriales y desconfiados con los extraños."
    ],
    "known": [
      "Escaparon de esclavistas goblins antes de asentarse en el pantano.",
      "Emplean vudú, máscaras, fetiches y tótems de origen troll.",
      "Mantienen una actitud territorial y desconfiada con los visitantes."
    ],
    "note": "No tocar los tótems, no burlarse de las máscaras y no asumir que estar apartados significa estar desarmados."
  },
  {
    "id": "fuerzas-privadas-chapaleos",
    "name": "Fuerzas Privadas de Chapaleos",
    "short": "Fuerzas Privadas",
    "icon": "assets/icons/fuerzas-privadas-chapaleos.png",
    "category": "chapaleos",
    "categoryLabel": "Fuerza armada privada",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Seguridad portuaria y fuerza militar privada",
    "region": "Chapaleos",
    "status": "Activa",
    "group": "chapaleos",
    "groupLabel": "Chapaleos",
    "order": 110,
    "description": [
      "Fuerza armada privada del Barón Mercante Brochargento y principal brazo militar del Cártel Bonvapor en Chapaleos.",
      "Se encargan de proteger el puerto, mantener el orden y garantizar que nada amenace la estabilidad comercial de la ciudad."
    ],
    "known": [
      "Responden al Barón Mercante Brochargento.",
      "Actúan como principal brazo militar del Cártel Bonvapor en Chapaleos.",
      "Protegen el puerto y la estabilidad comercial de la ciudad."
    ],
    "note": "Mantienen el orden siempre que el orden coincida con los intereses de quien firma sus pagas."
  },
  {
    "id": "industrias-petronegro",
    "name": "Industrias Petronegro",
    "short": "Petronegro",
    "icon": "assets/icons/industrias-petronegro.png",
    "category": "chapaleos",
    "categoryLabel": "Potencia industrial",
    "relation": "Amistoso",
    "relationClass": "friendly",
    "type": "Industria petrolífera y plataformas marítimas",
    "region": "Chapaleos",
    "status": "Activa",
    "group": "chapaleos",
    "groupLabel": "Chapaleos",
    "order": 120,
    "description": [
      "Principal potencia industrial de Chapaleos, especializada en plataformas petrolíferas.",
      "Bajo el control del Duque Mercante Petronegro, la compañía representa una de las piezas clave del crecimiento económico de Chapaleos."
    ],
    "known": [
      "Controlada por el Duque Mercante Petronegro.",
      "Especializada en plataformas petrolíferas.",
      "Su actividad es una pieza central del crecimiento económico de Chapaleos."
    ],
    "note": "Una amistad industrial sigue siendo amistad, aunque huela a aceite, humo y cláusulas pequeñas."
  },
  {
    "id": "sindicato-trabajadores",
    "name": "Sindicato de Trabajadores",
    "short": "Sindicato",
    "icon": "assets/icons/sindicato-trabajadores.png",
    "category": "chapaleos",
    "categoryLabel": "Organización laboral",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Representación portuaria e industrial",
    "region": "Chapaleos",
    "status": "Activo",
    "group": "chapaleos",
    "groupLabel": "Chapaleos",
    "order": 130,
    "description": [
      "Organización laboral dirigida por Klizvas Cuentagandul que controla buena parte de la mano de obra portuaria e industrial de Chapaleos.",
      "Mantiene la producción activa mientras equilibra los intereses de los trabajadores y las exigencias económicas del Consejo."
    ],
    "known": [
      "Dirigido por Klizvas Cuentagandul.",
      "Controla buena parte de la mano de obra portuaria e industrial.",
      "Equilibra los intereses de los trabajadores con las exigencias del Consejo."
    ],
    "note": "Cuando medio puerto depende de que aparezcan a trabajar, conviene escuchar antes de hablar de productividad."
  },
  {
    "id": "loto-dorado",
    "name": "Loto Dorado",
    "short": "Loto Dorado",
    "icon": "assets/icons/loto-dorado.png",
    "category": "chapaleos",
    "categoryLabel": "Casino y centro de apuestas",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Juego, apuestas y reunión social",
    "region": "Chapaleos",
    "status": "Activo",
    "group": "chapaleos",
    "groupLabel": "Chapaleos",
    "order": 140,
    "description": [
      "Principal casino de Chapaleos y centro de apuestas de alto nivel controlado por Ming Chin.",
      "El Loto Dorado funciona como punto de encuentro para comerciantes, criminales y figuras influyentes del puerto, moviendo grandes cantidades de dinero dentro de una fachada elegante y controlada."
    ],
    "known": [
      "Controlado por Ming Chin.",
      "Reúne a comerciantes, criminales y figuras influyentes.",
      "Mueve grandes cantidades de dinero bajo una fachada cuidadosamente controlada."
    ],
    "note": "En una mesa de juego la casa siempre sabe más. En este caso, además, probablemente sabe con quién llegaste."
  },
  {
    "id": "templo-cien-delicias",
    "name": "Templo de las Cien Delicias",
    "short": "Cien Delicias",
    "icon": "assets/icons/templo-cien-delicias.png",
    "category": "chapaleos",
    "categoryLabel": "Establecimiento de lujo",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Entretenimiento, compañía y servicios discretos",
    "region": "Chapaleos",
    "status": "Activo",
    "group": "chapaleos",
    "groupLabel": "Chapaleos",
    "order": 150,
    "description": [
      "Burdel de lujo dirigido por Isabela Lampert y su familia.",
      "Especializado en entretenimiento adulto, compañía exclusiva y servicios discretos para la élite de Chapaleos."
    ],
    "known": [
      "Dirigido por Isabela Lampert y su familia.",
      "Ofrece compañía exclusiva y servicios discretos.",
      "Su clientela procede principalmente de la élite de Chapaleos."
    ],
    "note": "La discreción forma parte del servicio. También del precio y, sospecho, de la supervivencia."
  },
  {
    "id": "los-cobras",
    "name": "Los Cobras",
    "short": "Los Cobras",
    "icon": "assets/icons/los-cobras.png",
    "category": "chapaleos",
    "categoryLabel": "Banda criminal",
    "relation": "Adverso",
    "relationClass": "adverse",
    "type": "Robo y contrabando",
    "region": "Chapaleos",
    "status": "Activa",
    "group": "chapaleos",
    "groupLabel": "Chapaleos",
    "order": 160,
    "description": [
      "Banda criminal asentada en Chapaleos dedicada al robo y contrabando dentro y fuera del puerto.",
      "Aunque cuentan con presencia en la ciudad, gran parte de sus miembros vive en las afueras, en un asentamiento de caravanas cercano a su taller."
    ],
    "known": [
      "Mantienen actividad criminal dentro y fuera del puerto.",
      "Gran parte de sus miembros reside fuera de la ciudad.",
      "Disponen de un asentamiento de caravanas próximo a su taller."
    ],
    "note": "Las serpientes no dejan de ser serpientes por dormir en una caravana."
  },
  {
    "id": "doble-x",
    "name": "Doble X",
    "short": "Doble X",
    "icon": "assets/icons/doble-x.png",
    "category": "chapaleos",
    "categoryLabel": "Empresa de entretenimiento",
    "relation": "Neutral",
    "relationClass": "neutral",
    "type": "Espectáculos, eventos y promoción artística",
    "region": "Chapaleos",
    "status": "Activa",
    "group": "chapaleos",
    "groupLabel": "Chapaleos",
    "order": 170,
    "description": [
      "Empresa de entretenimiento dirigida por El Fixx, dedicada a la organización de espectáculos y eventos, promoción artística, cinematografía y contenido para adultos.",
      "Combina ocio, negocio e influencia, con una presencia importante en la oferta cultural y nocturna de Chapaleos."
    ],
    "known": [
      "Dirigida por El Fixx.",
      "Organiza espectáculos, eventos y producciones audiovisuales.",
      "Mantiene influencia sobre la actividad cultural y nocturna de la ciudad."
    ],
    "note": "Todo espectáculo necesita un escenario. Algunos también necesitan salidas de emergencia y asesoramiento legal."
  },
  {
    "id": "piratas-de-los-mares",
    "name": "Piratas de los Mares",
    "short": "Piratas de los Mares",
    "icon": "assets/icons/piratas-de-los-mares.png",
    "category": "pirata",
    "categoryLabel": "Coalición pirata dispersa",
    "relation": "Sin registrar",
    "relationClass": "unknown",
    "type": "Coalición de tripulaciones piratas",
    "region": "Costas sureñas de los Reinos del Este",
    "status": "Activa",
    "description": [
      "Coalición dispersa de piratas que opera a lo largo de las costas sureñas de los Reinos del Este.",
      "Aunque carecen de una estructura unificada, numerosos grupos mantienen actividad alrededor de Chapaleos, colaborando ocasionalmente con bandas criminales locales."
    ],
    "known": [
      "No poseen una estructura unificada.",
      "Actividad frecuente alrededor de Chapaleos.",
      "Colaboración ocasional con bandas criminales locales."
    ],
    "note": "No existe un solo capitán al que sobornar, amenazar o culpar. Eso complica sorprendentemente las tres cosas.",
    "group": "maritimas",
    "groupLabel": "Rutas marítimas",
    "order": 200
  }
];
