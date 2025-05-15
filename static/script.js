document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");
    let selectedCryptos = new Set(); // ✅ Evita duplicações em qualquer método

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

    document.querySelectorAll(".crypto-list img").forEach(img => {
        img.addEventListener("click", function() {
            let symbol = this.getAttribute("onclick").split("'")[1];
            let name = this.getAttribute("alt");
            let foundCrypto = cryptoList.find(crypto => crypto.symbol === symbol);
            if (foundCrypto) {
                addCryptoToTable(foundCrypto);
            }
        });
    });
});



// ✅ Correção da função limitDecimals
function limitDecimals(input) {
    let value = input.value;
    input.value = value.match(/^\d*(\.\d{0,8})?/)[0]; // Limita a 8 casas decimais
}





document.addEventListener("DOMContentLoaded", function() {
    let searchContainer = document.querySelector(".search-crypto");
    let table = document.querySelector(".crypto-table");

    new MutationObserver(function() {
        let tableHeight = table.getBoundingClientRect().height;
        searchContainer.style.marginTop = tableHeight + "px"; // Ajusta a posição automaticamente
    }).observe(table, { childList: true, subtree: true });
});






