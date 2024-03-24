// ***** SELECIONAR ITEMS *****
const alerta = document.querySelector('.alerta')
const form = document.querySelector('.todo-form')
const inputTodo = document.getElementById('input-todo')
const enviarBtn = document.querySelector('.enviar-btn')
const container = document.querySelector('.todo-container')
const list = document.querySelector('.todo-list')
const limparBtn = document.querySelector('.limpar-btn')

//edit option
let editElement = null;
let editFlag = false;
let editID = "";

// ***** EVENT LISTENERS *****
// Enviar Form
form.addEventListener('submit', addItem)
// Limpar itens
limparBtn.addEventListener('click', limparItens)
// Carregar itens
window.addEventListener('DOMContentLoaded', carregarItens)


// ***** FUNÇÕES *****
function addItem(e) {
    e.preventDefault();
    const value = inputTodo.value;
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        createListItem(id, value)
        
        // display alert
        displayAlert('Item adicionado', "success")
        // show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, value);
        //set back to default
        setBackToDefault();
    }
    else if (value && editFlag) {
        // Editando o item
        editElement.innerHTML = value;
        displayAlert('Valor alterado', 'success')
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault()
    }
    else {
        // Valor vazio
        displayAlert("Nome do item vazio", "danger")
    }
}
// Criar item da lista
function createListItem(id, value) {
    // ADICIONANDO ITENS A LISTA
    const element = document.createElement('article')
    // add class
    element.classList.add('todo-item')
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr)
    element.innerHTML = `
     <p class="title">${value}</p>
       <div class="btn-container">
         <button type="button" class="editar-btn">
           <i class="fas fa-edit"></i>
         </button>
         <button type="button" class="deletar-btn">
           <i class="fas fa-trash"></i>
         </button>
       </div>`;
    const deletarBtn = element.querySelector('.deletar-btn')
    const editarBtn = element.querySelector('.editar-btn')
    deletarBtn.addEventListener('click', deletarItem)
    editarBtn.addEventListener('click', editarItem)
    // append child 
    list.appendChild(element)
}

// Display Alert
function displayAlert(text, action) {
    alerta.textContent = text;
    alerta.classList.add(`alerta-${action}`)
    // remove alert
    setTimeout(function () {
        alerta.textContent = null;
        alerta.classList.remove(`alerta-${action}`)
    }, 1000)
}

// Deletar funcao
function deletarItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element)
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert("Item deletado", "danger")
    setBackToDefault()
    //remove from local storage
    removeFromLocalStorage(id)
}
// Editando item funcao
function editarItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling
    // set form value
    inputTodo.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    enviarBtn.textContent = "Salvar"
}
// Set back to default
function setBackToDefault() {
    inputTodo.value = '';
    editFlag = false;
    editID = '';
    enviarBtn.textContent = 'Enviar'
    inputTodo.focus()
}
// Limpar itens
function limparItens(e) {
    const itens = document.querySelectorAll('.todo-item')

    if (itens.length > 0) {
        itens.forEach(function (item) {
            list.removeChild(item);
        })
    }
    container.classList.remove("show-container")
    displayAlert("Lista limpa", "success")
    setBackToDefault();
    localStorage.removeItem('list')

}

// ***** LOCAL STORAGE *****
function addToLocalStorage(id, value) {
    const itemsList = { id, value };
    let items = getLocalStorage()
    console.log(items)

    items.push(itemsList)
    localStorage.setItem('list', JSON.stringify(items))

}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item
        }
    })
    localStorage.setItem('list', JSON.stringify(items))
}
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    })
    localStorage.setItem('list', JSON.stringify(items))
}
function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}
// localStorage API
// setItem
// getItem
// removeItem
// save asstrings
// localStorage.setItem('orange', JSON.stringify(['item', 'item2']))
// const oranges = JSON.parse(localStorage.getItem('orange'));
// console.log(oranges)
// localStorage.removeItem('orange')

// ***** SETUP ITEMS *****
function carregarItens() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function(item){
            createListItem(item.id, item.value)
        });
        container.classList.add('show-container')
    }
}

