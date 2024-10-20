"use strict";
const operators = document.querySelector(".todo-operator");
const todoTask = document.getElementById("task-input");
const todoDate = document.getElementById("date-input");
const addButton = document.querySelector(".add-button");
const editButton = document.querySelector(".edit-button");
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

const showTask = function (data) {
  const todoTasks = data ? data : dataArray;
  if (!todoTasks.length) {
    tBody.innerHTML = '<tr><td colspan="4"> No Data Found! </td></tr>';
    return;
  }
  tBody.innerHTML = "";
  todoTasks.forEach((item) => {
    tBody.innerHTML += `
     <tr>
   <td>${item.task}</td>
   <td>${item.date || "No Date Selected"}</td>
   <td>${item.completed ? "Completed" : "Pending"}</td>
   <td>
     <button onclick='editHandler("${item.id}")'>Edit</button>
     <button onclick= 'toggleHandler("${item.id}")'>${
      item.completed ? "Undo" : "Do"
    }</button>
     <button onclick='deleteHandler("${item.id}")'>Delete</button>
   </td>
 </tr>`;
  });
};
window.addEventListener("load", ()=>showTask());
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
  dataArray = filteredArray;
  saveToLocalStorage();
  showTask();
  showMessage("The record is deleted successfuly!", "success");
};
/////////////////////
const toggleHandler = function (id) {
  const SelectedItem = dataArray.find((item) => item.id === id);
  SelectedItem.completed = !SelectedItem.completed;
  saveToLocalStorage();
  showTask();
  showMessage("Task is edited successfuly", "success");
};
///////////////////////
const editHandler = function (id) {
  const SelectedItem = dataArray.find((item) => item.id === id);
  todoTask.value = SelectedItem.task;
  todoDate.value = SelectedItem.date;
  editButton.style.display = "inline-block";
  addButton.style.display = "none";
  editButton.dataset.id = id;
  //   console.log(SelectedItem);
};

editButton.addEventListener("click", function () {
  const id = event.target.dataset.id;
  const selectedItem = dataArray.find((item) => item.id === id);
  selectedItem.task = todoTask.value;
  selectedItem.date = todoDate.value;
  todoDate.value = todoTask.value = "";
  editButton.style.display = "none";
  addButton.style.display = "inline-block";
  saveToLocalStorage();
  showTask();
  showMessage("The record edited successfully", "success");
});
/////////////////////////////////////
operators.addEventListener("click", function (e) {
  let filtredItem;
  if (e.target.innerText != "All") {
    if (e.target.innerText === "Pending") {
      filtredItem = dataArray.filter((item) => item.completed === false);
    } else {
      filtredItem = dataArray.filter((item) => item.completed === true);
    }
    showTask(filtredItem);
  }else{
    showTask(dataArray)
  }
});
