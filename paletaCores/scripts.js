// ------- Seleção de elementos -------
const generateBtn = document.querySelector('#generate-button')
const colorsDiv = document.querySelector(".colors");
const titulo = document.getElementById("title")

// ------- Funções -------
function generateColors() {
    colorsDiv.innerHTML = ""
    let randomColor = ""; 
    let colorBackup = "";
    for (let i = 0; i < 5; i++) {
        const color = generateRandomColor();
        const colorDiv = document.createElement("div")
        colorDiv.style.backgroundColor = color;
        const colorName = document.createElement("p");
        colorName.textContent = color;
        colorName.style.color = color;
        colorDiv.appendChild(colorName)
        colorsDiv.appendChild(colorDiv)
        
        let randomNumber = Math.floor(Math.random() * 10)
        if(randomNumber > 5 ){
            randomColor = color;
        }
        colorBackup = color;        
    }
    if(randomColor == ""){
        randomColor = colorBackup;
    }
    titulo.style.color = randomColor;
}
function generateRandomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

// ------- Eventos -------
generateBtn.addEventListener('click', generateColors)