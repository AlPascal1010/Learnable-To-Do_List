const inputBox = document.querySelector(".input-box");
const listContainer = document.getElementById("list-container");


prompt("hello");
function addTask() {
    if (inputBox.value === ''){
        alert("Enter a Task");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value; // Using textContent to set the text
        listContainer.appendChild(li);

        // Create a delete button
        let deleteBtn = document.createElement("span");
        deleteBtn.textContent = "\u00d7";
        deleteBtn.className = "delete-btn";
        li.appendChild(deleteBtn);

        // Add double-click event listener for editing task
        li.addEventListener("dblclick", function() {
            const originalText = li.textContent.trim();
            const editText = prompt("Edit task:", originalText);
            if (editText !== null) {
                li.textContent = editText;
            } else {
                li.textContent = originalText; // Restore original text if cancelled
            }
            saveTasks();
        });

        inputBox.value = "";
        saveTasks();
    }
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveTasks();
    } else if(e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        saveTasks();
    }
}, false);

function saveTasks(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
