document.getElementById("crypto-amount").addEventListener("input", function() {
    document.getElementById("extra-box").classList.remove("hidden");
});

// Função para alterar a criptomoeda escolhida
function selectCrypto(crypto) {
    document.getElementById("crypto-image").src = `static/img/${crypto}.png`;
}




function selectCrypto(crypto) {
    let cryptoImage = document.getElementById("crypto-image");
    cryptoImage.src = `static/img/${crypto}.png`;
    cryptoImage.classList.remove("hidden"); // Exibir imagem
}


document.querySelector(".logo-container img").addEventListener("click", function() {
    window.location.href = "index.html";
});



function filterCryptos() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let images = document.querySelectorAll(".crypto-list img");

    images.forEach(img => {
        let cryptoName = img.getAttribute("alt").toLowerCase();
        if (cryptoName.includes(input)) {
            img.style.display = "inline-block";
        } else {
            img.style.display = "none";
        }
    });
}
