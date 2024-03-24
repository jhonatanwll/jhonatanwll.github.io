// ------- Seleção de elementos -------
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const toolbar = document.querySelector("#toolbar")
const editInput = document.querySelector(".edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const searchInput = document.querySelector("#search-input")
const eraseBtn = document.querySelector("#erase-btn")
const filterBtn = document.querySelector("#filter-select")

let oldInputValue;

// ------- Funções -------
const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text;
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)

    // Utilizando os dados da local storage
    // Salvar
    if (done) {
        todo.classList.add("done")
    }

    if (save) {
        saveTodoLocalStorage({ text, done })
    }

    // SET BACK TO DEFAULT
    todoInput.value = "";
    todoInput.focus()
}
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
    console.log(toolbar)
    if(toolbar.style.display == "none") {
        toolbar.style.display = "flex"
    }else{
        toolbar.style.display = "none"
    }
}
const updateTodo = (txt) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = txt

            updateTodoLocalStorage(oldInputValue, txt)
        }
    })

}

const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3").innerText.toLowerCase()

        const normalizedSearch = search.toLowerCase()
        todo.style.display = "flex"

        if (!todoTitle.includes(normalizedSearch)) {
            todo.style.display = "none"
        }

    })
}

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo")

    switch (filterValue) {
        case "all":
            todos.forEach((todo) => todo.style.display = "flex")
            break
        case "done":
            todos.forEach((todo) => todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none")
            break
        case "todo":
            todos.forEach((todo) => !todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none")
            break
    }
}

// ------- Eventos -------
todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const inputValue = todoInput.value;
    if (inputValue) {
        saveTodo(inputValue)
    }
})

document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")

        updateTodosStatusLocalStorage(todoTitle)
    }
    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
        //Remover do Local storage
        removeTodoLocalStorage(todoTitle)
    }
    if (targetEl.classList.contains("edit-todo")) {
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle
        // console.log(oldInputValue)
    }
})


cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()
    toggleForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const editInputValue = editInput.value

    if (editInputValue) {
        // Atualizar
        updateTodo(editInputValue)
    }
    toggleForms()
})

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value

    getSearchTodos(search)
})

eraseBtn.addEventListener("click", (e) => {
    e.preventDefault()

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"))

})
filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value

    filterTodos(filterValue)
})


// Local Storage

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    return todos;
}

const loadTodos = () => {
    const todos = getTodosLocalStorage()

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0)
    })
}

const saveTodoLocalStorage = (todo) => {
    // Pegar todos os todos da Ls
    const todos = getTodosLocalStorage()

    // add o novo todo no arr
    todos.push(todo)

    // salvar tudo na ls
    localStorage.setItem("todos", JSON.stringify(todos))
}

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text !== todoText)

    localStorage.setItem("todos", JSON.stringify(filteredTodos))
}

const updateTodosStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) => { 
        console.log("1" + todo.done)    
        todo.text === todoText ? todo.done = !todo.done : null 
        console.log("2" + todo.done)    
        
    })

    localStorage.setItem("todos", JSON.stringify(todos))

}
const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) => { 
        console.log("1" + todo.done)    
        todo.text === todoOldText ? (todo.text = todoNewText) : null 
        console.log("2" + todo.done)    
        
    })

    localStorage.setItem("todos", JSON.stringify(todos))

}

loadTodos();