/* =========================================================
   PROJECT HUB — MAIN JAVASCRIPT
   ========================================================= */


/* ================= MOBILE NAVBAR ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {

  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

});


/* Close mobile menu after clicking a link */

navLinks?.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("active");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* PREMIUM SCROLL REVEAL */

const revealElements =
  document.querySelectorAll(".section-reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold:0.08,
    rootMargin:"0px 0px -60px 0px"
  }
);

revealElements.forEach((element, index) => {

  element.style.transitionDelay =
    `${Math.min(index * 80, 320)}ms`;

  revealObserver.observe(element);

});

/* ================= PROJECT DATA ================= */

const projects = [

  /*
    Future projects yahan add honge.

    Example:

    {
      title: "My Website",
      category: "Web Development",
      description: "A modern responsive website.",
      icon: "fa-globe",
      link: "#"
    }
  */

];


/* ================= PROJECT RENDER ================= */

const projectGrid =
  document.getElementById("projectGrid");

const emptyState =
  document.getElementById("emptyState");

const projectCount =
  document.getElementById("projectCount");


function renderProjects(projectList){

  if (!projectGrid) return;

  projectGrid.innerHTML = "";

  if (projectList.length === 0){

    if (emptyState){
      emptyState.style.display = "block";
    }

    return;

  }

  if (emptyState){
    emptyState.style.display = "none";
  }


  projectList.forEach(project => {

    const card =
      document.createElement("article");

    card.className = "project-card";

    card.innerHTML = `

      <div>

        <div class="project-icon">

          <i class="fa-solid ${project.icon || "fa-code"}"></i>

        </div>

        <h3>${project.title}</h3>

        <p>${project.description}</p>

      </div>

      <div class="project-footer">

        <span class="project-tag">
          ${project.category}
        </span>

        <a
          href="${project.link || "#"}"
          class="project-link"
        >
          View Project →
        </a>

      </div>

    `;

    projectGrid.appendChild(card);

  });

}


/* ================= PROJECT COUNT ================= */

if (projectCount){

  projectCount.textContent =
    projects.length;

}


/* ================= INITIAL LOAD ================= */

renderProjects(projects);


/* ================= SEARCH ================= */

const projectSearch =
  document.getElementById("projectSearch");


projectSearch?.addEventListener("input", () => {

  const searchTerm =
    projectSearch.value
      .toLowerCase()
      .trim();


  const filteredProjects =
    projects.filter(project => {

      return (

        project.title
          .toLowerCase()
          .includes(searchTerm)

        ||

        project.category
          .toLowerCase()
          .includes(searchTerm)

        ||

        project.description
          .toLowerCase()
          .includes(searchTerm)

      );

    });


  renderProjects(filteredProjects);

});

/* ================= CATEGORY FILTER ================= */

const categoryCards =
  document.querySelectorAll(".category-card");

categoryCards.forEach(card => {

  card.addEventListener("click", () => {

    const category =
      card.dataset.category;

    if (!category) return;

    /* Active category */

    categoryCards.forEach(item => {
      item.classList.remove("active");
    });

    card.classList.add("active");


    /* Filter projects */

    const filteredProjects =
      projects.filter(project =>
        project.category === category
      );

    renderProjects(filteredProjects);

  });

});

/* ================= PAGE LOAD ================= */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});