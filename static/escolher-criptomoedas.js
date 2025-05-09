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
    cryptoImage.classList.remove("hidden"); // Remove a classe "hidden" para exibir a imagem
}
