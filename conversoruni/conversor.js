// Seleção de elementos
const inputElement = document.querySelector('#input');
const fromElement = document.querySelector('#from');
const toElement = document.querySelector('#to');
const outputElement = document.querySelector('#output');
const messageElement = document.querySelector('#message');
const convertButton = document.querySelector("#convert-btn");

// Funções
function converter() {
    const fromValue = fromElement.value;
    const toValue = toElement.value;

    if (fromValue === toValue) {
        outputElement.value = inputElement.value;
        messageElement.textContent = "";
        return;
    }

    // Converter a entrada para metros
    let metros = null;
    switch (fromValue) {
        case "m":
            metros = inputElement.value
            break
        case "km":
            metros = inputElement.value * 1000;
            break
        case "cm":
            metros = inputElement.value / 100;
            break
        case "mm":
            metros = inputElement.value / 1000;
            break
    }

    // Converter metros para unidade de saída
    let resultado;
    switch (toValue) {
        case "m":
            resultado = metros;
            break
        case "km":
            resultado = metros / 1000;
            break
        case "cm":
            resultado = metros * 100;
            break
        case "mm":
            resultado = metros * 1000;
            break
    }

    //  Exibir resultado no imput
    outputElement.value = resultado
    //  Exibit resultado na mesagem
    const fromLabel = fromElement.options[fromElement.selectedIndex].text
    const toLabel = toElement.options[toElement.selectedIndex].text

    const message = `${inputElement.value} ${fromLabel} equivalem a ${resultado} ${toLabel}!`;    
    messageElement.textContent = message;
    return
}

convertButton.addEventListener("click", converter)