const guides = {
  all: {
    file: "all-sector-react-next-interview-prep.md",
    tab: "tab-all"
  },
  bank: {
    file: "react-next-banking-interview-prep.md",
    tab: "tab-bank"
  },
  answers: {
    file: "scenario-answers.md",
    tab: "tab-answers"
  }
};

const content = document.querySelector("#guide-content");
const search = document.querySelector("#search");
const toc = document.querySelector("#toc-links");
let currentText = "";
let currentGuide = "answers";

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function sectionize() {
  const nodes = [...content.children];
  const sections = [];
  let section = null;

  nodes.forEach((node) => {
    if (node.tagName === "H2") {
      section = document.createElement("section");
      section.className = "guide-section";
      section.id = slugify(node.textContent);
      section.appendChild(node);
      sections.push(section);
    } else if (section) {
      section.appendChild(node);
    }
  });

  content.replaceChildren(...sections);
  return sections;
}

function buildToc(sections) {
  toc.replaceChildren();
  sections.forEach((section) => {
    const heading = section.querySelector("h2");
    if (!heading) return;
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = heading.textContent.replace(/^\d+\.\s*/, "");
    toc.appendChild(link);
  });
}

function filterSections() {
  const query = search.value.trim().toLowerCase();
  content.querySelectorAll(".guide-section").forEach((section) => {
    section.hidden = Boolean(query) && !section.textContent.toLowerCase().includes(query);
  });
  const empty = content.querySelector(".no-results");
  const visible = [...content.querySelectorAll(".guide-section")].some((section) => !section.hidden);
  if (query && !visible && !empty) {
    const message = document.createElement("p");
    message.className = "no-results";
    message.textContent = `No sections match “${query}”. Try a broader term such as security, forms, performance, or testing.`;
    content.appendChild(message);
  } else if ((!query || visible) && empty) {
    empty.remove();
  }
}

async function loadGuide(key) {
  currentGuide = key;
  const guide = guides[key];
  content.innerHTML = '<div class="loading-state"><span class="loader"></span> Loading your guide...</div>';
  toc.innerHTML = '<span class="muted">Loading sections...</span>';
  try {
    const response = await fetch(guide.file);
    if (!response.ok) throw new Error(`Could not load ${guide.file}`);
    currentText = await response.text();
    content.innerHTML = marked.parse(currentText);
    const sections = sectionize();
    if (key === "answers") {
      content.querySelectorAll("details").forEach((details) => {
        details.open = true;
      });
    }
    buildToc(sections);
    filterSections();
  } catch (error) {
    content.innerHTML = `<div class="error-state"><h2>Guide unavailable</h2><p>${error.message}. Open the Markdown source from the footer or refresh the page.</p></div>`;
    toc.innerHTML = '<span class="muted">No sections available</span>';
  }
}

document.querySelectorAll(".guide-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".guide-tab").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    search.value = "";
    loadGuide(button.dataset.guide);
  });
});

search.addEventListener("input", filterSections);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== search && document.activeElement.tagName !== "INPUT") {
    event.preventDefault();
    search.focus();
  }
});

loadGuide(currentGuide);
