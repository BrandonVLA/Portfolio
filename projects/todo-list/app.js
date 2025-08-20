const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

//eventlistener for the add-btn
addBtn.addEventListener("click", () => {
  const taskReceived = input.value.trim();
  if (input.value.trim() !== "") {
    //if entered input is different than empty to capture the value
    console.log("Captured Text:", taskReceived);

    const newTask = document.createElement("li");
    newTask.textContent = taskReceived;
    taskList.appendChild(newTask);
    saveTasks();//added saveTasks so each time I add a new task then save remaining tasks
    input.value = "";
    input.style.order = "";
  } else {
    input.style.border = "2px solid red";
    return;
  }
});

taskList.addEventListener("dblclick", (event) => {
  if (event.target.tagName === "LI") {
    event.target.remove();
    saveTasks(); //added saveTasks so each time I delete a task then save remaining tasks
  }
});

//localStorage SaveTasks Function

function saveTasks() {
  //selects all elements(li)  from the taskList
  const tasks = taskList.querySelectorAll('li');
  
  //Creates an array with the with each task text
  const tasksArray = [];
  //searches on 'tasks' array for all the 'li' tags and for each task text push it to 'taskArray'
  tasks.forEach(task => {
    tasksArray.push(task.textContent);
  });

  //Converts the array tasks into a JSON String and saves it
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

//localStorage LoadTasks Function

function loadTasks() {
  //This line will obtain saved tasks if created 
  const savedTasks = localStorage.getItem('tasks');
  //if saved tasks,then process them
  if(savedTasks) {
    const tasksArray = JSON.parse(savedTasks)
  
    // Creates <li></li> elements for each saved task
    tasksArray.forEach(taskText => {
      const newTask = document.createElement('li');
      newTask.textContent = taskText;
      taskList.appendChild(newTask);
    });  
  }
}

//Executes when page loads so it loads all the saved tasks
document.addEventListener('DOMContentLoaded',loadTasks);
