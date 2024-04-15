// ------- Seleção de elementos -------
const tasks = document.querySelectorAll(".tasks li");
let draggedTask = null;


// ------- Funções -------
for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]

    task.addEventListener("dragstart", function (event) {
        draggedTask = task
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("text/html", task.innerHTML)
        task.classList.add("dragging")
    })
    task.addEventListener("dragend", function () {
        draggedTask.classList.remove("dragging")
        draggedTask = null
    })
}
const columns = document.querySelectorAll(".tasks")

for (let i = 0; i < columns.length; i++) {
    const column = columns[i]

    column.addEventListener("dragover", function (e) {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
        column.classList.add("dragover")
    })
    column.addEventListener("dragleave", function () {
        column.classList.remove("dragover")
    })
    column.addEventListener("drop", function (e) {
        e.preventDefault()
        const task = document.createElement("li")
        task.innerHTML = e.dataTransfer.getData("text/html")
        task.setAttribute("draggable", true)
        task.addEventListener("dragstart", function (event) {
            draggedTask = task;
            event.dataTransfer.effectAllowed = "move"
            event.dataTransfer.setData("text/html", task.innerHTML)
            task.classList.add("dragging")
        })
        column.appendChild(task)
        column.classList.remove("dragover")

        const previousColumn = draggedTask.parentNode
        previousColumn.removeChild(draggedTask)
    })
}
const addTaskForm = document.querySelector("#add-task-form")
const addTaskInput = document.querySelector("input")

addTaskForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const newTaskText = addTaskInput.value.trim()

    if (newTaskText !== "") {
        const newTask = document.createElement("li")
        newTask.textContent = newTaskText
        newTask.setAttribute("draggable", true)
        newTask.addEventListener("dragstart", function (event) {
            draggedTask = newTask;
            event.dataTransfer.effectAllowed = "move"
            event.dataTransfer.setData("text/html", newTask.innerHTML)
            newTask.classList.add("dragging")
        })
        document.querySelector("#todo").appendChild(newTask)
        addTaskInput.value = ""
    }
})

// ------- Eventos -------

