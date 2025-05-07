document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".swiper-container", {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true, // Permite clicar nos pontos
            dynamicBullets: true // Torna os pontos mais interativos
        }
    });

    document.querySelector(".swiper-container").addEventListener("mouseenter", function () {
        swiper.autoplay.stop();
    });

    document.querySelector(".swiper-container").addEventListener("mouseleave", function () {
        swiper.autoplay.start();
    });
});
