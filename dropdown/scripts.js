const backToTopBtn = document.querySelector("#back-to-top")
// ------- Seleção de elementos -------
window.addEventListener("scroll", function(){
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if(scrollTop > 500){
        backToTopBtn.style.display = "block"
    }else{
        backToTopBtn.style.display= "none"
    }
})

// ------- Funções -------


// ------- Eventos -------
backToTopBtn.addEventListener("click", function(e){
    e.preventDefault()

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})