document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let cryptoAmountInput = document.getElementById("crypto-amount"); 
    let addCryptoButton = document.getElementById("add-crypto-button");
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

    function showCryptoSelection(foundCrypto) {
        if (selectedCryptos.has(foundCrypto.symbol)) {
            alert("Você já adicionou essa criptomoeda à tabela! Escolha outra.");
            return;
        }

        selectedCrypto = foundCrypto;
        document.getElementById("crypto-image").src = foundCrypto.image;
        document.getElementById("crypto-name").textContent = foundCrypto.name;
        cryptoAmountInput.value = ""; 
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

        selectedCryptos.add(selectedCrypto.symbol); 

        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="${selectedCrypto.image}" width="30"> ${selectedCrypto.name}</td>
            <td>${quantity}</td>
            <td>Carregando valor...</td>
            <td><button class="delete-button">Excluir</button></td>
        `;

        newRow.querySelector(".delete-button").addEventListener("click", function() {
            selectedCryptos.delete(selectedCrypto.symbol); 
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

    document.querySelectorAll(".crypto-list img").forEach(img => {
        img.addEventListener("click", function() {
            let symbol = img.getAttribute("data-symbol");
            handleCryptoSelection(symbol);
        });
    });

    addCryptoButton.addEventListener("click", function() {
        addCryptoToTable();
    });
});
