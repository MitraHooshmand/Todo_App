"use strict";
const todoTask = document.getElementById("task-input");
const todoDate = document.getElementById("date-input");
const addButton = document.querySelector(".add-button");
const messagePlaceholdet = document.getElementById("message-placeholder");
let dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];
console.log(dataArray);
///////////////////
const generateID = function () {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};
////////////////////////
const showMessage = function (message, type) {
  messagePlaceholdet.innerHTML = "";
  const pTag = document.createElement("p");
  pTag.innerText = message;
  pTag.classList.add("message");
  pTag.classList.add(`message-${type}`);
  messagePlaceholdet.append(pTag);
  setTimeout(() => {
    pTag.style.display = "none";
  }, 3000);
};
/////////////////////////

const saveToLocalStorage = function () {
  localStorage.setItem("dataArray", JSON.stringify(dataArray));
};

////////////////////////
addButton.addEventListener("click", function () {
  const task = todoTask.value;
  const date = todoDate.value;
  const todoArray = {
    id: generateID(),
    task,
    date,
    completed: false,
  };
  if (task) {
    dataArray.push(todoArray);
    saveToLocalStorage();
    todoDate.value = todoTask.value = "";
    showMessage("Task added successfuly", "success");
  } else {
    showMessage("Please add a task!", "error");
  }
});
//////////////////////////
