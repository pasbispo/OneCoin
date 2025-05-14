document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-crypto");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");

    if (!searchButton || !searchInput || !cryptoImage || !cryptoName) {
        console.error("Erro: Elementos de pesquisa não encontrados!");
        return;
    }

    searchButton.addEventListener("click", function() {
        let query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            alert("Digite o nome da criptomoeda para pesquisar!");
            return;
        }

        // Simulação de lista de criptomoedas
        const cryptoList = [
            { name: "Bitcoin", symbol: "BTC", image: "static/img/bitcoin.png" },
            { name: "Ethereum", symbol: "ETH", image: "static/img/ethereum.png" },
            { name: "Dogecoin", symbol: "DOGE", image: "static/img/dogecoin.png" },
            { name: "Cardano", symbol: "ADA", image: "static/img/cardano.png" }
        ];

        // Busca a criptomoeda pelo nome digitado
        let foundCrypto = cryptoList.find(crypto => crypto.name.toLowerCase() === query);

        if (foundCrypto) {
            cryptoImage.src = foundCrypto.image;
            cryptoImage.classList.remove("hidden");
            cryptoName.textContent = foundCrypto.name;
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    });
});



// ✅ Correção da função limitDecimals
function limitDecimals(input) {
    let value = input.value;
    input.value = value.match(/^\d*(\.\d{0,8})?/)[0]; // Limita a 8 casas decimais
}
