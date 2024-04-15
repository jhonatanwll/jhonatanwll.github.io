// Seleção de elementos
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox")
const lightboxImage = document.querySelector(".lightbox-image")
const lightboxClose = document.querySelector(".lightbox-close")

// Funções
// Eventos
galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
        const imageUrl = item.querySelector(".gallery-image").getAttribute("data-src")
        lightboxImage.setAttribute("src", imageUrl)
        lightbox.classList.remove("hide")
        console.log("clicou")
    })
})

lightboxClose.addEventListener("click", ()=>{
    lightbox.classList.add("hide")
})
