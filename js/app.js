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
