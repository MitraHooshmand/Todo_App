"use strict";
const todoTask = document.getElementById("task-input");
const todoDate = document.getElementById("date-input");
const addButton = document.querySelector(".add-button");
const messagePlaceholdet = document.getElementById("message-placeholder");
let dataArray = [];

const showMessage = function (message, type) {
  messagePlaceholdet.innerHTML = "";
  const pTag = document.createElement("p");
  pTag.innerText = message;
  pTag.classList.add("message");
  pTag.classList.add(`message-${type}`);
  messagePlaceholdet.append(pTag);
  setTimeout(()=>{
    pTag.style.display='none'
  },3000)
};
addButton.addEventListener("click", function () {
  const task = todoTask.value;
  const date = todoDate.value;
  const todoArray = {
    task: task,
    date: date,
    completed: false,
  };
  if (task) {
    dataArray.push(todoArray);
    todoDate.value = todoTask.value = "";
    showMessage("Task added successfuly", "success");
  } else {
    showMessage("Please add a task!", "error");
  }
});
console.log(dataArray);
