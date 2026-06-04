function siteBasePath() {
  const depth = window.location.pathname
    .split("/")
    .filter(Boolean)
    .slice(0, -1).length;
  return depth === 0 ? "./" : "../".repeat(depth);
}

async function fetchProjects() {
  const response = await fetch(`${siteBasePath()}assets/data/projects.json`);
  if (!response.ok)
    throw new Error(`Failed to load projects: ${response.status}`);
  return response.json();
}

async function fetchWork() {
  const response = await fetch(`${siteBasePath()}assets/data/work.json`);
  if (!response.ok) throw new Error(`Failed to load work: ${response.status}`);
  return response.json();
}

async function loadComponent(selector, file) {
  const container = document.querySelector(selector);
  if (!container) {
    console.warn(`Container not found: ${selector}`);
    return;
  }

  try {
    const response = await fetch(file);
    if (!response.ok)
      throw new Error(`Failed to load ${file}: ${response.status}`);
    let html = await response.text();

    const base = siteBasePath();
    html = html.replace(/href="HOME"/g, `href="${base}index.html"`);
    html = html.replace(/href="ABOUT"/g, `href="${base}about/index.html"`);
    html = html.replace(/href="WORK"/g, `href="${base}work/index.html"`);
    html = html.replace(
      /href="PROJECTS"/g,
      `href="${base}projects/index.html"`,
    );

    container.innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

function renderProjects(projects = []) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const html = projects
    .map(
      (p) => `
      <article class="project-card">
        ${p.icon ? `<div class="project-icon-wrap"><img class="project-icon" src="${p.icon}" alt="${p.title} icon" loading="lazy" decoding="async" width="64" height="64" /></div>` : ""}
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
    `,
    )
    .join("");

  grid.innerHTML = html;
}

function renderWork(work = {}) {
  const container = document.getElementById("work-content");
  if (!container) return;

  const sections = work.sections || [];

  function renderMeta(item) {
    const pieces = [item.company, item.period, item.location].filter(Boolean);
    if (!pieces.length) return "";
    return `
      <div class="work-meta-list">
        ${pieces.map((piece) => `<span class="work-meta-pill">${piece}</span>`).join("")}
      </div>
    `;
  }

  function renderTechList(technologies = []) {
    if (!technologies.length) return "";
    return `
      <div class="tech-list">
        ${technologies.map((technology) => `<span class="tag">${technology}</span>`).join("")}
      </div>
    `;
  }

  const html = sections
    .map((section) => {
      if (section.type === "skills") {
        const groups = (section.groups || [])
          .map(
            (group) => `
              <div class="skill-category">
                <h4>${group.title}</h4>
                <div class="tech-list">
                  ${(group.items || []).map((item) => `<span class="tag">${item}</span>`).join("")}
                </div>
              </div>
            `,
          )
          .join("");

        return `
          <section class="work-block">
            <h2>${section.title}</h2>
            <div class="skills-grid">${groups}</div>
          </section>
        `;
      }

      if (section.type === "interests" || section.type === "languages") {
        return `
          <section class="work-block">
            <h2>${section.title}</h2>
            <div class="tech-list">
              ${(section.items || []).map((item) => `<span class="tag">${item}</span>`).join("")}
            </div>
          </section>
        `;
      }

      if (section.type === "cta") {
        return `
          <section class="work-block">
            <h2>${section.title}</h2>
            <p>${section.description}</p>
            <a class="btn btn-primary" href="${work.resumeUrl || "../assets/data/Markus_Klund_CV.pdf"}" target="_blank" rel="noreferrer">
              Download PDF Resume
            </a>
          </section>
        `;
      }

      const items = (section.items || [])
        .map(
          (item) => `
            <div class="work-item work-card">
              <h3 class="work-card-title">${item.title}</h3>
              ${renderMeta(item)}
              <p>${item.description}</p>
              ${renderTechList(item.technologies)}
            </div>
          `,
        )
        .join("");

      return `
        <section class="work-block">
          <h2>${section.title}</h2>
          ${items}
        </section>
      `;
    })
    .join("");

  container.innerHTML = html;
}

async function fetchAbout() {
  const response = await fetch(`${siteBasePath()}assets/data/about.json`);
  if (!response.ok) throw new Error(`Failed to load about: ${response.status}`);
  return response.json();
}

function renderAbout(data) {
  const article = document.querySelector(".about-content");
  if (!article) return;

  article.innerHTML = data.sections
    .map((section) => {
      const body =
        section.type === "list"
          ? `<ul class="values-list">${section.content.map((item) => `<li>${item}</li>`).join("")}</ul>`
          : section.content.map((p) => `<p>${p}</p>`).join("");

      return `
      <section class="about-block">
        <h2>${section.title}</h2>
        ${body}
      </section>`;
    })
    .join("");
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

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
}

function setActiveNavLink() {
  const pathname = window.location.pathname;
  let currentPage = "home";

  if (pathname.includes("/about/")) currentPage = "about";
  else if (pathname.includes("/work/")) currentPage = "work";
  else if (pathname.includes("/projects/")) currentPage = "projects";

  const navLinks = document.querySelectorAll("[data-page]");
  navLinks.forEach((link) => {
    if (link.getAttribute("data-page") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function setYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

async function init() {
  const base = siteBasePath();

  await Promise.all([
    loadComponent(".site-header", `${base}components/header.html`),
    loadComponent(".site-footer", `${base}components/footer.html`),
  ]);

  setupMobileNav();
  setActiveNavLink();
  setYear();

  if (document.getElementById("projects-grid")) {
    try {
      const projects = await fetchProjects();
      renderProjects(projects);
    } catch (error) {
      console.error(error);
      renderProjects([]);
    }
  }

  if (document.getElementById("work-content")) {
    try {
      const work = await fetchWork();
      renderWork(work);
    } catch (error) {
      console.error(error);
      renderWork({});
    }
  }

  if (document.querySelector(".about-content")) {
    try {
      const about = await fetchAbout();
      renderAbout(about);
    } catch (error) {
      console.error(error);
    }
  }
}

init();
