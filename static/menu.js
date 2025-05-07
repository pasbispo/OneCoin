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



document.addEventListener("DOMContentLoaded", function () {
    let logo = document.getElementById("site-logo");

    if (logo) {
        logo.addEventListener("click", function (event) {
            event.preventDefault(); // Evita comportamento padrão do link
            location.reload(); // Recarrega a página
        });
    }
});




document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper-container", {
        loop: true, // Permite rolagem infinita dos slides
        autoplay: {
            delay: 3000, // Troca de slide a cada 3 segundos
            disableOnInteraction: false // Continua rodando após interação
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    // Pausa o carrossel ao passar o mouse e retorna ao sair
    document.querySelector(".swiper-container").addEventListener("mouseenter", function () {
        swiper.autoplay.stop();
    });

    document.querySelector(".swiper-container").addEventListener("mouseleave", function () {
        swiper.autoplay.start();
    });
});
