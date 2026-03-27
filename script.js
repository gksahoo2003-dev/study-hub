function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("year").innerText = new Date().getFullYear();

const tasks = [
  "4:30 - 5:30 Yoga and Meditation",
  "5:30 - 6:30 Bath and Spiritual Time",
  "6:30 - 7:00 Breakfast",
  "7:00 - 9:00 Python Practice",
  "9:15 - 10:15 English",
  "10:30 - 11:30 Excel / SQL",
  "1:00 - 3:00 Project Work",
  "4:00 - 6:00 Online Class",
  "6:00 - 7:00 Gym",
  "8:00 - 9:30 Study",
  "10:30 Sleep"
];

let saved = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

tasks.forEach((task, i) => {
  let div = document.createElement("div");
  div.className = "task";

  let checked = saved[i] ? "checked" : "";

  div.innerHTML = `
    <input type="checkbox" ${checked} onchange="toggleTask(${i}, this)">
    ${task}
  `;

  taskList.appendChild(div);
});

function toggleTask(i, el) {
  saved[i] = el.checked;
  localStorage.setItem("tasks", JSON.stringify(saved));
}

function openBook(file) {
  document.getElementById("pdfViewer").src = file;
}

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  let list = document.getElementById("notesList");
  list.innerHTML = "";

  notes.forEach((n, i) => {
    list.innerHTML += `
      <div class="task">
        <h4>${n.title}</h4>
        <p>${n.content}</p>
        <button onclick="deleteNote(${i})">Delete</button>
      </div>
    `;
  });
}

function addNote() {
  let title = document.getElementById("noteTitle").value;
  let content = document.getElementById("noteContent").value;

  if (!title || !content) return;

  notes.push({ title, content });
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function deleteNote(i) {
  notes.splice(i, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

renderNotes();