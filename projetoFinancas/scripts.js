// ------- Seleção de elementos -------
const alerta = document.querySelector(".alerta");
const form = document.querySelector(".form");
const nomeInput = document.querySelector("#nome-input");
const valorInput = document.querySelector("#valor-input");
const enviarBtn = document.querySelector(".enviar-btn");
const container = document.querySelector(".items-container");
const list = document.querySelectorAll(".items-list");
const limparBtns = document.querySelectorAll(".limpar-btn");
const limparBtn0 = document.querySelector("#limpar-btn0");
const limparBtn1 = document.querySelector("#limpar-btn1");
const totalGeral = document.querySelector("#total-geral");
const pessoaSelect = document.querySelector("#pessoa");
const totalPessoa0 = document.querySelector("#totalPessoa0");
const totalPessoa1 = document.querySelector("#totalPessoa1");

let valorTotalPessoa0 = 0;
let valorTotalPessoa1 = 0;
let valorTotal = 0;
valorTotal = parseFloat(valorTotal);

// ------- Eventos -------
// Enviar form
form.addEventListener("click", addItem);
// Limpar itens
limparBtns.forEach((btn) => {
  btn.addEventListener("click", limparItens);
});

// ------- Funções -------
function addItem(e) {
  e.preventDefault();
  const value = parseFloat(valorInput.value);
  const nome = nomeInput.value;
  const id = new Date().getTime().toString();
  pessoaEscolhida = parseFloat(pessoaSelect.value);

  if (value && nome) {
    // Há valor no valorInput
    createListItem(id, value, nome, pessoaEscolhida);
    // ADICIONAR AO ARMAZENAMENTO LOCAL
    addLocalStorage(id, value, nome, pessoaEscolhida);

    displayAlert("Item adicionado", "success");
    // Mostrar container
    // container.classList.add("show");
    toggleContainer(pessoaEscolhida, "show");

    setBackToDefault();
  } else {
    // Valor vazio no valorInput
    displayAlert("Por favor preenchar o nome e o valor do item", "danger");
    setBackToDefault();
  }
}
function createListItem(id, value, nome, pessoa) {
  // Cria um elemento
  const elemento = document.createElement("article");
  // Add uma classe
  elemento.classList.add("item");
  // Add um id
  const attr = document.createAttribute("data-id");
  const itemValor = document.createAttribute("data-value");
  const itemNome = document.createAttribute("data-name");
  const itemPessoa = document.createAttribute("data-pessoa");
  //FORMATAR TODOS OS VALORES E PREVENIR TIPOS DE DADOS ERRADOS
  attr.value = id;
  itemValor.value = parseFloat(value / 2);
  itemNome.value = nome;
  itemPessoa.value = pessoa;
  elemento.setAttributeNode(attr);
  elemento.setAttributeNode(itemValor);
  elemento.setAttributeNode(itemNome);
  elemento.setAttributeNode(itemPessoa);
  elemento.innerHTML = `
    <p class="title">${getTime()} - ${nome}: R$ ${parseFloat(
    itemValor.value
  )}</p>                            
    <div class="btn-container">
        <button class="deletar-btn">
            <i class="fas fa-trash"></i>
        </button>
    </div>
    `;
  const deletarBtn = elemento.querySelector(".deletar-btn");
  deletarBtn.addEventListener("click", deletarItem);
  // Adicionar valor do item a soma total
  total(parseFloat(elemento.dataset.value), "soma", parseFloat(pessoa));
  // Append child
  if (parseFloat(elemento.dataset.pessoa) == 0) {
    list[0].insertBefore(elemento, limparBtn0);
  } else {
    list[1].insertBefore(elemento, limparBtn1);
  }
}

function toggleContainer(pessoa, action) {
  if (action === "show") {
    list[pessoa].classList.add("show");
  } else if (action === "hide") {
    list[pessoa].classList.remove("show");
  } else if (action === "clear") {
    list[0].classList.remove("show");
    list[1].classList.remove("show");
  }
}
function displayAlert(text, type) {
  alerta.textContent = text;
  alerta.classList.add(`alerta-${type}`);
  // Remover alerta
  setTimeout(function () {
    alerta.textContent = "";
    alerta.classList.remove(`alerta-${type}`);
  }, 1000);
}
function setBackToDefault() {
  valorInput.value = "";
  nomeInput.value = "";
  enviarBtn.textContent = "Enviar";
  nomeInput.focus();
}
function deletarItem(e) {
  const elemento = e.currentTarget.parentElement.parentElement;
  const valor = elemento.dataset.value;
  const id = elemento.dataset.id;
  const pessoa = parseFloat(elemento.dataset.pessoa);
  list[pessoa].removeChild(elemento);
  if (list[pessoa].children.length === 2) {
    toggleContainer(pessoa, "hide");
  }
  displayAlert("Item deletado", "danger");
  total(parseFloat(valor), "subtracao", pessoa);
  setBackToDefault();

  // REMOVER DO ARMAZENAMENTO LOCAL
  removeFromLocalStorage(id);
}
function limparItens(e) {
  const lista = e.currentTarget.parentElement;
  const pessoa = parseFloat(lista.dataset.list);
  const itens = lista.querySelectorAll(".item");
  if (itens.length > 0) {
    itens.forEach(function (item) {
      const valor = parseFloat(item.dataset.value);
      total(valor, "subtracao", pessoa);
      lista.removeChild(item);
      removeFromLocalStorage(item.dataset.id)
    });
  }
  toggleContainer(pessoa, "hide");
  displayAlert("Lista limpa", "success");
  setBackToDefault();
  // REMOVER ITEM DO ARMAZENAMENTO LOCAL
}
function total(valor, operacao, pessoa) {
  numPessoa = parseFloat(pessoa);

  if (operacao === "soma") {
    if (numPessoa === 0) {
      // console.log("somar pessoa0")
      valorTotalPessoa0 += valor;
    } else if (numPessoa === 1) {
      // console.log("somar pessoa1")
      valorTotalPessoa1 += valor;
    }
  } else if (operacao === "limpar") {
    if (numPessoa === 0) {
      // console.log("limpar pessoa0")
      valorTotalPessoa0 = 0;
    } else if (numPessoa === 1) {
      // console.log("limpar pessoa1")
      valorTotalPessoa1 = 0;
    }
  } else if (operacao === "subtracao") {
    if (numPessoa === 0) {
      // console.log("subtrair pessoa0")
      valorTotalPessoa0 -= valor;
      if (valorTotalPessoa0 < 0) {
        valorTotalPessoa0 = 0;
      }
    } else if (numPessoa === 1) {
      // console.log("subtrair pessoa1")
      valorTotalPessoa1 -= valor;
      if (valorTotalPessoa1 < 0) {
        valorTotalPessoa1 = 0;
      }
    }
  } else {
    alert("Operação diferente!");
  }

  totalPessoa0.textContent = `Total Jhonatan: R$ ${valorTotalPessoa0.toFixed(
    2
  )}`;
  totalPessoa1.textContent = `Total Mãe: R$ ${valorTotalPessoa1.toFixed(2)}`;

  if (valorTotalPessoa0 > valorTotalPessoa1) {
    // Jhonatan devendo para Mãe
    valorTotal = valorTotalPessoa0 - valorTotalPessoa1;
    totalGeral.textContent = `Total Geral Jhonatan: R$ ${valorTotal.toFixed(
      2
    )}`;
  } else if (valorTotalPessoa1 > valorTotalPessoa0) {
    // Mãe devendo para Jhonata
    valorTotal = valorTotalPessoa1 - valorTotalPessoa0;
    totalGeral.textContent = `Total Geral Mãe: R$ ${valorTotal.toFixed(2)}`;
  } else {
    valorTotal = 0;
    totalGeral.textContent = `Total Geral: R$ ${valorTotal.toFixed(2)}`;
  }
}

// Data
function getTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const month = now.getMonth().toString().padStart(2, "0");
  const monthCorrect = (parseInt(month) + 1).toString().padStart(2, "0");
  const data = `${day}/${monthCorrect}`;
  return data;
}

getTime();

// ***** ARMAZENAMENTO LOCAL *****
function addLocalStorage(id, value, name, pessoa) {
  const itemList = { id, value, name, pessoa };
  let items = getLocalStorage();

  console.log(items.push(itemList));
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function carregarItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value, item.name, item.pessoa);
      toggleContainer(item.pessoa, "show");
    });
  }
}
carregarItems();
