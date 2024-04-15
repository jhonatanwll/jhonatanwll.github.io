// ------- Seleção de elementos -------
const progressBar = document.querySelector(".progress");
const previousBtn = document.querySelector("#previous-btn");
const nextBtn = document.querySelector("#next-btn");

// ------- Funções -------
let progresso = 0;

function updateProgressBar() {
    progressBar.style.width = progresso + "%";
}
function step(e) {
    if (e.target.id == "next-btn") {
        progresso += 10;
        if (progresso > 100) progresso = 100;
    } else {
        progresso -= 10
        if (progresso < 0) progresso = 0
    }
    updateProgressBar()
}
// ------- Eventos -------
nextBtn.addEventListener('click', step);
previousBtn.addEventListener('click', step);