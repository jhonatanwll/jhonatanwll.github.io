// ------- Seleção de elementos -------
const numbers = document.querySelectorAll(".number")
const generateBtn = document.querySelector("#generate")

// ------- Funções -------
function generateNumbers() {
    const max = 60;
    const min = 1;
    const result = []
    
    while (result.length < 6) {
        const number = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!result.includes(number)) {
            result.push(number)
            console.log(result)
        }
    }
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].textContent = result[i] // 0 - 0, 1 - 1...
    }
}

// ------- Eventos -------
generateBtn.addEventListener("click", generateNumbers);