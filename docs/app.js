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
    files: ["core-answer-bank.md", "scenario-answers.md"],
    tab: "tab-answers"
  }
};

const content = document.querySelector("#guide-content");
const search = document.querySelector("#search");
const toc = document.querySelector("#toc-links");
const expandAllButton = document.querySelector("#expand-all");
const collapseAllButton = document.querySelector("#collapse-all");
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

function isQuestionHeading(heading) {
  const text = heading.textContent.trim();
  return /^\d+\./.test(text) || /^(JavaScript|TypeScript|HTML\/CSS|React|Next\.js|State|Performance|Testing|Accessibility|API):/.test(text);
}

function makeQuestionRows() {
  const headings = [...content.querySelectorAll("h3")].filter(isQuestionHeading);
  headings.forEach((heading) => {
    const row = document.createElement("details");
    row.className = "qa-item";
    const summary = document.createElement("summary");
    summary.textContent = heading.textContent;
    row.appendChild(summary);

    let sibling = heading.nextElementSibling;
    while (sibling && sibling.tagName !== "H3" && sibling.tagName !== "H2") {
      const next = sibling.nextElementSibling;
      if (sibling.tagName === "DETAILS") {
        [...sibling.children].forEach((child) => {
          if (child.tagName !== "SUMMARY") row.appendChild(child);
        });
        sibling.remove();
      } else {
        row.appendChild(sibling);
      }
      sibling = next;
    }
    heading.replaceWith(row);
  });
}

function getQuestionRows() {
  return [...content.querySelectorAll(".qa-item")];
}

function setAllQuestions(open) {
  getQuestionRows().forEach((row) => {
    row.open = open;
  });
}

function filterSections() {
  const query = search.value.trim().toLowerCase();
  content.querySelectorAll(".guide-section").forEach((section) => {
    const rows = [...section.querySelectorAll(".qa-item")];
    if (rows.length && query) {
      rows.forEach((row) => {
        const match = row.textContent.toLowerCase().includes(query);
        row.hidden = !match;
        if (match) row.open = true;
      });
      section.hidden = !rows.some((row) => !row.hidden);
    } else {
      section.hidden = Boolean(query) && !section.textContent.toLowerCase().includes(query);
    }
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
  const answerControlsVisible = key === "answers";
  expandAllButton.hidden = !answerControlsVisible;
  collapseAllButton.hidden = !answerControlsVisible;
  content.innerHTML = '<div class="loading-state"><span class="loader"></span> Loading your guide...</div>';
  toc.innerHTML = '<span class="muted">Loading sections...</span>';
  try {
    const files = guide.files || [guide.file];
    const responses = await Promise.all(files.map((file) => fetch(file)));
    const failedFile = responses.findIndex((response) => !response.ok);
    if (failedFile !== -1) throw new Error(`Could not load ${files[failedFile]}`);
    currentText = (await Promise.all(responses.map((response) => response.text()))).join("\n\n");
    content.innerHTML = marked.parse(currentText);
    const sections = sectionize();
    if (key === "answers") makeQuestionRows();
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
expandAllButton.addEventListener("click", () => setAllQuestions(true));
collapseAllButton.addEventListener("click", () => setAllQuestions(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== search && document.activeElement.tagName !== "INPUT") {
    event.preventDefault();
    search.focus();
  }
});

loadGuide(currentGuide);
