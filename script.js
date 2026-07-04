// ---------- Load skills from skills.json ----------
fetch('skills.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = data.skills.map(skill => `
      <div class="skill-card">
        <span class="skill-tag">${skill.tag}</span>
        <p class="skill-name">${skill.name}</p>
      </div>
    `).join('');
  })
  .catch(() => {
    document.getElementById('skills-grid').innerHTML =
      '<p style="color:var(--text-secondary)">Could not load skills.json</p>';
  });

// ---------- Load projects from projects.json ----------
fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('projects-list');
    list.innerHTML = data.projects.map(p => `
      <article class="project-card">
        <div class="project-head">
          <h3 class="project-name">${p.name}</h3>
          <span class="status-badge status-${p.status}">${p.status}</span>
        </div>
        <p class="project-desc">${p.description}</p>
        <div class="stack-tags">
          ${p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('')}
        </div>
        <div class="project-links">
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">Code ↗</a>` : ''}
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Live ↗</a>` : ''}
        </div>
      </article>
    `).join('');
  })
  .catch(() => {
    document.getElementById('projects-list').innerHTML =
      '<p style="color:var(--text-secondary)">Could not load projects.json</p>';
  });

// ---------- Pipeline bar: highlight active stage on scroll ----------
const stages = document.querySelectorAll('.stage');
const sections = document.querySelectorAll('main .section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      stages.forEach(stage => {
        stage.classList.toggle('active', stage.dataset.stage === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(section => observer.observe(section));

// ---------- Footer deploy date ----------
document.getElementById('deploy-date').textContent =
  new Date().toISOString().split('T')[0];
