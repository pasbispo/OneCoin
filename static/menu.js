document.addEventListener("DOMContentLoaded", function () {
    let menuButton = document.getElementById("menu-more");
    let menu = document.querySelector(".menu-container");

    if (menuButton && menu) {
        menuButton.addEventListener("click", function (event) {
            event.preventDefault();
            let isMenuOpen = menu.style.display === "block";

            if (isMenuOpen) {
                menu.style.opacity = "0";
                menu.style.visibility = "hidden";
                setTimeout(() => {
                    menu.style.display = "none";
                }, 300);
            } else {
                menu.style.display = "block";
                menu.style.visibility = "visible";
                setTimeout(() => {
                    menu.style.opacity = "1";
                }, 10);
            }

            // Impede que o clique no botão seja tratado como clique fora do menu
            event.stopPropagation();
        });

        // Adiciona evento de clique global para fechar o menu ao clicar fora
        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && event.target !== menuButton) {
                menu.style.opacity = "0";
                menu.style.visibility = "hidden";
                setTimeout(() => {
                    menu.style.display = "none";
                }, 300);
            }
        });

        // Impede que cliques dentro do menu fechem ele
        menu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    } else {
        console.error("Botão 'Mais' ou menu não encontrado!");
    }
});
