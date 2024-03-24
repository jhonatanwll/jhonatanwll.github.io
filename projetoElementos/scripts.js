const mensagens = [
    {
        elemento: "Primeiro tempo da Terra",
        mensagem: "As energias do mês de Janeiro influenciam a observação, a paciência. É um mês lento que prepara para o resto do ano",
    },
    {
        elemento: "Primeiro tempo do Ar",
        mensagem: "Mês de Fevereiro",
    },
    {
        elemento: "Primeiro tempo da Água",
        mensagem: "Mês de Março",
    },
    {
        elemento: "Primeiro tempo do Fogo",
        mensagem: "Mês de Abril",
    },
    {
        elemento: "Segundo tempo da Terra",
        mensagem: "Mês de Maio",
    },
    {
        elemento: "Segundo tempo do Ar",
        mensagem: "Mês de Junho",
    },
    {
        elemento: "Segundo tempo da Água",
        mensagem: "Mês de Julho",
    },
    {
        elemento: "Segundo tempo do Fogo",
        mensagem: "Mês de Agosto",
    },
    {
        elemento: "Terceiro tempo da Terra",
        mensagem: "Mês de Setembro",
    },
    {
        elemento: "Terceiro tempo do Ar",
        mensagem: "Mês de Outubro",
    },
    {
        elemento: "Terceiro tempo da Água",
        mensagem: "Mês de Novembro",
    },
    {
        elemento: "Terceiro tempo do Fogo",
        mensagem: "Mês de Dezembro",
    },
    
]
// ------- Seleção de elementos -------
const resultado = document.querySelector("#output")
const resultadoDiv = document.querySelector(".output-group")
const resultadoTexto = document.querySelector("#message-p")
const descobrirBtn = document.querySelector("#descobrir-btn")
const mesSelect = document.querySelector("#month-select")



// ------- Funções -------
function descobrir() {
    // verifica opção selecionada
    const mesId = mesSelect.value;

    // mostra o texto de acordo com o resultado
    mensagemResultado(mensagens[mesId - 1])
}

// Define o resultado de acordo com a opção escolhida
function mensagemResultado(mensagem) {
    // mostra o texto de acordo com o resultado
    resultado. value = mensagem.elemento;
    resultadoTexto.textContent = mensagem.mensagem;
    resultadoDiv.classList.remove("hide")
}

// ------- Eventos -------
descobrirBtn.addEventListener("click", descobrir)