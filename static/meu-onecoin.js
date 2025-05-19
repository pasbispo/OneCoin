document.getElementById("update-button").addEventListener("click", function() {
    document.getElementById("panel-title").textContent = document.getElementById("campaign-name").value;
    document.getElementById("panel-goal").textContent = document.getElementById("campaign-goal").value;
    document.getElementById("panel-duration").textContent = document.getElementById("duration").value;

    let imageInput = document.getElementById("campaign-image");
    if (imageInput.files.length > 0) {
        let imageUrl = URL.createObjectURL(imageInput.files[0]);
        document.getElementById("panel-image").src = imageUrl;
    }
});



document.addEventListener("DOMContentLoaded", function() {
    // Recupera os dados armazenados na página escolher-criptomoedas.html
    let selectedCrypto = localStorage.getItem("selectedCrypto"); // Nome da criptomoeda
    let cryptoQuantity = localStorage.getItem("cryptoQuantity"); // Quantidade
    let estimatedValue = localStorage.getItem("estimatedValue"); // Valor estimado
    let cryptoImage = localStorage.getItem("cryptoImage"); // URL da imagem

    // Atualiza os elementos na página Meu OneCoin
    if (selectedCrypto && cryptoQuantity && estimatedValue && cryptoImage) {
        document.getElementById("crypto-name").textContent = selectedCrypto;
        document.getElementById("crypto-quantity").textContent = cryptoQuantity;
        document.getElementById("crypto-value").textContent = estimatedValue;
        document.getElementById("crypto-image").src = cryptoImage;
    } else {
        console.error("Erro: Dados da criptomoeda não encontrados.");
    }
});
