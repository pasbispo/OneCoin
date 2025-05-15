document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let selectedCryptos = new Set(); // ✅ Conjunto para evitar duplicações

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

    function addCryptoToTable(foundCrypto) {
        if (selectedCryptos.has(foundCrypto.symbol)) {
            alert("Você já adicionou essa criptomoeda! Escolha outra.");
            return;
        }

        selectedCryptos.add(foundCrypto.symbol); // ✅ Adiciona ao conjunto para evitar duplicação

        let table = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="${foundCrypto.image}" width="30"> ${foundCrypto.name}</td>
            <td><input type="number" min="0" step="0.00000001"></td>
            <td><span class="crypto-value">Calculando...</span></td>
            <td><button class="delete-button">Excluir</button></td>
        `;

        newRow.querySelector(".delete-button").addEventListener("click", function() {
            selectedCryptos.delete(foundCrypto.symbol); // ✅ Remove do conjunto ao excluir
            newRow.remove();
        });
    }

    // ✅ Evento do botão de pesquisa
    searchButton.addEventListener("click", function() {
        let query = searchInput.value.trim().toLowerCase();
        if (query === "") {
            alert("Digite o nome da criptomoeda para pesquisar!");
            return;
        }

        let foundCrypto = cryptoList.find(crypto => crypto.name.toLowerCase() === query);
        if (foundCrypto) {
            addCryptoToTable(foundCrypto);
            searchInput.value = ""; // ✅ Limpa o campo de pesquisa
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    });

    // ✅ Evento para selecionar pela imagem
    document.querySelectorAll(".crypto-list img").forEach(img => {
        img.addEventListener("click", function() {
            let symbol = img.getAttribute("onclick").split("'")[1];
            let foundCrypto = cryptoList.find(crypto => crypto.symbol === symbol);
            if (foundCrypto) {
                addCryptoToTable(foundCrypto);
            }
        });
    });
});
