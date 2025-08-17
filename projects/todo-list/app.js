const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

//eventlistener for the add-btn
addBtn.addEventListener("click", () => {
    taskReceived = input.value.trim();
    if(input.value.trim() !== "") { //if entered input is different than empty to capture the value
        console.log("Captured Text:",taskReceived);

        const newTask =document.createElement("li"); 
        newTask.textContent = taskReceived;
        taskList.appendChild(newTask);
        input.value = "";
        input.style.order = "";
    }else {
        input.style.border = "2px solid red";
        return;
    }
});

taskList.addEventListener('dblclick', (event) => {
    if(event.target.tagName === "LI") {
        event.target.remove();
    }
});