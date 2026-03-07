async function fetchProjects() {
  const response = await fetch("./assets/data/projects.json");
  if (!response.ok) throw new Error(`Failed to load projects: ${response.status}`);
  return response.json();
}

async function loadComponent(selector, file) {
  const container = document.querySelector(selector);
  if (!container) return;
  
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function renderProjects(projects = []) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const html = projects
    .map(
      (p) => `
      <article class="project-card">
        ${p.icon ? `<div class="project-icon-wrap"><img class="project-icon" src="${p.icon}" alt="${p.title} icon" /></div>` : ''}
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p>${p.description}</p>
          <div class="tech-list">
            ${(p.tech || []).map((t) => `<span class="tag">${t}</span>`).join("")}
          </div>
          <p style="margin-top:0.9rem;">
            <a class="btn" href="${p.link}" target="_blank" rel="noreferrer">View Repository</a>
          </p>
        </div>
      </article>
    `
    )
    .join("");

  grid.innerHTML = html;
}

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

async function init() {
  await Promise.all([
    loadComponent("header", "./components/header.html"),
    loadComponent("footer", "./components/footer.html"),
  ]);

  setupMobileNav();
  setYear();

  try {
    const projects = await fetchProjects();
    renderProjects(projects);
  } catch (error) {
    console.error(error);
    renderProjects([]);
  }
}

init();