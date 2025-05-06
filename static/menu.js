document.getElementById("menu-more").addEventListener("click", function (event) {
    event.preventDefault();
    let menu = this.parentElement.querySelector(".menu-container"); // Seleciona apenas o menu correto

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
