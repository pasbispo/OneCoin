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
    let cryptoName = localStorage.getItem("selectedCrypto");
    let cryptoQuantity = localStorage.getItem("cryptoQuantity");
    let estimatedValue = localStorage.getItem("estimatedValue");
    let cryptoImage = localStorage.getItem("cryptoImage");

    if (cryptoName && cryptoQuantity && estimatedValue && cryptoImage) {
        document.getElementById("crypto-name").textContent = cryptoName;
        document.getElementById("crypto-quantity").textContent = cryptoQuantity;
        document.getElementById("crypto-value").textContent = estimatedValue;
        document.getElementById("crypto-image").src = cryptoImage;
    } else {
        console.error("Erro: Dados da criptomoeda não encontrados.");
    }
});
