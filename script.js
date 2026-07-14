// ---------- Load skills, grouped by category, from skills.json ----------
fetch('skills.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('skills-groups');

    const groups = {};
    const order = [];
    data.skills.forEach(skill => {
      const cat = skill.category || 'Other';
      if (!groups[cat]) { groups[cat] = []; order.push(cat); }
      groups[cat].push(skill);
    });

    container.innerHTML = order.map(cat => `
      <div class="skill-group">
        <p class="skill-group-title">${cat}</p>
        <div class="skill-tags">
          ${groups[cat].map(s => `<span class="skill-tag">${s.name}</span>`).join('')}
        </div>
      </div>
    `).join('');
  })
  .catch(() => {
    document.getElementById('skills-groups').innerHTML =
      '<p style="color:var(--text-secondary)">Could not load skills.json</p>';
  });

// ---------- Load projects as clean cards ----------
fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = data.projects.map(p => `
      <article class="project-card">
        <div class="project-head">
          <h3 class="project-name">${p.name}</h3>
          <span class="status-badge status-${p.status}">${p.status}</span>
        </div>
        <p class="project-desc">${p.description}</p>
        <div class="project-stack">
          ${p.stack.map(s => `<span>${s}</span>`).join('')}
        </div>
        <div class="project-links">
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">Code →</a>` : ''}
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Live →</a>` : ''}
        </div>
      </article>
    `).join('');
  })
  .catch(() => {
    document.getElementById('projects-grid').innerHTML =
      '<p style="color:var(--text-secondary)">Could not load projects.json</p>';
  });

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
