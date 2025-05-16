document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let suggestionsBox = document.getElementById("suggestions");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");
    let cryptoValue = document.getElementById("crypto-value"); // ✅ Campo para o valor estimado
    let cryptoAmountInput = document.getElementById("crypto-amount");

    const cryptoList = [
        { name: "Bitcoin", symbol: "bitcoin", image: "static/img/btc.png" },
        { name: "Ethereum", symbol: "ethereum", image: "static/img/eth.png" },
        { name: "Tether", symbol: "tether", image: "static/img/usdt.png" },
        { name: "Cardano", symbol: "cardano", image: "static/img/ada.png" },
        { name: "XRP", symbol: "ripple", image: "static/img/xrp.png" },
        { name: "Solana", symbol: "solana", image: "static/img/sol.png" },
        { name: "Dogecoin", symbol: "dogecoin", image: "static/img/doge.png" },
        { name: "Polkadot", symbol: "polkadot", image: "static/img/dot.png" }
    ];

    async function getCryptoPrice(symbol) {
        try {
            let response = await fetch(`https://api.coinmarketcap.com/v1/ticker/${symbol}/`);
            let data = await response.json();
            return data[0]?.price_usd || null;
        } catch {
            return null;
        }
    }

    async function showCryptoSelection(foundCrypto) {
        document.getElementById("crypto-image").src = foundCrypto.image;
        document.getElementById("crypto-image").classList.remove("hidden");
        document.getElementById("crypto-name").textContent = foundCrypto.name;
        cryptoValue.textContent = "Buscando preço..."; // ✅ Inicializa com status

        let price = await getCryptoPrice(foundCrypto.symbol);
        if (price) {
            cryptoValue.textContent = `${price} USD`; // ✅ Atualiza o valor estimado
        } else {
            cryptoValue.textContent = "Erro na cotação";
        }

        searchInput.value = ""; // ✅ Limpa a barra de pesquisa após a escolha
    }

    searchButton.addEventListener("click", async function() {
        let query = searchInput.value.trim().toLowerCase();
        if (query === "") {
            alert("Digite o nome da criptomoeda para pesquisar!");
            return;
        }
        let foundCrypto = cryptoList.find(crypto => crypto.name.toLowerCase() === query);
        if (foundCrypto) {
            await showCryptoSelection(foundCrypto);
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    });

    cryptoAmountInput.addEventListener("input", async function() {
        let amount = parseFloat(this.value);
        if (isNaN(amount) || amount <= 0) {
            cryptoValue.textContent = "Valor inválido";
            return;
        }
        let foundCrypto = cryptoList.find(crypto => crypto.name === cryptoName.textContent);
        if (foundCrypto) {
            let price = await getCryptoPrice(foundCrypto.symbol);
            if (price) {
                cryptoValue.textContent = (amount * price).toFixed(2) + " USD";
            } else {
                cryptoValue.textContent = "Erro na cotação";
            }
        }
    });

    searchInput.addEventListener("input", function() {
        let query = searchInput.value.trim().toLowerCase();
        suggestionsBox.innerHTML = "";

        if (query === "") {
            suggestionsBox.style.display = "none";
            return;
        }

        let filteredCryptos = cryptoList.filter(crypto =>
            crypto.name.toLowerCase().includes(query)
        );

        if (filteredCryptos.length > 0) {
            suggestionsBox.style.display = "block";
            filteredCryptos.forEach(crypto => {
                let suggestion = document.createElement("div");
                suggestion.innerHTML = `<img src="${crypto.image}" width="20"> ${crypto.name}`;
                suggestion.addEventListener("click", async function() {
                    searchInput.value = crypto.name;
                    suggestionsBox.style.display = "none";
                    await showCryptoSelection(crypto);
                });
                suggestionsBox.appendChild(suggestion);
            });
        } else {
            suggestionsBox.style.display = "none";
        }
    });

    document.querySelectorAll(".crypto-list img").forEach(img => {
        img.addEventListener("click", async function() {
            let symbol = img.getAttribute("data-symbol");
            let foundCrypto = cryptoList.find(crypto => crypto.symbol === symbol);
            if (foundCrypto) {
                await showCryptoSelection(foundCrypto);
            }
        });
    });

    document.addEventListener("click", function(event) {
        if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.style.display = "none";
        }
    });
});
