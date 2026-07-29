(() => {
  const organizations = typeof HARFORD_ORGANIZATIONS !== 'undefined' ? HARFORD_ORGANIZATIONS : [];
  const contacts = typeof HARFORD_CONTACTS !== 'undefined' ? HARFORD_CONTACTS : [];
  const places = typeof HARFORD_PLACES !== 'undefined' ? HARFORD_PLACES : [];

  const records = [
    ...organizations.map((record, index) => ({...record, kind:'organization', kindLabel:'Organización', sortOrder: record.order ?? index, displayRelation: record.relation, displayClass: record.relationClass, groupTitle: record.groupLabel || record.region || 'Organizaciones conocidas'})),
    ...contacts.map((record, index) => ({...record, kind:'contact', kindLabel:'Persona de interés', sortOrder: 1000 + index, displayRelation: record.relation, displayClass: record.relationClass, groupTitle: record.categoryLabel || 'Personas de interés'})),
    ...places.map((record, index) => ({...record, kind:'place', kindLabel:'Lugar de interés', sortOrder: 2000 + (record.order ?? index), displayRelation: record.reputation, displayClass: record.relationClass, groupTitle: `[Zona] ${record.region}`}))
  ];

  const normalize = value => (value || '').toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const isFavorable = record => ['friendly','revered','honored'].includes(record.displayClass);
  const isAdverse = record => ['hostile','adverse'].includes(record.displayClass);
  const matchesFilter = (record, filter) => {
    if (filter === 'all') return true;
    const haystack = normalize([record.group,record.groupLabel,record.groupTitle,record.region,record.category,record.categoryLabel,record.type].join(' '));
    if (filter === 'pantano') return haystack.includes('pantano de las penas') || haystack.includes('pantano');
    if (filter === 'chapaleos') return haystack.includes('chapaleos');
    if (filter === 'carteles') return haystack.includes('cartel') || haystack.includes('criminal');
    if (filter === 'favorable') return isFavorable(record);
    if (filter === 'adverse') return isAdverse(record);
    return true;
  };

  const iconFor = record => record.icon || 'assets/harford-emblem.png';
  const hrefFor = record => {
    const page = record.kind === 'organization' ? 'organizacion.html' : 'expediente.html';
    return `${page}?tipo=${encodeURIComponent(record.kind)}&id=${encodeURIComponent(record.id)}`;
  };

  const grid = document.querySelector('[data-intelligence-grid]');
  if (grid) {
    let activeType = 'all';
    let activeFilter = 'all';
    let query = '';
    const statsRoot = document.querySelector('[data-intelligence-stats]');

    const render = () => {
      const visible = records.filter(record => {
        const typeMatch = activeType === 'all' || record.kind === activeType;
        const filterMatch = matchesFilter(record, activeFilter);
        const searchText = normalize([
          record.name, record.short, record.region, record.type, record.categoryLabel,
          record.affiliation, record.role, record.control, record.status,
          ...(record.description || []), ...(record.known || []), ...(record.related || [])
        ].join(' '));
        return typeMatch && filterMatch && (!query || searchText.includes(query));
      }).sort((a,b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name,'es'));

      const grouped = new Map();
      visible.forEach(record => {
        const key = `${record.kind}:${record.groupTitle}`;
        if (!grouped.has(key)) grouped.set(key, {title:record.groupTitle, kind:record.kind, records:[]});
        grouped.get(key).records.push(record);
      });

      grid.innerHTML = visible.length ? [...grouped.values()].map(group => `
        <section class="archive-group intelligence-group" data-kind="${group.kind}">
          <header class="archive-group-heading"><span>${group.kind === 'organization' ? 'Organizaciones' : group.kind === 'contact' ? 'Personas de interés' : 'Lugares de interés'}</span><h2>${group.title}</h2><small>${group.records.length} ${group.records.length === 1 ? 'expediente' : 'expedientes'}</small></header>
          <div class="intelligence-card-grid">${group.records.map(renderCard).join('')}</div>
        </section>`).join('') : '<div class="empty-state">No hay expedientes que coincidan con los criterios seleccionados.</div>';
    };

    const renderCard = record => {
      const description = (record.description || [])[0] || '';
      const secondary = record.kind === 'place' ? record.control : record.kind === 'contact' ? record.affiliation : record.type;
      return `<a class="intelligence-card kind-${record.kind}" href="${hrefFor(record)}">
        <div class="intelligence-card-head"><img src="${iconFor(record)}" alt="" loading="lazy"><div><span>${record.kindLabel}</span><h3>${record.name}</h3><small>${record.region || record.categoryLabel || ''}</small></div></div>
        <div class="intelligence-card-body"><span class="reputation-badge ${record.displayClass || 'neutral'}">${record.displayRelation || 'Sin registrar'}</span><p>${description}</p><div class="intelligence-card-meta"><span>${secondary || 'Información limitada'}</span><strong>Abrir expediente →</strong></div></div>
      </a>`;
    };

    if (statsRoot) {
      const regions = new Set(records.map(r => r.region).filter(Boolean)).size;
      statsRoot.innerHTML = `<div class="status-item"><span>Organizaciones</span><strong>${organizations.length}</strong></div><div class="status-item"><span>Personas de interés</span><strong>${contacts.length}</strong></div><div class="status-item"><span>Lugares registrados</span><strong>${places.length}</strong></div><div class="status-item"><span>Ámbitos conocidos</span><strong>${regions}</strong></div>`;
    }

    document.querySelectorAll('[data-intel-type]').forEach(button => button.addEventListener('click', () => {
      activeType = button.dataset.intelType;
      document.querySelectorAll('[data-intel-type]').forEach(item => item.classList.toggle('active', item === button));
      render();
    }));
    document.querySelectorAll('[data-intel-filter]').forEach(button => button.addEventListener('click', () => {
      activeFilter = button.dataset.intelFilter;
      document.querySelectorAll('[data-intel-filter]').forEach(item => item.classList.toggle('active', item === button));
      render();
    }));
    const search = document.querySelector('[data-intel-search]');
    if (search) search.addEventListener('input', () => { query = normalize(search.value.trim()); render(); });
    render();
  }

  const detail = document.querySelector('[data-intelligence-detail]');
  if (detail && new URLSearchParams(location.search).get('tipo')) {
    detail.classList.add('intelligence-detail');
    const characterDossier = document.querySelector('[data-dossier]');
    if (characterDossier) characterDossier.hidden = true;
    const params = new URLSearchParams(location.search);
    const requestedType = params.get('tipo');
    const id = params.get('id');
    const record = records.find(item => item.id === id && (!requestedType || item.kind === requestedType));
    if (!record) {
      detail.innerHTML = '<div class="empty-state">El expediente solicitado no existe o ha sido retirado del archivo.</div>';
      return;
    }
    document.title = `${record.name} · Inteligencia Harford`;
    const hero = document.querySelector('.page-hero');
    const heroLabels = {
      organization: 'Expediente de organización',
      contact: 'Expediente de persona de interés',
      place: 'Expediente de lugar de interés'
    };
    if (hero) {
      const breadcrumb = hero.querySelector('.breadcrumb');
      const heading = hero.querySelector('h1');
      const summary = hero.querySelector('p');
      if (breadcrumb) breadcrumb.innerHTML = '<a href="intelligence.html">Archivo de inteligencia</a> / Expediente individual';
      if (heading) heading.textContent = heroLabels[record.kind] || 'Expediente de inteligencia';
      if (summary) summary.textContent = 'Resumen interno de la información confirmada, las relaciones conocidas y los riesgos registrados.';
    }
    const sideFacts = record.kind === 'organization'
      ? [['Tipo',record.type],['Región conocida',record.region],['Estado',record.status],['Relación con Harford',record.relation]]
      : record.kind === 'contact'
        ? [['Raza',record.race],['Función',record.role],['Afiliación',record.affiliation],['Estado',record.status]]
        : [['Región',record.region],['Estado',record.status],['Control conocido',record.control],['Reputación',record.reputation]];
    const facts = record.kind === 'organization'
      ? [['Clasificación',record.categoryLabel],['Actividad principal',record.type],['Presencia conocida',record.region],['Situación',record.status]]
      : record.kind === 'contact'
        ? [['Relación con Harford',record.relation],['Afiliación conocida',record.affiliation],['Ámbito de actividad',record.region],['Situación',record.status]]
        : [['Importancia para Harford',record.importance],['Clasificación',record.categoryLabel],['Control conocido',record.control],['Situación',record.status]];
    const listTitle = record.kind === 'place' ? 'Relaciones registradas' : 'Información conocida';
    const list = record.kind === 'place' ? (record.related || []) : (record.known || []);
    detail.innerHTML = `<article class="archive-profile">
      <aside class="archive-profile-side"><div class="archive-profile-mark"><img class="archive-profile-icon" src="${iconFor(record)}" alt=""><div><h1>${record.name}</h1><div class="profile-subtitle">${record.categoryLabel || record.kindLabel}</div></div></div><span class="reputation-badge ${record.displayClass || 'neutral'}">${record.displayRelation || 'Sin registrar'}</span><div class="data-list">${sideFacts.map(([label,value]) => `<div class="data-row"><span>${label}</span><strong>${value || 'No consta'}</strong></div>`).join('')}</div><a class="back-link" href="intelligence.html">← Volver a Inteligencia</a></aside>
      <div class="archive-profile-main"><div class="archive-zone-line">${record.groupTitle || record.region || record.kindLabel}</div><div class="kicker">Resumen del expediente</div><h2>${record.name}</h2>${(record.description || []).map(p => `<p class="lead">${p}</p>`).join('')}<div class="archive-facts">${facts.map(([label,value]) => `<div class="archive-fact"><span>${label}</span><strong>${value || 'No consta'}</strong></div>`).join('')}</div><div class="kicker">${listTitle}</div><ul class="archive-list">${list.map(item => `<li>${item}</li>`).join('')}</ul>${record.note ? `<div class="archive-note"><span>Anotación del archivo</span><p>“${record.note}”</p></div>` : ''}</div>
    </article>`;
  }
})();
