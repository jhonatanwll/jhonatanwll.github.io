// ------- Seleção de elementos -------
const popup = document.querySelector("#popup")
const cancelBtn = document.querySelector("#cancel-btn")

localStorage.removeItem("popupDisplayed")

// ------- Eventos -------
document.addEventListener("mouseout", (e) => {
    const popupDisplayed = localStorage.getItem("popupDisplayed")
    if (!popupDisplayed && e.relatedTarget === null) {
        popup.classList.add("show-popup");
    }
})

cancelBtn.addEventListener("click", () => {
    popup.classList.remove("show-popup");

    localStorage.setItem("popupDisplayed", true)
})