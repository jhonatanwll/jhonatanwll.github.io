// ------- Seleção de elementos -------
const btnVerificar = document.querySelector("#btn-verify")
const palavraInput = document.querySelector("#word")
const resultado = document.querySelector("#result")

// ------- Funções -------
function verificarPalindromo (){
    const palavra = palavraInput.value
    const palavraInvertida = palavra.split("").reverse().join("")

    if(palavra.toLowerCase() === palavraInvertida.toLowerCase()){
        resultado.textContent =  `A palavra "${palavra}" é um palíndromo.`
    } else{
        resultado.textContent =  `A palavra "${palavra}" não é um palíndromo.`
    }
}

// ------- Eventos -------
btnVerificar.addEventListener("click", verificarPalindromo)


palavraInput.addEventListener("keyup", (e)=>{
    if(e.key === "Enter"){
        e.preventDefault()
        verificarPalindromo()
    }
})