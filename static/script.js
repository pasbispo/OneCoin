document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-crypto");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");
    let cryptoValue = document.getElementById("crypto-value");

    if (!searchButton || !searchInput || !cryptoImage || !cryptoName || !cryptoValue) {
        console.error("Erro: Elementos de pesquisa não encontrados!");
        return;
    }

    searchButton.addEventListener("click", async function() {
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

            // Buscar a cotação da criptomoeda
            let price = await getCryptoPrice(foundCrypto.symbol);
            cryptoValue.value = price ? `${price.toFixed(2)} USD` : "Erro na cotação";
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    });
});

// Função para buscar a cotação
async function getCryptoPrice(crypto) {
    try {
        let response = await fetch(`http://localhost:3000/crypto/${crypto.toUpperCase()}`);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        let data = await response.json();
        return data?.data?.[crypto.toUpperCase()]?.quote?.USD?.price || null;
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        return null;
    }
}
