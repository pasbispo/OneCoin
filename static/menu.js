

    document.getElementById("menu-more").addEventListener("click", function (event) {
    event.preventDefault();
    let menu = this.nextElementSibling; // Seleciona apenas o menu dentro do dropdown

    if (menu.style.display === "block") {
        menu.style.opacity = "0";
        setTimeout(() => {
            menu.style.display = "none";
        }, 300);
    } else {
        menu.style.display = "block";
        setTimeout(() => {
            menu.style.opacity = "1";
        }, 10);
    }
});





