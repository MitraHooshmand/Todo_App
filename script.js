"use strict";
const todoTask = document.getElementById("task-input");
const todoDate = document.getElementById("date-input");
const addButton = document.querySelector(".add-button");
const messagePlaceholdet = document.getElementById("message-placeholder");
const tBody = document.querySelector("tbody");
const deleteAll = document.querySelector(".delete-all");
let dataArray = JSON.parse(localStorage.getItem("dataArray")) || [];
///////////////////
const generateID = function () {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};
////////////////////////

const showTask = function () {
  if (!dataArray.length) {
    tBody.innerHTML = '<tr><td colspan="4"> No Data Found! </td></tr>';
    return;
  }
  tBody.innerHTML = "";
  dataArray.forEach((item) => {
    tBody.innerHTML += `
     <tr>
   <td>${item.task}</td>
   <td>${item.date || "No Date Selected"}</td>
   <td>${item.completed ? "Completed" : "Pending"}</td>
   <td>
     <button>Edit</button>
     <button>Do</button>
     <button onclick='deleteHandler("${item.id}")'>Delete</button>
   </td>
 </tr>`;
  });
};
window.addEventListener("load", showTask);
///////////////////////
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
    showTask();
    todoDate.value = todoTask.value = "";
    showMessage("Task added successfuly", "success");
  } else {
    showMessage("Please add a task!", "error");
  }
});
//////////////////////////
deleteAll.addEventListener("click", function () {
  if (dataArray.length) {
    dataArray = [];
    saveToLocalStorage();
    showTask();
    showMessage("All tasks deleted successfuly!", "success");
  } else {
    showMessage("There is no record to delete!", "error");
  }
});
///////////////////////////////
const deleteHandler = function (id) {
  const filteredArray = dataArray.filter((item) => item.id !== id);
  dataArray=filteredArray;
  saveToLocalStorage()
  showTask()
  showMessage('The record is deleted successfuly!','success')
};
