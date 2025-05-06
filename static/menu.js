document.addEventListener("DOMContentLoaded", function () {
    let menuButton = document.getElementById("menu-more");

    if (menuButton) {
        menuButton.addEventListener("click", function (event) {
            event.preventDefault();
            let menu = this.parentElement.querySelector(".menu-container");

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




document.addEventListener("DOMContentLoaded", function () {
    let menuButton = document.getElementById("menu-more");
    let menu = document.querySelector(".menu-container");

    if (menuButton && menu) {
        menuButton.addEventListener("click", function (event) {
            event.preventDefault();
            menu.style.display = (menu.style.display === "block") ? "none" : "block";
        });

        document.addEventListener("click", function (event) {
            if (!menu.contains(event.target) && event.target !== menuButton) {
                menu.style.display = "none";
            }
        });
    } else {
        console.error("Botão 'Mais' ou menu não encontrado!");
    }
});
