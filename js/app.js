(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
  });

  const grid = document.querySelector('[data-character-grid]');
  if (grid && typeof HARFORD_CHARACTERS !== 'undefined') {
    let activeFilter = 'all';

    const render = () => {
      const records = HARFORD_CHARACTERS.filter(c => activeFilter === 'all' || c.category === activeFilter);
      grid.innerHTML = records.length ? records.map(c => {
        const image = c.portrait || 'assets/harford-emblem.png';
        const imageClass = c.portrait ? '' : 'is-emblem';
        return `
          <a class="dossier-card" href="expediente.html?id=${encodeURIComponent(c.id)}" data-category="${c.category}" style="--record-accent:${c.accent || '#4f88b0'}">
            <div class="dossier-portrait">
              <img class="${imageClass}" src="${image}" alt="Retrato de ${c.name}" loading="lazy">
              <span class="dossier-classification">${c.category === 'historico' ? 'Archivo histórico' : 'Personal activo'}</span>
            </div>
            <div class="dossier-info">
              <div class="dossier-type">${c.type}</div>
              <h3>${c.name}</h3>
              <p>${c.race} · ${c.role}</p>
              <div class="dossier-footer">
                <span><i class="status-dot ${c.category === 'historico' ? 'historical' : ''}"></i>${c.status}</span>
                <span>Ver expediente →</span>
              </div>
            </div>
          </a>`;
      }).join('') : '<div class="empty-state">No hay expedientes en esta clasificación.</div>';
    };

    render();

    document.querySelectorAll('[data-filter]').forEach(button => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter;
        document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b === button));
        render();
      });
    });
  }

  const dossierRoot = document.querySelector('[data-dossier]');
  if (dossierRoot && typeof HARFORD_CHARACTERS !== 'undefined') {
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || 'griker-vaughn';
    const record = HARFORD_CHARACTERS.find(c => c.id === id);

    if (!record) {
      dossierRoot.innerHTML = '<div class="empty-state">El expediente solicitado no existe o ha sido retirado.</div>';
      return;
    }

    document.title = `${record.name} · Archivo Harford`;
    dossierRoot.style.setProperty('--record-accent', record.accent || '#4f88b0');

    const portrait = record.portrait
      ? `<img class="profile-portrait" src="${record.portrait}" alt="Retrato de ${record.name}">`
      : `<div class="profile-emblem-stage"><img class="profile-emblem" src="assets/harford-emblem.png" alt="Emblema de Harford"></div>`;

    const sheet = record.sheet ? `
      <section class="dossier-section visual-record">
        <div class="section-title-row">
          <div><div class="kicker">Documento de evaluación</div><h2>Ficha operativa</h2></div>
          <a class="document-link" href="${record.sheet}" target="_blank" rel="noopener">Abrir a tamaño completo ↗</a>
        </div>
        <a class="sheet-frame" href="${record.sheet}" target="_blank" rel="noopener" aria-label="Abrir la ficha completa de ${record.name}">
          <img src="${record.sheet}" alt="Ficha operativa completa de ${record.name}">
        </a>
        <p class="document-caption">Evaluación interna sobre su función, aportaciones, fortalezas, debilidades, relaciones, combate y objetivo personal.</p>
      </section>` : '';

    const profileSummary = (record.combat || record.objective) ? `
      <section class="dossier-section">
        <div class="kicker">Lectura rápida</div>
        <h2>Perfil operativo</h2>
        <div class="profile-summary-grid">
          ${record.combat ? `<article><span>En combate</span><p>${record.combat}</p></article>` : ''}
          ${record.objective ? `<article><span>Objetivo registrado</span><p>${record.objective}</p></article>` : ''}
        </div>
      </section>` : '';

    const biography = Array.isArray(record.biography) && record.biography.length ? `
      <section class="dossier-section">
        <div class="kicker">Antecedentes</div>
        <h2>Biografía registrada</h2>
        ${record.biography.map(p => `<p>${p}</p>`).join('')}
      </section>` : '';

    const skills = record.skills ? `
      <section class="dossier-section">
        <div class="kicker">Evaluación interna</div>
        <h2>Conducta y capacidades</h2>
        ${record.personality ? `<p>${record.personality}</p>` : ''}
        <div class="skill-list">
          ${Object.entries(record.skills).map(([name, value]) => `
            <div class="skill-row"><span>${name}</span><div class="skill-bar"><i style="width:${value * 10}%"></i></div><small>${value}/10</small></div>`).join('')}
        </div>
      </section>` : '';

    const operations = Array.isArray(record.operations) && record.operations.length ? `
      <section class="dossier-section">
        <div class="kicker">Referencias cruzadas</div>
        <h2>Historial de operaciones</h2>
        <div class="operation-list">
          ${record.operations.map(op => `<div class="operation-item"><strong>${op}</strong><small>Referencia cruzada disponible en el archivo histórico.</small></div>`).join('')}
        </div>
      </section>` : '';

    dossierRoot.innerHTML = `
      <aside class="profile-panel">
        ${portrait}
        <div class="classification stamp">${record.clearance}</div>
        <h1>${record.name}</h1>
        <div class="profile-subtitle">${record.race} · ${record.role}</div>
        <div class="data-list">
          <div class="data-row"><span>Clasificación</span><strong>${record.type}</strong></div>
          <div class="data-row"><span>Estado</span><strong>${record.status}</strong></div>
          <div class="data-row"><span>Afiliación</span><strong>Compañía Harford</strong></div>
          <div class="data-row"><span>Acceso</span><strong>${record.clearance}</strong></div>
        </div>
        <a class="back-link" href="personajes.html">← Volver al registro</a>
      </aside>
      <div class="dossier-content">
        <section class="dossier-section dossier-intro">
          <div class="kicker">Resumen del expediente</div>
          <h2>${record.name}</h2>
          <p class="lead">${record.summary}</p>
          <blockquote class="quote">“${record.quote}”</blockquote>
        </section>
        ${sheet}
        ${profileSummary}
        ${biography}
        ${skills}
        ${operations}
        <section class="dossier-section archivist-note"><div class="stamp">Nota del archivero</div><p>${record.notes}</p></section>
      </div>`;
  }
})();

(function () {
  const accessRank = { abierto: 0, interno: 1, clasificado: 2 };
  const operationGrid = document.querySelector('[data-operation-grid]');
  if (operationGrid && typeof HARFORD_OPERATIONS !== 'undefined') {
    let eraFilter = 'all';
    let clearance = 'abierto';
    let query = '';
    const statsRoot = document.querySelector('[data-operation-stats]');
    const noteRoot = document.querySelector('[data-clearance-note]');

    const renderOperations = () => {
      const allowedRank = accessRank[clearance];
      const records = HARFORD_OPERATIONS.filter(op => {
        const searchable = `${op.title} ${op.subtitle} ${op.location} ${op.status} ${op.year}`.toLowerCase();
        return (eraFilter === 'all' || op.era === eraFilter)
          && accessRank[op.access] <= allowedRank
          && (!query || searchable.includes(query));
      });

      operationGrid.innerHTML = records.length ? records.map(op => `
        <a class="operation-card tone-${op.tone}" href="operacion.html?id=${encodeURIComponent(op.id)}">
          <div class="operation-card-top">
            <span class="operation-year">${op.year}</span>
            <span class="access-badge access-${op.access}">${op.access}</span>
          </div>
          <div class="operation-location">${op.location}</div>
          <h3>${op.title}</h3>
          <p class="operation-subtitle">${op.subtitle}</p>
          <p>${op.summary}</p>
          <div class="operation-card-foot"><span class="result-chip ${op.tone}">${op.status}</span><span>Consultar parte →</span></div>
        </a>`).join('') : '<div class="empty-state">No hay operaciones visibles con estos criterios.</div>';

      const current = records.filter(op => op.era === 'actual').length;
      const historical = records.filter(op => op.era === 'historico').length;
      const success = records.filter(op => op.tone === 'success').length;
      const danger = records.filter(op => op.tone === 'danger').length;
      if (statsRoot) {
        statsRoot.innerHTML = `
          <div><span>Expedientes visibles</span><strong>${records.length}</strong></div>
          <div><span>Etapa actual</span><strong>${current}</strong></div>
          <div><span>Archivo histórico</span><strong>${historical}</strong></div>
          <div><span>Resultados favorables</span><strong>${success}</strong></div>
          <div><span>Derrotas o alertas</span><strong>${danger}</strong></div>`;
      }
    };

    document.querySelectorAll('[data-operation-filter]').forEach(button => {
      button.addEventListener('click', () => {
        eraFilter = button.dataset.operationFilter;
        document.querySelectorAll('[data-operation-filter]').forEach(b => b.classList.toggle('active', b === button));
        renderOperations();
      });
    });
    const search = document.querySelector('[data-operation-search]');
    if (search) search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); renderOperations(); });

    document.querySelectorAll('[data-clearance]').forEach(button => {
      button.addEventListener('click', () => {
        clearance = button.dataset.clearance;
        document.querySelectorAll('[data-clearance]').forEach(b => b.classList.toggle('active', b === button));
        if (noteRoot) {
          noteRoot.textContent = clearance === 'abierto'
            ? 'La copia abierta oculta detalles internos y expedientes clasificados.'
            : clearance === 'interno'
              ? 'Acceso interno: se muestran operaciones de circulación limitada.'
              : 'Acceso clasificado: se muestran todos los expedientes disponibles en este archivo.';
        }
        renderOperations();
      });
    });
    renderOperations();
  }

  const operationDetail = document.querySelector('[data-operation-detail]');
  if (operationDetail && typeof HARFORD_OPERATIONS !== 'undefined') {
    const id = new URLSearchParams(location.search).get('id') || HARFORD_OPERATIONS[0].id;
    const op = HARFORD_OPERATIONS.find(item => item.id === id);
    if (!op) {
      operationDetail.innerHTML = '<div class="empty-state">El parte solicitado no existe o ha sido retirado del archivo.</div>';
    } else {
      document.title = `${op.title} · Operaciones Harford`;
      operationDetail.innerHTML = `
        <article class="operation-report tone-${op.tone}">
          <header class="report-header">
            <div><div class="kicker">${op.year} · ${op.location}</div><h1>${op.title}</h1><p>${op.subtitle}</p></div>
            <div class="report-stamps"><span class="stamp">${op.status}</span><span class="access-badge access-${op.access}">${op.access}</span></div>
          </header>
          <div class="report-grid">
            <section class="report-main">
              <div class="report-section"><div class="report-label">Resumen de archivo</div><p class="lead">${op.summary}</p></div>
              <div class="report-section"><div class="report-label">Objetivos registrados</div><ol class="objective-list">${op.objectives.map(item => `<li>${item}</li>`).join('')}</ol></div>
              <div class="report-section"><div class="report-label">Resultado</div><p>${op.result}</p></div>
            </section>
            <aside class="report-side">
              <div class="report-data"><span>Periodo</span><strong>${op.year}</strong></div>
              <div class="report-data"><span>Zona</span><strong>${op.location}</strong></div>
              <div class="report-data"><span>Clasificación</span><strong>${op.access}</strong></div>
              <div class="report-data"><span>Estado</span><strong>${op.status}</strong></div>
              <div class="participant-block"><span>Personal y fuerzas citadas</span>${op.participants.map(item => `<i>${item}</i>`).join('')}</div>
            </aside>
          </div>
          <footer class="report-note"><span class="stamp">Nota del archivero</span><p>${op.notes}</p></footer>
        </article>
        <a class="back-link operation-back" href="operaciones.html">← Volver al registro de operaciones</a>`;
    }
  }

  if (typeof HARFORD_ASSETS !== 'undefined') {
    const fleetGrid = document.querySelector('[data-fleet-grid]');
    if (fleetGrid) {
      fleetGrid.innerHTML = HARFORD_ASSETS.fleet.map((ship, index) => `
        <article class="ship-card" style="--ship-accent:${ship.accent}">
          <div class="ship-number">0${index + 1}</div>
          <div class="ship-silhouette" aria-hidden="true"><span class="mast"></span><span class="sail sail-a"></span><span class="sail sail-b"></span><span class="hull"></span></div>
          <div class="ship-status">${ship.status}</div>
          <h3>${ship.name}</h3>
          <div class="ship-type">${ship.type}</div>
          <p>${ship.summary}</p>
          <ul>${ship.specs.map(spec => `<li>${spec}</li>`).join('')}</ul>
          <div class="ship-note">${ship.note}</div>
        </article>`).join('');
    }

    const baseList = document.querySelector('[data-base-list]');
    if (baseList) {
      baseList.innerHTML = HARFORD_ASSETS.bases.map((base, index) => `
        <article class="base-entry"><span class="base-index">${String(index + 1).padStart(2, '0')}</span><div><div class="base-meta">${base.era} · ${base.status}</div><h3>${base.name}</h3><p>${base.summary}</p></div></article>`).join('');
    }

    const servicesGrid = document.querySelector('[data-services-grid]');
    if (servicesGrid) {
      servicesGrid.innerHTML = HARFORD_ASSETS.services.map(([name, description], index) => `
        <article class="service-card"><span>${String(index + 1).padStart(2, '0')}</span><h3>${name}</h3><p>${description}</p></article>`).join('');
    }

    const radioMessage = document.querySelector('[data-radio-message]');
    const radioResponses = {
      status: 'Central a unidad de campo: canal operativo. Mantengan posición y esperen instrucciones fragmentadas.',
      audaz: 'Enlace Audaz reconocido. No empleen nombres. Confirmen únicamente disponibilidad, daños y tiempo estimado.',
      contract: 'Solicitud recibida. Remitan naturaleza del problema, riesgo previsto y adelanto disponible. En ese orden.',
      silence: 'Silencio de radio establecido. La siguiente transmisión requerirá nueva identificación.'
    };
    document.querySelectorAll('[data-radio-command]').forEach(button => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-radio-command]').forEach(b => b.classList.toggle('active', b === button));
        if (radioMessage) radioMessage.textContent = radioResponses[button.dataset.radioCommand];
      });
    });
  }
})();

// Controles de la cronología desplegable.
(() => {
  const timelineDetails = [...document.querySelectorAll('.timeline-disclosure')];
  if (!timelineDetails.length) return;

  document.querySelectorAll('[data-timeline-action]').forEach(button => {
    button.addEventListener('click', () => {
      const shouldOpen = button.dataset.timelineAction === 'open';
      timelineDetails.forEach(item => { item.open = shouldOpen; });
    });
  });
})();


(function () {
  const organizationGrid = document.querySelector('[data-organization-grid]');
  if (organizationGrid && typeof HARFORD_ORGANIZATIONS !== 'undefined') {
    let activeFilter = 'all';
    let query = '';
    const statsRoot = document.querySelector('[data-organization-stats]');

    const matchesFilter = (record) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'general') return record.group === 'general';
      if (activeFilter === 'cartels') return record.group === 'carteles' || record.group === 'carteles-menores';
      if (activeFilter === 'pantano') return record.group === 'pantano';
      if (activeFilter === 'chapaleos') return record.group === 'chapaleos';
      if (activeFilter === 'hostile') return ['hostile', 'adverse'].includes(record.relationClass);
      return true;
    };

    const render = () => {
      const records = HARFORD_ORGANIZATIONS.filter(record => {
        const text = `${record.name} ${record.type} ${record.region} ${record.relation} ${record.groupLabel} ${record.description.join(' ')}`.toLowerCase();
        return matchesFilter(record) && (!query || text.includes(query));
      });

      const groups = new Map();
      records.forEach(record => {
        const key = record.groupLabel || 'Otros registros';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(record);
      });

      organizationGrid.innerHTML = groups.size ? [...groups.entries()].map(([label, items]) => `
        <section class="archive-group">
          <header class="archive-group-heading"><span>${label.startsWith('[Zona]') ? 'Registro regional' : 'Clasificación'}</span><h2>${label}</h2><small>${items.length} ${items.length === 1 ? 'expediente' : 'expedientes'}</small></header>
          <div class="organization-grid">
            ${items.map(record => `
              <a class="organization-card ${record.id === 'iv7' ? 'featured' : ''}" href="organizacion.html?id=${encodeURIComponent(record.id)}">
                <div class="organization-card-head">
                  <img src="${record.icon}" alt="" loading="lazy">
                  <div class="organization-card-title"><span>${record.categoryLabel}</span><h3>${record.name}</h3></div>
                </div>
                <div class="organization-card-body">
                  <span class="reputation-badge ${record.relationClass}">${record.relation}</span>
                  <p>${record.description[0]}</p><p>${record.description[1]}</p>
                  <div class="organization-card-foot"><span>${record.status}</span><span>Abrir expediente →</span></div>
                </div>
              </a>`).join('')}
          </div>
        </section>`).join('') : '<div class="empty-state">Bunny no ha encontrado ningún registro que coincida con la búsqueda.</div>';

      if (statsRoot) {
        const friendly = HARFORD_ORGANIZATIONS.filter(r => ['friendly', 'revered', 'honored'].includes(r.relationClass)).length;
        const hostile = HARFORD_ORGANIZATIONS.filter(r => ['hostile', 'adverse'].includes(r.relationClass)).length;
        const regions = new Set(HARFORD_ORGANIZATIONS.map(r => r.region)).size;
        statsRoot.innerHTML = `<div class="status-item"><span>Registros</span><strong>${HARFORD_ORGANIZATIONS.length}</strong></div><div class="status-item"><span>Relaciones favorables</span><strong>${friendly}</strong></div><div class="status-item"><span>Relaciones adversas</span><strong>${hostile}</strong></div><div class="status-item"><span>Zonas citadas</span><strong>${regions}</strong></div>`;
      }
    };

    document.querySelectorAll('[data-org-filter]').forEach(button => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.orgFilter;
        document.querySelectorAll('[data-org-filter]').forEach(item => item.classList.toggle('active', item === button));
        render();
      });
    });
    const search = document.querySelector('[data-org-search]');
    if (search) search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); render(); });
    render();
  }

  const organizationDetail = document.querySelector('[data-organization-detail]');
  if (organizationDetail && typeof HARFORD_ORGANIZATIONS !== 'undefined') {
    const id = new URLSearchParams(location.search).get('id') || 'iv7';
    const record = HARFORD_ORGANIZATIONS.find(item => item.id === id);
    if (!record) {
      organizationDetail.innerHTML = '<div class="empty-state">El expediente solicitado no existe o ha sido retirado del archivo.</div>';
    } else {
      document.title = `${record.name} · Archivo de inteligencia Harford`;
      organizationDetail.innerHTML = `
        <article class="archive-profile">
          <aside class="archive-profile-side">
            <div class="archive-profile-mark"><img class="archive-profile-icon" src="${record.icon}" alt=""><div><h1>${record.name}</h1><div class="profile-subtitle">${record.categoryLabel}</div></div></div>
            <span class="reputation-badge ${record.relationClass}">${record.relation}</span>
            <div class="data-list"><div class="data-row"><span>Tipo</span><strong>${record.type}</strong></div><div class="data-row"><span>Región conocida</span><strong>${record.region}</strong></div><div class="data-row"><span>Estado</span><strong>${record.status}</strong></div><div class="data-row"><span>Relación con Harford</span><strong>${record.relation}</strong></div></div>
            <a class="back-link" href="organizaciones.html">← Volver al archivo</a>
          </aside>
          <div class="archive-profile-main">
            <div class="archive-zone-line">${record.groupLabel || record.region}</div><div class="kicker">Resumen del expediente</div><h2>${record.name}</h2>
            ${record.description.map(paragraph => `<p class="lead">${paragraph}</p>`).join('')}
            <div class="archive-facts"><div class="archive-fact"><span>Clasificación</span><strong>${record.categoryLabel}</strong></div><div class="archive-fact"><span>Actividad principal</span><strong>${record.type}</strong></div><div class="archive-fact"><span>Presencia conocida</span><strong>${record.region}</strong></div><div class="archive-fact"><span>Situación</span><strong>${record.status}</strong></div></div>
            <div class="kicker">Información conocida</div><ul class="archive-list">${record.known.map(item => `<li>${item}</li>`).join('')}</ul>
            <div class="bunny-note"><span>Anotación de Bunny</span><p>“${record.note}”</p></div>
          </div>
        </article>`;
    }
  }

  const placeGrid = document.querySelector('[data-place-grid]');
  if (placeGrid && typeof HARFORD_PLACES !== 'undefined') {
    const groups = new Map();
    [...HARFORD_PLACES].sort((a,b) => (a.order || 0) - (b.order || 0)).forEach(record => {
      if (!groups.has(record.region)) groups.set(record.region, []);
      groups.get(record.region).push(record);
    });
    placeGrid.innerHTML = [...groups.entries()].map(([region, items]) => `
      <section class="archive-group">
        <header class="archive-group-heading"><span>Zona registrada</span><h2>${region}</h2><small>${items.length} ${items.length === 1 ? 'localización' : 'localizaciones'}</small></header>
        <div class="places-grid">${items.map(record => `
          <a class="place-card" href="lugar.html?id=${encodeURIComponent(record.id)}">
            <div class="place-card-top"><div class="place-card-title"><img class="place-card-icon" src="${record.icon}" alt="" loading="lazy"><div><h3>${record.name}</h3><div class="place-region">${record.region}</div></div></div><span class="reputation-badge ${record.relationClass}">${record.reputation}</span></div>
            <p>${record.description[0]}</p><p>${record.description[1]}</p>
            <div class="place-meta"><div><span>Tipo</span><strong>${record.categoryLabel}</strong></div><div><span>Control conocido</span><strong>${record.control}</strong></div></div>
            <span class="place-card-link">Abrir ficha cartográfica →</span>
          </a>`).join('')}</div>
      </section>`).join('');

    const statsRoot = document.querySelector('[data-place-stats]');
    if (statsRoot) {
      const regions = new Set(HARFORD_PLACES.map(r => r.region)).size;
      const favorable = HARFORD_PLACES.filter(r => ['friendly','revered','honored'].includes(r.relationClass)).length;
      statsRoot.innerHTML = `<div class="status-item"><span>Zonas registradas</span><strong>${regions}</strong></div><div class="status-item"><span>Lugares documentados</span><strong>${HARFORD_PLACES.length}</strong></div><div class="status-item"><span>Puntos favorables</span><strong>${favorable}</strong></div><div class="status-item"><span>Archivo responsable</span><strong>Bunny</strong></div>`;
    }
  }

  const placeDetail = document.querySelector('[data-place-detail]');
  if (placeDetail && typeof HARFORD_PLACES !== 'undefined') {
    const id = new URLSearchParams(location.search).get('id') || HARFORD_PLACES[0].id;
    const record = HARFORD_PLACES.find(item => item.id === id);
    if (!record) {
      placeDetail.innerHTML = '<div class="empty-state">La localización solicitada no figura en el atlas.</div>';
    } else {
      document.title = `${record.name} · Atlas Harford`;
      placeDetail.innerHTML = `
        <article class="archive-profile">
          <aside class="archive-profile-side"><div class="archive-profile-mark"><img class="archive-profile-icon" src="${record.icon}" alt=""><div><h1>${record.name}</h1><div class="profile-subtitle">${record.categoryLabel}</div></div></div><span class="reputation-badge ${record.relationClass}">${record.reputation}</span><div class="data-list"><div class="data-row"><span>Región</span><strong>${record.region}</strong></div><div class="data-row"><span>Estado</span><strong>${record.status}</strong></div><div class="data-row"><span>Control conocido</span><strong>${record.control}</strong></div><div class="data-row"><span>Reputación</span><strong>${record.reputation}</strong></div></div><a class="back-link" href="lugares.html">← Volver al atlas</a></aside>
          <div class="archive-profile-main"><div class="archive-zone-line">${record.region}</div><div class="kicker">Descripción cartográfica</div><h2>${record.name}</h2>${record.description.map(paragraph => `<p class="lead">${paragraph}</p>`).join('')}<div class="archive-facts"><div class="archive-fact"><span>Importancia para Harford</span><strong>${record.importance}</strong></div><div class="archive-fact"><span>Clasificación</span><strong>${record.categoryLabel}</strong></div></div><div class="kicker">Relaciones registradas</div><ul class="archive-list">${record.related.map(item => `<li>${item}</li>`).join('')}</ul><div class="bunny-note"><span>Anotación de Bunny</span><p>“${record.note}”</p></div></div>
        </article>`;
    }
  }

  const contactGrid = document.querySelector('[data-contact-grid]');
  if (contactGrid && typeof HARFORD_CONTACTS !== 'undefined') {
    contactGrid.innerHTML = HARFORD_CONTACTS.map(record => `
      <a class="organization-card contact-card" href="contacto.html?id=${encodeURIComponent(record.id)}">
        <div class="organization-card-head"><img src="${record.icon}" alt="" loading="lazy"><div class="organization-card-title"><span>${record.categoryLabel}</span><h3>${record.name}</h3></div></div>
        <div class="organization-card-body"><span class="reputation-badge ${record.relationClass}">${record.relation}</span><p>${record.description[0]}</p><p>${record.description[1]}</p><div class="organization-card-foot"><span>${record.status}</span><span>Abrir expediente →</span></div></div>
      </a>`).join('');
  }

  const contactDetail = document.querySelector('[data-contact-detail]');
  if (contactDetail && typeof HARFORD_CONTACTS !== 'undefined') {
    const id = new URLSearchParams(location.search).get('id') || HARFORD_CONTACTS[0].id;
    const record = HARFORD_CONTACTS.find(item => item.id === id);
    if (!record) {
      contactDetail.innerHTML = '<div class="empty-state">La persona solicitada no figura en el archivo de contactos.</div>';
    } else {
      document.title = `${record.name} · Contactos Harford`;
      contactDetail.innerHTML = `
        <article class="archive-profile">
          <aside class="archive-profile-side"><div class="archive-profile-mark"><img class="archive-profile-icon" src="${record.icon}" alt=""><div><h1>${record.name}</h1><div class="profile-subtitle">${record.categoryLabel}</div></div></div><span class="reputation-badge ${record.relationClass}">${record.relation}</span><div class="data-list"><div class="data-row"><span>Raza</span><strong>${record.race}</strong></div><div class="data-row"><span>Función</span><strong>${record.role}</strong></div><div class="data-row"><span>Afiliación</span><strong>${record.affiliation}</strong></div><div class="data-row"><span>Estado</span><strong>${record.status}</strong></div></div><a class="back-link" href="contactos.html">← Volver a personas de interés</a></aside>
          <div class="archive-profile-main"><div class="archive-zone-line">${record.categoryLabel}</div><div class="kicker">Resumen del expediente</div><h2>${record.name}</h2>${record.description.map(paragraph => `<p class="lead">${paragraph}</p>`).join('')}<div class="archive-facts"><div class="archive-fact"><span>Relación con Harford</span><strong>${record.relation}</strong></div><div class="archive-fact"><span>Afiliación conocida</span><strong>${record.affiliation}</strong></div><div class="archive-fact"><span>Ámbito de actividad</span><strong>${record.region}</strong></div><div class="archive-fact"><span>Situación</span><strong>${record.status}</strong></div></div><div class="kicker">Información conocida</div><ul class="archive-list">${record.known.map(item => `<li>${item}</li>`).join('')}</ul><div class="bunny-note"><span>Anotación de Bunny</span><p>“${record.note}”</p></div></div>
        </article>`;
    }
  }
})();
