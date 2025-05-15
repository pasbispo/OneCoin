document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");
    let cryptoAmountInput = document.getElementById("crypto-amount");
    let cryptoValue = document.getElementById("crypto-value");
    let addCryptoButton = document.getElementById("add-crypto-button");
    let suggestionsBox = document.getElementById("suggestions");
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
        if (selectedCryptos.has(foundCrypto.symbol)) {
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

    addCryptoButton.addEventListener("click", function() {
        if (!selectedCrypto) {
            alert("Pesquise ou selecione uma criptomoeda primeiro!");
            return;
        }
        let quantity = parseFloat(cryptoAmountInput.value.trim());
        if (!quantity || isNaN(quantity)) {
            alert("Defina uma quantidade válida antes de adicionar!");
            return;
        }
        selectedCryptos.add(selectedCrypto.symbol);
        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="${selectedCrypto.image}" width="30"> ${selectedCrypto.name}</td>
            <td>${quantity}</td>
            <td>${(selectedCrypto.price * quantity).toFixed(2)} USD</td>
            <td><button class="delete-button">Excluir</button></td>
        `;
        newRow.querySelector(".delete-button").addEventListener("click", function() {
            selectedCryptos.delete(selectedCrypto.symbol);
            newRow.remove();
        });
        searchInput.value = "";
        cryptoAmountInput.value = "";
        selectedCrypto = null;
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
                    showCryptoSelection(crypto); // ✅ Executa o mesmo fluxo da pesquisa
                });
                suggestionsBox.appendChild(suggestion);
            });
        } else {
            suggestionsBox.style.display = "none";
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
