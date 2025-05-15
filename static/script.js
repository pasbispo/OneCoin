document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let cryptoAmountInput = document.getElementById("crypto-amount"); // ✅ Campo de quantidade
    let addCryptoButton = document.getElementById("add-crypto-button"); // ✅ Botão para confirmar
    let table = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];
    let selectedCryptos = new Set(); // ✅ Evita duplicações
    let selectedCrypto = null;

    const cryptoList = [
        { name: "Bitcoin", symbol: "BTC", image: "static/img/btc.png" },
        { name: "Ethereum", symbol: "ETH", image: "static/img/eth.png" },
        { name: "Tether", symbol: "USDT", image: "static/img/usdt.png" },
        { name: "Cardano", symbol: "ADA", image: "static/img/ada.png" },
        { name: "XRP", symbol: "XRP", image: "static/img/xrp.png" },
        { name: "Solana", symbol: "SOL", image: "static/img/sol.png" },
        { name: "Dogecoin", symbol: "DOGE", image: "static/img/doge.png" },
        { name: "Polkadot", symbol: "DOT", image: "static/img/dot.png" }
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

        fetchCryptoPrice(foundCrypto.symbol.toLowerCase()).then(price => {
            if (price !== null) {
                document.getElementById("crypto-value").textContent = `${price} USD`;
                selectedCrypto.price = price;
            } else {
                document.getElementById("crypto-value").textContent = "Erro ao buscar preço.";
            }
        });
    }

    function addCryptoToTable() {
        if (!selectedCrypto) {
            alert("Pesquise ou selecione uma criptomoeda primeiro!");
            return;
        }

        let quantity = parseFloat(cryptoAmountInput.value.trim());
        if (!quantity || isNaN(quantity)) {
            alert("Defina uma quantidade válida antes de adicionar!");
            return;
        }

        let estimatedValue = (selectedCrypto.price * quantity).toFixed(2);

        selectedCryptos.add(selectedCrypto.symbol); // ✅ Evita duplicação

        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="${selectedCrypto.image}" width="30"> ${selectedCrypto.name}</td>
            <td>${quantity}</td>
            <td>${estimatedValue} USD</td>
            <td><button class="delete-button">Excluir</button></td>
        `;

        newRow.querySelector(".delete-button").addEventListener("click", function() {
            selectedCryptos.delete(selectedCrypto.symbol); // ✅ Remove ao excluir
            newRow.remove();
        });

        searchInput.value = "";
        cryptoAmountInput.value = "";
        selectedCrypto = null;
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

    addCryptoButton.addEventListener("click", function() {
        addCryptoToTable();
    });

    cryptoAmountInput.addEventListener("input", function() {
        calculateCryptoValue(); // ✅ Atualiza valor conforme o usuário digita
    });

    document.querySelectorAll(".crypto-list img").forEach(img => {
        img.addEventListener("click", function() {
            let symbol = img.getAttribute("onclick").split("'")[1];
            handleCryptoSelection(symbol);
        });
    });
});
