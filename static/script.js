document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let suggestionsBox = document.getElementById("suggestions");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");
    let cryptoValue = document.getElementById("crypto-value");
    let cryptoAmountInput = document.getElementById("crypto-amount");

    let selectedCrypto = null; // ✅ Criptomoeda escolhida

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

    function displayCryptoImage(foundCrypto) {
        selectedCrypto = foundCrypto;
        cryptoImage.src = foundCrypto.image;
        cryptoImage.classList.remove("hidden");
        cryptoName.textContent = foundCrypto.name;
        cryptoValue.textContent = ""; // ✅ O valor estimado só será mostrado após o clique
        searchInput.value = ""; // ✅ Limpa a barra de pesquisa após a escolha
    }

    searchButton.addEventListener("click", function() {
        let query = searchInput.value.trim().toLowerCase();
        if (query === "") {
            alert("Digite o nome da criptomoeda para pesquisar!");
            return;
        }
        let foundCrypto = cryptoList.find(crypto => crypto.name.toLowerCase() === query);
        if (foundCrypto) {
            displayCryptoImage(foundCrypto); // ✅ Apenas exibe a imagem
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    });

    cryptoImage.addEventListener("click", async function() {
        if (!selectedCrypto) {
            alert("Escolha uma criptomoeda antes de clicar na imagem!");
            return;
        }

        cryptoValue.textContent = "Buscando preço..."; // ✅ Atualiza status

        let price = await getCryptoPrice(selectedCrypto.symbol);
        if (price) {
            cryptoValue.textContent = `${price} USD`; // ✅ Atualiza o valor estimado ao clicar
        } else {
            cryptoValue.textContent = "Erro na cotação";
        }
    });

    cryptoAmountInput.addEventListener("input", async function() {
        let amount = parseFloat(this.value);
        if (isNaN(amount) || amount <= 0) {
            cryptoValue.textContent = "Valor inválido";
            return;
        }
        if (selectedCrypto) {
            let price = await getCryptoPrice(selectedCrypto.symbol);
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
                suggestion.addEventListener("click", function() {
                    searchInput.value = crypto.name;
                    suggestionsBox.style.display = "none";
                    displayCryptoImage(crypto); // ✅ Apenas exibe a imagem
                });
                suggestionsBox.appendChild(suggestion);
            });
        } else {
            suggestionsBox.style.display = "none";
        }
    });

    document.addEventListener("click", function(event) {
        if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
            suggestionsBox.style.display = "none";
        }
    });
});
