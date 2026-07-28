const HARFORD_ASSETS = {
  fleet: [
    {
      name: "El Filo Azul",
      type: "Fragata rompehielos a vapor",
      status: "Fuera de servicio",
      accent: "#4d89b8",
      summary: "Primera embarcación propia de la antigua Harford. Diseñada y ensamblada en Valgarde gracias a la influencia de una noble que negoció con la compañía.",
      specs: ["Motriz de vapor", "Capacidad militar reducida", "Diseño para aguas frías", "Emblema azul y blanco"],
      note: "El lujo naval de una época que la contabilidad posterior se encargó de corregir."
    },
    {
      name: "La Cucaracha Salada",
      type: "Bergantín de vela",
      status: "En reparación histórica",
      accent: "#b49a58",
      summary: "Antiguo navío de Stromgarde, rebautizado después de una infestación imposible de ignorar. Fue apropiado por la compañía y utilizado como transporte armado de fortuna.",
      specs: ["Carga media", "Cuatro cañones oxidados", "Velamen remendado", "Bodega amplia y poco recomendable"],
      note: "La ausencia de garantías de transporte figuraba de manera implícita."
    },
    {
      name: "Embarcación actual",
      type: "Activo cedido",
      status: "Operativa",
      accent: "#2f79ad",
      summary: "La compañía actual dispone de una nave, una radio y un refugio bajo un acuerdo cuya titularidad no aparece en los registros públicos.",
      specs: ["Capacidad de transporte", "Canal de radio seguro", "Alojamiento de campaña", "Mantenimiento compartido"],
      note: "La propiedad y las condiciones de uso permanecen restringidas."
    }
  ],
  bases: [
    {
      name: "Tabernas de Ventormenta",
      era: "Antigua Harford",
      status: "Sede informal",
      summary: "Puntos de reunión cambiantes, elegidos por precio, discreción y tolerancia del propietario a las discusiones armadas."
    },
    {
      name: "Bodega de Forjaz",
      era: "Antigua Harford",
      status: "Cerrada",
      summary: "Humilde bodega de vinos vinculada a Hizdahr Hazdalanson y utilizada como base mercenaria hasta su cierre."
    },
    {
      name: "Alojamiento de Chapaleos",
      era: "Harford actual",
      status: "Operativo",
      summary: "Primer refugio estable de la compañía en la isla. Su localización exacta se omite en las copias de circulación abierta."
    },
    {
      name: "Refugio y atraque",
      era: "Harford actual",
      status: "Restringido",
      summary: "Instalación asociada al barco y a la frecuencia segura. El acceso depende del enlace que figura en el registro como Audaz."
    }
  ],
  services: [
    ["Apoyo militar", "Refuerzo táctico, guerrilla y protección de posiciones."],
    ["Exploración", "Reconocimiento terrestre, marítimo y de ruinas."],
    ["Escolta", "Protección de personas, cargamentos y testigos incómodos."],
    ["Transporte", "Movimiento de personal y mercancías sin garantía estética."],
    ["Recuperación", "Objetos, deudas, pruebas y personas que prefieren no ser encontradas."],
    ["Contraespionaje", "Detección de filtraciones, infiltrados y contratantes poco sinceros."]
  ]
};
