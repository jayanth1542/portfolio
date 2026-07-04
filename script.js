// ---------- Load skills, grouped by category, from skills.json ----------
fetch('skills.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('skills-schedules');

    // Group skills by category, preserving first-seen order
    const groups = {};
    const order = [];
    data.skills.forEach(skill => {
      const cat = skill.category || 'Other';
      if (!groups[cat]) { groups[cat] = []; order.push(cat); }
      groups[cat].push(skill);
    });

    container.innerHTML = order.map(cat => `
      <div class="schedule-group">
        <p class="schedule-heading">SCHEDULE — ${cat.toUpperCase()}</p>
        <table class="schedule-table">
          ${groups[cat].map(s => `
            <tr>
              <td>${s.name}</td>
              <td class="spec-cell">${s.tag || ''}</td>
            </tr>
          `).join('')}
        </table>
      </div>
    `).join('');
  })
  .catch(() => {
    document.getElementById('skills-schedules').innerHTML =
      '<p style="color:var(--text-secondary)">Could not load skills.json</p>';
  });

// ---------- Load projects as a numbered project log ----------
fetch('projects.json')
  .then(res => res.json())
  .then(data => {
    const log = document.getElementById('project-log');
    log.innerHTML = data.projects.map((p, i) => `
      <article class="log-entry">
        <span class="log-no">P-${String(i + 1).padStart(2, '0')}</span>
        <div>
          <div class="log-head">
            <h3 class="log-title">${p.name}</h3>
            <span class="log-status status-${p.status}">${p.status}</span>
          </div>
          <p class="log-desc">${p.description}</p>
          <div class="log-stack">
            ${p.stack.map(s => `<span>${s}</span>`).join('')}
          </div>
          <div class="log-links">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">CODE ↗</a>` : ''}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">LIVE ↗</a>` : ''}
          </div>
        </div>
      </article>
    `).join('');
  })
  .catch(() => {
    document.getElementById('project-log').innerHTML =
      '<p style="color:var(--text-secondary)">Could not load projects.json</p>';
  });

// ---------- Sheet index: highlight active sheet on scroll ----------
const links = document.querySelectorAll('.sheet-link');
const sheets = document.querySelectorAll('main .sheet');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      links.forEach(link => {
        link.classList.toggle('active', link.dataset.sheet === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sheets.forEach(sheet => observer.observe(sheet));

// ---------- Title block print date ----------
document.getElementById('print-date').textContent =
  new Date().toISOString().split('T')[0];
