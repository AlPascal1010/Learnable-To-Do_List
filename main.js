const inputBox = document.querySelector(".input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === ''){
        alert("Enter a Task");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value; // Using textContent to set the text
        listContainer.appendChild(li);

        // to delete a task
        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = "";
    saveTasks()
}
inputBox.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});


listContainer.addEventListener("click", function(e){
    if(e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        saveTasks()
    }
    else if(e.target.tagName == "SPAN"){
        e.target.parentElement.remove()
        saveTasks()
    }
}, false);

 function editTask(event) {
        const li = event.target.parentElement;
        const taskText = li.textContent;
        const editedTaskText = prompt("Edit Task", taskText.trim());
        if (editedTaskText !== null && editedTaskText.trim() !== "") {
            li.textContent = editedTaskText.trim();
            const editBtn = document.createElement("span");
            editBtn.textContent = "Edit";
            editBtn.className = "edit-btn";
            editBtn.addEventListener("click", editTask);

            const removeBtn = document.createElement("span");
            removeBtn.textContent = "Remove";
            removeBtn.className = "remove-btn";
            removeBtn.addEventListener("click", removeTask);

            li.appendChild(editBtn);
            li.appendChild(removeBtn);
        }
    }


//to make sure refreshing doesnt delt=ete the task

function saveTasks(){
    localStorage.setItem("data", listContainer.innerHTML)
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();