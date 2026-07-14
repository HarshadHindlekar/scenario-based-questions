const guides = {
  all: { file: "all-sector-react-next-interview-prep.md" },
  bank: { file: "react-next-banking-interview-prep.md" },
  answers: { files: ["core-answer-bank.md", "scenario-answers.md"] }
};

const content = document.querySelector("#guide-content");
const layout = document.querySelector(".content-layout");
const search = document.querySelector("#search");
const toc = document.querySelector("#toc-links");
const expandAllButton = document.querySelector("#expand-all");
const collapseAllButton = document.querySelector("#collapse-all");
let currentText = "";
let currentGuide = "answers";
let studyState = null;

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
  if (studyState) {
    const current = studyState.filtered[studyState.index];
    if (current?.node?.tagName === "DETAILS") current.node.open = open;
    return;
  }
  getQuestionRows().forEach((row) => {
    row.open = open;
  });
}

function readLearned() {
  try {
    return new Set(JSON.parse(localStorage.getItem("scenario-lab-learned") || "[]"));
  } catch {
    return new Set();
  }
}

function saveLearned(learned) {
  localStorage.setItem("scenario-lab-learned", JSON.stringify([...learned]));
}

function makeStudyMode(sections, mode) {
  const questionMode = mode === "answers";
  const items = questionMode
    ? getQuestionRows().map((row) => {
        const section = row.closest(".guide-section");
        const topic = section?.querySelector("h2")?.textContent.replace(/^\d+\.\s*/, "") || "Interview practice";
        const key = `${section?.id || "general"}:${row.querySelector("summary")?.textContent || "question"}`;
        row.remove();
        return { node: row, topic, key };
      })
    : sections.map((section) => {
        const topic = section.querySelector("h2")?.textContent.replace(/^\d+\.\s*/, "") || "Interview practice";
        section.remove();
        return { node: section, topic, key: section.id };
      });

  if (questionMode) sections.forEach((section) => section.remove());

  const shell = document.createElement("section");
  shell.className = "study-shell";
  shell.setAttribute("aria-label", "Interactive interview study mode");
  shell.innerHTML = `
    <div class="study-header">
      <div>
        <p class="study-eyebrow">Interactive study mode</p>
        <h2 id="study-topic">Interview practice</h2>
      </div>
      <p id="study-progress" class="study-progress" aria-live="polite"></p>
    </div>
    <div id="topic-strip" class="topic-strip" role="tablist" aria-label="Choose a topic"></div>
    <div id="study-card" class="study-card"></div>
    <div class="study-actions">
      <button id="previous-question" type="button">Previous</button>
      <button id="mark-learned" type="button">Mark learned</button>
      <button id="next-question" type="button">Next</button>
    </div>
  `;
  content.prepend(shell);

  const topics = [...new Set(items.map((item) => item.topic))];
  const topicStrip = shell.querySelector("#topic-strip");
  topics.forEach((topic) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "topic-button";
    button.textContent = topic;
    button.setAttribute("role", "tab");
    button.addEventListener("click", () => {
      const firstMatch = studyState.filtered.findIndex((item) => item.topic === topic);
      if (firstMatch >= 0) showStudyItem(firstMatch);
    });
    topicStrip.appendChild(button);
  });

  studyState = {
    items,
    filtered: items,
    index: 0,
    learned: readLearned(),
    shell,
    topics,
    topicStrip
  };

  shell.querySelector("#previous-question").addEventListener("click", () => showStudyItem(studyState.index - 1));
  shell.querySelector("#next-question").addEventListener("click", () => showStudyItem(studyState.index + 1));
  shell.querySelector("#mark-learned").addEventListener("click", () => {
    const item = studyState.filtered[studyState.index];
    if (!item) return;
    if (studyState.learned.has(item.key)) studyState.learned.delete(item.key);
    else studyState.learned.add(item.key);
    saveLearned(studyState.learned);
    showStudyItem(studyState.index, false);
  });

  showStudyItem(0);
}

function showStudyItem(index, resetAnswer = true) {
  if (!studyState || !studyState.filtered.length) return;
  const nextIndex = Math.max(0, Math.min(index, studyState.filtered.length - 1));
  studyState.index = nextIndex;
  const item = studyState.filtered[nextIndex];
  const card = studyState.shell.querySelector("#study-card");
  if (resetAnswer && item.node.tagName === "DETAILS") item.node.open = false;
  card.replaceChildren(item.node);

  studyState.shell.querySelector("#study-topic").textContent = item.topic;
  studyState.shell.querySelector("#study-progress").textContent = `${nextIndex + 1} / ${studyState.filtered.length} | ${studyState.learned.size} learned`;
  studyState.shell.querySelector("#previous-question").disabled = nextIndex === 0;
  studyState.shell.querySelector("#next-question").disabled = nextIndex === studyState.filtered.length - 1;
  const markButton = studyState.shell.querySelector("#mark-learned");
  markButton.textContent = studyState.learned.has(item.key) ? "Learned" : "Mark learned";
  markButton.classList.toggle("is-learned", studyState.learned.has(item.key));

  [...studyState.topicStrip.children].forEach((button) => {
    const active = button.textContent === item.topic;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

function filterSections() {
  const query = search.value.trim().toLowerCase();
  if (studyState) {
    studyState.filtered = query ? studyState.items.filter((item) => item.node.textContent.toLowerCase().includes(query)) : studyState.items;
    studyState.index = Math.min(studyState.index, Math.max(0, studyState.filtered.length - 1));
    const card = studyState.shell.querySelector("#study-card");
    if (!studyState.filtered.length) {
      card.innerHTML = '<p class="no-results">No questions match that search.</p>';
      studyState.shell.querySelector("#study-progress").textContent = "0 matches";
      return;
    }
    showStudyItem(studyState.index);
    return;
  }

  content.querySelectorAll(".guide-section").forEach((section) => {
    section.hidden = Boolean(query) && !section.textContent.toLowerCase().includes(query);
  });
  const empty = content.querySelector(".no-results");
  const visible = [...content.querySelectorAll(".guide-section")].some((section) => !section.hidden);
  if (query && !visible && !empty) {
    const message = document.createElement("p");
    message.className = "no-results";
    message.textContent = `No sections match "${query}". Try security, forms, performance, or testing.`;
    content.appendChild(message);
  } else if ((!query || visible) && empty) {
    empty.remove();
  }
}

async function loadGuide(key) {
  currentGuide = key;
  studyState = null;
  const studyMode = key === "answers" || key === "all" || key === "bank";
  layout.classList.toggle("study-layout", studyMode);
  const answerControlsVisible = key === "answers";
  expandAllButton.hidden = !answerControlsVisible;
  collapseAllButton.hidden = !answerControlsVisible;
  expandAllButton.textContent = answerControlsVisible ? "Reveal" : "+ Expand";
  collapseAllButton.textContent = answerControlsVisible ? "Hide" : "- Collapse";
  content.innerHTML = '<div class="loading-state"><span class="loader"></span> Loading your guide...</div>';
  toc.innerHTML = '<span class="muted">Loading sections...</span>';
  try {
    const guide = guides[key];
    const files = guide.files || [guide.file];
    const responses = await Promise.all(files.map((file) => fetch(file)));
    const failedFile = responses.findIndex((response) => !response.ok);
    if (failedFile !== -1) throw new Error(`Could not load ${files[failedFile]}`);
    currentText = (await Promise.all(responses.map((response) => response.text()))).join("\n\n");
    content.innerHTML = marked.parse(currentText);
    const sections = sectionize();
    if (key === "answers") makeQuestionRows();
    if (studyMode) makeStudyMode(sections, key);
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
  if (studyState && !["INPUT", "TEXTAREA", "BUTTON"].includes(document.activeElement.tagName)) {
    if (event.key === "ArrowLeft") showStudyItem(studyState.index - 1);
    if (event.key === "ArrowRight") showStudyItem(studyState.index + 1);
  }
});

loadGuide(currentGuide);
