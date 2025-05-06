document.addEventListener("DOMContentLoaded", function () {
    let menuButton = document.getElementById("menu-more");
    
    if (menuButton) {
        menuButton.addEventListener("click", function (event) {
            event.preventDefault();
            let menu = this.nextElementSibling; // Encontra o menu correto dentro da <li>

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
    } else {
        console.error("Botão 'Mais' não encontrado!");
    }
});
