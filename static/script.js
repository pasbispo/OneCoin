document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");
    let cryptoAmountInput = document.getElementById("crypto-amount"); // ✅ Campo de quantidade
    let addCryptoButton = document.getElementById("add-crypto-button"); // ✅ Botão para confirmar
    let selectedCryptos = new Set(); // ✅ Conjunto para evitar duplicações
    let table = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];
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

    function showCryptoSelection(foundCrypto) {
        if (selectedCryptos.has(foundCrypto.symbol)) {
            alert("Você já adicionou essa criptomoeda! Escolha outra.");
            return;
        }

        selectedCrypto = foundCrypto;
        cryptoImage.src = foundCrypto.image;
        cryptoImage.classList.remove("hidden");
        cryptoName.textContent = foundCrypto.name;
        cryptoAmountInput.value = ""; // ✅ Aguarda o usuário definir quantidade antes de confirmar
    }

    function addCryptoToTable() {
        if (!selectedCrypto) {
            alert("Pesquise ou selecione uma criptomoeda primeiro!");
            return;
        }

        let quantity = cryptoAmountInput.value.trim();
        if (!quantity) {
            alert("Defina uma quantidade antes de adicionar!");
            return;
        }

        selectedCryptos.add(selectedCrypto.symbol); // ✅ Adiciona ao conjunto para evitar duplicação

        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="${selectedCrypto.image}" width="30"> ${selectedCrypto.name}</td>
            <td>${quantity}</td>
            <td><span class="crypto-value">Calculando...</span></td>
            <td><button class="delete-button">Excluir</button></td>
        `;

        newRow.querySelector(".delete-button").addEventListener("click", function() {
            selectedCryptos.delete(selectedCrypto.symbol); // ✅ Remove do conjunto ao excluir
            newRow.remove();
        });

        searchInput.value = "";
        cryptoAmountInput.value = "";
        selectedCrypto = null;
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

    addCryptoButton.addEventListener("click", function() {
        addCryptoToTable();
    });

    document.querySelectorAll(".crypto-list img").forEach(img => {
        img.addEventListener("click", function() {
            let symbol = img.getAttribute("onclick").split("'")[1];
            let foundCrypto = cryptoList.find(crypto => crypto.symbol === symbol);
            if (foundCrypto) {
                showCryptoSelection(foundCrypto);
            }
        });
    });
});
