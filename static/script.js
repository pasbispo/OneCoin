document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let cryptoAmountInput = document.getElementById("crypto-amount"); // ✅ Campo de quantidade
    let addCryptoButton = document.getElementById("add-crypto-button"); // ✅ Botão para confirmar
    let table = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];
    let selectedCryptos = new Set(); // ✅ Evita duplicações
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

    function fetchCryptoPrice(symbol) {
        return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`)
            .then(response => response.json())
            .then(data => data[symbol]?.usd || null)
            .catch(() => null);
    }

    function showCryptoSelection(foundCrypto) {
        if (selectedCryptos.has(foundCrypto.symbol)) {
            alert("Você já adicionou essa criptomoeda! Escolha outra.");
            return;
        }

        selectedCrypto = foundCrypto;
        document.getElementById("crypto-image").src = foundCrypto.image;
        document.getElementById("crypto-name").textContent = foundCrypto.name;
        cryptoAmountInput.value = ""; // ✅ Aguarda o usuário definir quantidade
        document.getElementById("crypto-value").textContent = "Buscando preço..."; // ✅ Atualiza status inicial

        fetchCryptoPrice(foundCrypto.symbol).then(price => {
            if (price !== null) {
                document.getElementById("crypto-value").textContent = `${price} USD`;
                selectedCrypto.price = price;
            } else {
                document.getElementById("crypto-value").textContent = "Erro ao buscar preço.";
            }
        });
    }

    function handleCryptoSelection(query) {
        let foundCrypto = cryptoList.find(crypto => 
            crypto.name.toLowerCase() === query.toLowerCase() || 
            crypto.symbol.toLowerCase() === query.toLowerCase()
        );

        if (foundCrypto) {
            showCryptoSelection(foundCrypto);
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    }

    searchButton.addEventListener("click", function() {
        let query = searchInput.value.trim();
        if (query === "") {
            alert("Digite o nome da criptomoeda para pesquisar!");
            return;
        }
        handleCryptoSelection(query);
    });

    document.querySelectorAll(".crypto-list img").forEach(img => {
        img.addEventListener("click", function() {
            let symbol = img.getAttribute("data-symbol"); // ✅ Use 'data-symbol' para corresponder à lista
            handleCryptoSelection(symbol);
        });
    });
});
