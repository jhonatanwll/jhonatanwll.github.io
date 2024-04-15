// ------- Seleção de elementos -------
const form = document.querySelector("#form")
const nome = document.querySelector("#nome")
const email = document.querySelector("#email")
const assunto = document.querySelector("#assunto")
const mensagem = document.querySelector("#mensagem")
const errorMessages = document.querySelectorAll(".error-message")

// ------- Funções -------


// ------- Eventos -------
form.addEventListener('submit', (e) => {
    e.preventDefault();
    resetErrors();
    validateInputs();
});

function setError(input, errorMessage){
    const errorMessageElement = input.nextElementSibling;
    errorMessageElement.textContent = errorMessage;
    input.parentElement.classList.add("error")
}

function resetErrors(){
   errorMessages.forEach((msg)=>{
      msg.textContent = "";
   });
   nome.parentElement.classList.remove("error");
   email.parentElement.classList.remove("error");
   assunto.parentElement.classList.remove("error");
   mensagem.parentElement.classList.remove("error");
}

function validateInputs() {
    const nomeValue = nome.value.trim() // Tira os espaços em branco
    const emailValue = email.value.trim() // Tira os espaços em branco
    const assuntoValue = assunto.value.trim() // Tira os espaços em branco
    const mensagemValue = mensagem.value.trim() // Tira os espaços em branco

    if(nomeValue === ""){
       setError(nome, "Nome não pode ficar em branco") 
    }
    if(emailValue === ""){
       setError(email, "Email não pode ficar em branco") 
    } else if(!isValidEmail(emailValue)){
      setError(email, "Email inválido") 
    }
    if(assuntoValue === ""){
       setError(assunto, "Assunto não pode ficar em branco") 
    }
    if(mensagemValue === ""){
       setError(mensagem, "Mensagem não pode ficar em branco") 
    }
}

function isValidEmail(email){
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}