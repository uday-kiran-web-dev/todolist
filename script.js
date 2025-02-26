document.addEventListener("DOMContentLoaded", () => {
  //input todo-input
  //list todo-list
  //button add-task-btn

  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const taskButton = document.getElementById("add-task-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task)); //foreach render on by one

  taskButton.addEventListener("click", function () {
    let taskText = todoInput.value.trim();
    if (taskText === "") {
      return console.log("enter input");
    }

    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = "";
    //console.log(newTask);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</span>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });
    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
