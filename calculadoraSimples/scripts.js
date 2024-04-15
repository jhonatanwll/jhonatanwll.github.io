// ------- Seleção de elementos -------
const display = document.querySelector("#displayInput");
const btnIgual = document.querySelector(".igual");
const btnPonto = document.querySelector(".ponto");
const btnReset = document.querySelector("#reset");
const btnsNumeros = document.querySelectorAll(".num");
const btnsOperadores = document.querySelectorAll(".operador");

// Variáveis globais
let operacaoAtual = "";
let operador = null;
let valorAnterior = "";
let calculando = false;

// ------- Funções -------
function atualizaDisplay() {
  display.value = operacaoAtual;
}

function insereNumero(e) {
  if (calculando) {
    operacaoAtual = e.target.textContent;
    calculando = false;
  } else {
    operacaoAtual += e.target.textContent;
  }

  atualizaDisplay();
}
function inserePonto() {
  if (operacaoAtual.indexOf(".") === -1) {
    operacaoAtual += ".";
    atualizaDisplay();
  }
}
function insereOperador(e) {
  if (operacaoAtual !== "") {
    if (!calculando) {
      if (operador !== null) {
        calcula();
        console.log("Op !null");
      }
      valorAnterior = operacaoAtual;
      operacaoAtual = "";
      console.log("Op null");
    }
    operador = e.target.textContent;
  }
}

function calcula() {
  let resultado = null;
  const operandoAnterior = parseFloat(valorAnterior);
  const operandoAtual = parseFloat(operacaoAtual);

  switch (operador) {
    case "+":
      resultado = operandoAnterior + operandoAtual;
      break;
    case "-":
      resultado = operandoAnterior - operandoAtual;
      break;
    case "*":
      resultado = operandoAnterior * operandoAtual;
      break;
    case "/":
      resultado = operandoAnterior / operandoAtual;
      break;
  }

  operacaoAtual = String(resultado);
  valorAnterior = operacaoAtual;
  calculando = true;
  atualizaDisplay();
}
function reset () {
    operacaoAtual = "";
    operador = null;
    valorAnterior = "";
    calculando = false;
    atualizaDisplay()
    console.log("reset")
}

// ------- Eventos -------

btnPonto.addEventListener("click", inserePonto);
btnsNumeros.forEach((botao) => botao.addEventListener("click", insereNumero));
btnsOperadores.forEach((botao) =>
  botao.addEventListener("click", insereOperador)
);
btnIgual.addEventListener("click", calcula);
btnReset.addEventListener("click", reset)
