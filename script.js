
console.log("Script loaded");

const taskInput = document.getElementById("task-input");
const taskPriority = document.getElementById("task-priority");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const maxTasks = 15;

// Load saved tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("justOneDayTasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.priority, task.completed));
  sortTasks(); // ensure sorting on load
});

// Add Task on Button Click
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const priority = taskPriority.value;

  if (!text) return;

  if (taskList.children.length >= maxTasks) {
    alert("You can only add up to 15 tasks.");
    return;
  }

  renderTask(text, priority, false);
  saveTasks();
  taskInput.value = "";
  sortTasks();
});

// Render a single task in DOM
function renderTask(text, priority, completed = false) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task", priority);
  if (completed) taskItem.classList.add("completed");

  taskItem.style.display = "flex";
  taskItem.style.alignItems = "center";
  taskItem.style.justifyContent = "space-between";
  taskItem.style.marginBottom = "6px";

  const left = document.createElement("div");
  left.style.display = "flex";
  left.style.alignItems = "center";
  left.style.gap = "10px";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.classList.add("task-checkbox");

  const span = document.createElement("span");
  span.textContent = text;
  if (completed) span.style.textDecoration = "line-through";

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
    }
    saveTasks();
  });

  left.appendChild(checkbox);
  left.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.background = "#f44336";
  deleteBtn.style.color = "#fff";
  deleteBtn.style.border = "none";
  deleteBtn.style.borderRadius = "50%";
  deleteBtn.style.width = "24px";
  deleteBtn.style.height = "24px";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.fontSize = "12px";

  deleteBtn.addEventListener("click", () => {
    taskItem.remove();
    saveTasks();
  });

  taskItem.appendChild(left);
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
}

// Save all tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach(task => {
    const text = task.querySelector("span").textContent;
    const priority = task.classList.contains("red")
      ? "red"
      : task.classList.contains("yellow")
      ? "yellow"
      : "green";
    const completed = task.querySelector("input").checked;

    tasks.push({ text, priority, completed });
  });
  localStorage.setItem("justOneDayTasks", JSON.stringify(tasks));
}

// Sort tasks by priority (red > yellow > green)
function sortTasks() {
  const tasks = Array.from(taskList.children);
  tasks.sort((a, b) => {
    const p = ["red", "yellow", "green"];
    const aPriority = p.findIndex(cls => a.classList.contains(cls));
    const bPriority = p.findIndex(cls => b.classList.contains(cls));
    return aPriority - bPriority;
  });
  tasks.forEach(task => taskList.appendChild(task));
}

// Open/Close popup
document.getElementById("open-todo").addEventListener("click", () => {
  const popup = document.getElementById("just-one-day");
  popup.style.display = "block";
  popup.scrollIntoView({ behavior: "smooth" });
});
document.getElementById("close-todo").addEventListener("click", () => {
  document.getElementById("just-one-day").style.display = "none";
});

// Seven Taekr button
document.getElementById("open-weekly")?.addEventListener("click", () => {
  window.open("seven.html", "_blank");
});
