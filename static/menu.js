document.addEventListener("DOMContentLoaded", function () {
    let menuButton = document.getElementById("menu-more");

    if (menuButton) {
        menuButton.addEventListener("click", function (event) {
            event.preventDefault();
            let menu = this.closest(".dropdown").querySelector(".menu-container");

            if (menu.style.display === "block") {
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
        });
    } else {
        console.error("Botão 'Mais' não encontrado!");
    }
});
