document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");
    let cryptoAmountInput = document.getElementById("crypto-amount");
    let cryptoValue = document.getElementById("crypto-value");
    let table = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];
    let selectedCryptos = new Set();
    let selectedCrypto = null;

    const cryptoList = [
        { name: "Bitcoin", symbol: "bitcoin", image: "static/img/btc.png" },
        { name: "Ethereum", symbol: "ethereum", image: "static/img/eth.png" },
        { name: "Tether", symbol: "tether", image: "static/img/usdt.png" },
        { name: "Cardano", symbol: "cardano", image: "static/img/ada.png" },
        { name: "XRP", symbol: "xrp", image: "static/img/xrp.png" },
        { name: "Solana", symbol: "solana", image: "static/img/sol.png" },
        { name: "Dogecoin", symbol: "dogecoin", image: "static/img/doge.png" },
        { name: "Polkadot", symbol: "polkadot", image: "static/img/dot.png" }
    ];

    function isCryptoInTable(symbol) {
        return selectedCryptos.has(symbol);
    }

    async function getCryptoPrice(symbol) {
        try {
            let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
            let data = await response.json();
            return data[symbol]?.usd || null;
        } catch {
            return null;
        }
    }

    function showCryptoSelection(foundCrypto) {
        if (isCryptoInTable(foundCrypto.symbol)) {
            alert("Você já adicionou essa criptomoeda à tabela! Escolha outra.");
            return;
        }

        selectedCrypto = foundCrypto;
        cryptoImage.src = foundCrypto.image;
        cryptoImage.classList.remove("hidden");
        cryptoName.textContent = foundCrypto.name;
        cryptoAmountInput.value = "";
        cryptoValue.textContent = "Buscando preço...";

        getCryptoPrice(foundCrypto.symbol).then(price => {
            if (price) {
                selectedCrypto.price = price;
                cryptoValue.textContent = `${price} USD`;
            } else {
                cryptoValue.textContent = "Erro na cotação";
            }
        });

        searchInput.value = ""; // ✅ Limpa o campo de pesquisa após a busca
    }

    searchButton.addEventListener("click", function() {
        let query = searchInput.value.trim().toLowerCase();
        if (query === "") {
            alert("Digite o nome da criptomoeda para pesquisar!");
            return;
        }
        let foundCrypto = cryptoList.find(crypto => crypto.name.toLowerCase() === query);
        if (foundCrypto) {
            showCryptoSelection(foundCrypto);
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    });

    document.querySelectorAll(".crypto-list img").forEach(img => {
        img.addEventListener("click", function() {
            let symbol = img.getAttribute("data-symbol");
            let foundCrypto = cryptoList.find(crypto => crypto.symbol === symbol);
            if (foundCrypto) {
                showCryptoSelection(foundCrypto);
            }
        });
    });
});
