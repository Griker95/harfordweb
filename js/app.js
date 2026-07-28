(function () {

  const escapeHTML = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const formatArchiveText = (value) => {
    const text = String(value || '').trim();
    if (!text) return '';
    return text.split(/\n{2,}/).map(block => {
      const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
      if (!lines.length) return '';
      const listLike = lines.every(line => /^[-·•]/.test(line));
      if (listLike) {
        return `<ul>${lines.map(line => `<li>${escapeHTML(line.replace(/^[-·•]\s*/, ''))}</li>`).join('')}</ul>`;
      }
      return `<p>${lines.map(escapeHTML).join('<br>')}</p>`;
    }).join('');
  };

  const renderSimpleList = (items) => Array.isArray(items) && items.length
    ? `<ul>${items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`
    : '<p class="muted-record">No consta en el registro.</p>';
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
        const sectionCount = c.category === 'actual' ? 'Expediente operativo y ficha de campo' : 'Archivo biográfico';
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
              <div class="dossier-section-count">${sectionCount}</div>
              <div class="dossier-footer">
                <span><i class="status-dot ${c.category === 'historico' ? 'historical' : ''}"></i>${c.status}</span>
                <span>Consultar ficha →</span>
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

    const roleSection = Array.isArray(record.roleTags) && record.roleTags.length ? `
      <section class="dossier-section operational-card role-card">
        <div class="kicker">Posición dentro de la compañía</div>
        <h2>Rol en el grupo</h2>
        <p class="operational-lead">${record.summary}</p>
        <div class="role-tag-grid">
          ${record.roleTags.map((tag, index) => `<span><i>${String(index + 1).padStart(2, '0')}</i>${tag}</span>`).join('')}
        </div>
      </section>` : '';

    const contributionSection = Array.isArray(record.contributions) && record.contributions.length ? `
      <section class="dossier-section operational-card contribution-card">
        <div class="kicker">Recursos reconocidos</div>
        <h2>Lo que aporta al grupo</h2>
        <div class="contribution-list">
          ${record.contributions.map(item => `<article><span aria-hidden="true">◆</span><div><strong>${item.title}</strong><p>${item.text}</p></div></article>`).join('')}
        </div>
      </section>` : '';

    const traitsSection = (Array.isArray(record.strengths) || Array.isArray(record.weaknesses)) ? `
      <div class="trait-grid">
        ${Array.isArray(record.strengths) ? `
          <section class="dossier-section trait-card strengths-card">
            <div class="kicker">Evaluación favorable</div>
            <h2>Fortalezas</h2>
            <ul>${record.strengths.map(item => `<li>${item}</li>`).join('')}</ul>
          </section>` : ''}
        ${Array.isArray(record.weaknesses) ? `
          <section class="dossier-section trait-card weaknesses-card">
            <div class="kicker">Factores de riesgo</div>
            <h2>Debilidades</h2>
            <ul>${record.weaknesses.map(item => `<li>${item}</li>`).join('')}</ul>
          </section>` : ''}
      </div>` : '';

    const relationsSection = Array.isArray(record.relationships) && record.relationships.length ? `
      <section class="dossier-section relationship-card">
        <div class="kicker">Dinámicas internas</div>
        <h2>Relaciones clave</h2>
        <div class="relationship-list">
          ${record.relationships.map(item => `<div><strong>${item.name}</strong><span>${item.text}</span></div>`).join('')}
        </div>
      </section>` : '';

    const profileSummary = (record.combat || record.objective) ? `
      <div class="profile-summary-grid">
        ${record.combat ? `<section class="dossier-section compact-profile-card"><div class="kicker">Método de campo</div><h2>Combate</h2><p>${record.combat}</p></section>` : ''}
        ${record.objective ? `<section class="dossier-section compact-profile-card"><div class="kicker">Motivación registrada</div><h2>Objetivo</h2><p>${record.objective}</p></section>` : ''}
      </div>` : '';


    const profileData = record.profileData || {};
    const factsSection = Array.isArray(profileData.facts) && profileData.facts.length ? `
      <section class="dossier-section declared-profile-card">
        <div class="kicker">Datos declarados</div>
        <h2>Registro de identidad</h2>
        <div class="declared-facts-grid">
          ${profileData.facts.map(item => `
            <div><span>${escapeHTML(item.label)}</span><strong>${escapeHTML(item.value)}</strong></div>
          `).join('')}
        </div>
        ${profileData.currentState ? `<div class="current-condition"><strong>Estado observado</strong>${formatArchiveText(profileData.currentState)}</div>` : ''}
      </section>` : '';

    const publicNotesSection = Array.isArray(profileData.publicNotes) && profileData.publicNotes.length ? `
      <section class="dossier-section public-notes-card">
        <div class="kicker">Anotaciones visibles</div>
        <h2>Rasgos y equipo observados</h2>
        <div class="public-note-grid">
          ${profileData.publicNotes.map(item => `
            <article class="${item.active ? 'is-active' : ''}">
              <span>${item.active ? 'Vigente' : 'Archivado'}</span>
              <h3>${escapeHTML(item.title)}</h3>
              ${formatArchiveText(item.text)}
            </article>
          `).join('')}
        </div>
      </section>` : '';

    const personalityAxesSection = Array.isArray(profileData.personalityAxes) && profileData.personalityAxes.length ? `
      <section class="dossier-section personality-axes-card">
        <div class="kicker">Evaluación declarada</div>
        <h2>Rasgos de carácter</h2>
        <div class="personality-axis-list">
          ${profileData.personalityAxes.map(axis => {
            const scale = Math.max(Number(axis.scale) || 6, 1);
            const position = Math.max(0, Math.min(100, ((Number(axis.value) || 1) - 1) / Math.max(scale - 1, 1) * 100));
            return `<div class="personality-axis">
              <div><span>${escapeHTML(axis.left)}</span><span>${escapeHTML(axis.right)}</span></div>
              <i><b style="left:${position}%"></b></i>
            </div>`;
          }).join('')}
        </div>
      </section>` : '';

    const renderDisclosureSections = (sections, heading, kicker) =>
      Array.isArray(sections) && sections.length ? `
        <section class="dossier-section archive-section-stack">
          <div class="kicker">${kicker}</div>
          <h2>${heading}</h2>
          <div class="archive-disclosure-list">
            ${sections.map((item, index) => `
              <details ${index === 0 ? 'open' : ''}>
                <summary>${escapeHTML(item.title)}</summary>
                <div class="archive-disclosure-body">${formatArchiveText(item.text)}</div>
              </details>
            `).join('')}
          </div>
        </section>` : '';

    const backgroundSections = renderDisclosureSections(
      profileData.backgroundSections,
      'Trasfondo registrado',
      'Antecedentes declarados'
    );

    const narrativeSections = renderDisclosureSections(
      profileData.narrativeSections,
      'Historia, aspecto y pertenencias',
      'Documentación personal'
    );

    const mechanicsSections = renderDisclosureSections(
      profileData.mechanicsSections,
      'Rasgos, especialización y magia',
      'Anexos de campo'
    );

    const combat = profileData.combatSheet;
    const combatSheetSection = combat ? `
      <section class="dossier-section combat-sheet-card">
        <div class="kicker">Hoja táctica</div>
        <div class="combat-sheet-heading">
          <div>
            <h2>Ficha de campo</h2>
            <p>${combat.classes.map(entry => `${escapeHTML(entry.name)}${entry.level ? ` · nivel ${entry.level}` : ''}`).join(' / ')}</p>
          </div>
          ${combat.proficiencyBonus !== null && combat.proficiencyBonus !== undefined
            ? `<span class="proficiency-seal">Competencia +${escapeHTML(combat.proficiencyBonus)}</span>` : ''}
        </div>
        ${combat.notice ? `<div class="record-warning">${escapeHTML(combat.notice)}</div>` : ''}
        <div class="combat-resource-grid">
          ${(combat.resources || []).map(item => `<div><span>Recurso</span><strong>${escapeHTML(item)}</strong></div>`).join('')}
          ${(combat.armor || []).map(item => `<div><span>Armadura</span><strong>${escapeHTML(item)}</strong></div>`).join('')}
        </div>
        <div class="attribute-grid">
          ${Object.entries(combat.attributes || {}).map(([name, value]) => `
            <div><span>${escapeHTML(name)}</span><strong>${escapeHTML(value.score)}</strong><small>${Number(value.modifier) >= 0 ? '+' : ''}${escapeHTML(value.modifier)}</small></div>
          `).join('')}
        </div>
        <div class="combat-columns">
          <div>
            <h3>Armas</h3>
            ${renderSimpleList(combat.weapons)}
          </div>
          <div>
            <h3>Tiradas de salvación</h3>
            ${renderSimpleList(combat.savingThrows)}
          </div>
          <div>
            <h3>Habilidades</h3>
            ${renderSimpleList(combat.skills)}
          </div>
          <div>
            <h3>Idiomas</h3>
            ${renderSimpleList(combat.languages)}
          </div>
        </div>
        <details class="combat-extra">
          <summary>Consultar competencias y dotes</summary>
          <div class="combat-extra-grid">
            <div><h3>Competencias</h3>${renderSimpleList(combat.proficiencies)}</div>
            <div><h3>Dotes</h3>${renderSimpleList(combat.feats)}</div>
          </div>
        </details>
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
        <h2>Historial registrado</h2>
        <div class="operation-list">
          ${record.operations.map(op => `<div class="operation-item"><strong>${op}</strong><small>Referencia disponible en el archivo histórico.</small></div>`).join('')}
        </div>
      </section>` : '';

    const isOperational = Boolean(record.roleTags || record.contributions || record.strengths || record.relationships);

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
          <div class="data-row"><span>Formato</span><strong>${isOperational ? 'Ficha operativa' : 'Archivo histórico'}</strong></div>
        </div>
        <a class="back-link" href="personajes.html">← Volver al registro</a>
      </aside>
      <div class="dossier-content">
        <section class="dossier-section dossier-intro">
          <div class="kicker">Expediente individual</div>
          <h2>${record.name}</h2>
          ${!isOperational ? `<p class="lead">${record.summary}</p>` : ''}
          <blockquote class="quote">“${record.quote}”</blockquote>
        </section>
        ${factsSection}
        ${isOperational ? `<div class="operational-top-grid">${roleSection}${contributionSection}</div>${traitsSection}${relationsSection}${profileSummary}` : ''}
        ${publicNotesSection}
        ${personalityAxesSection}
        ${backgroundSections}
        ${narrativeSections}
        ${biography}
        ${skills}
        ${combatSheetSection}
        ${mechanicsSections}
        ${operations}
        <section class="dossier-section archivist-note"><div class="stamp">Observación de archivo</div><p>${record.notes}</p></section>
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
