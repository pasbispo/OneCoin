document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");
    let selectedCryptos = new Set(); // ✅ Evita duplicações

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

    searchButton.addEventListener("click", function() {
        let query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            alert("Digite o nome da criptomoeda para pesquisar!");
            return;
        }

        let foundCrypto = cryptoList.find(crypto => crypto.name.toLowerCase() === query);

        if (foundCrypto) {
            if (selectedCryptos.has(foundCrypto.symbol)) {
                alert("Você já adicionou essa criptomoeda! Escolha outra.");
                return;
            }

            selectedCryptos.add(foundCrypto.symbol); // ✅ Adiciona ao conjunto para evitar duplicação

            cryptoImage.src = foundCrypto.image;
            cryptoImage.classList.remove("hidden");
            cryptoName.textContent = foundCrypto.name;

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

            searchInput.value = ""; // ✅ Limpa o campo de entrada após a busca
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    });
});





document.addEventListener("DOMContentLoaded", function() {
    let searchContainer = document.querySelector(".search-crypto");
    let table = document.querySelector(".crypto-table");

    new MutationObserver(function() {
        let tableHeight = table.getBoundingClientRect().height;
        searchContainer.style.marginTop = tableHeight + "px"; // Ajusta a posição automaticamente
    }).observe(table, { childList: true, subtree: true });
});






document.addEventListener("DOMContentLoaded", function() {
    let selectedCryptos = new Set(); // Conjunto para armazenar criptomoedas já escolhidas

    function selectCrypto(symbol, name) {
        if (selectedCryptos.has(symbol)) {
            alert("Você já adicionou essa criptomoeda! Escolha outra.");
            return;
        }

        selectedCryptos.add(symbol); // Adiciona a criptomoeda ao conjunto

        let table = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="static/img/${symbol}.png" width="30"> ${name}</td>
            <td><input type="number" min="0" step="0.00000001"></td>
            <td><span class="crypto-value">Calculando...</span></td>
            <td><button class="delete-button">Excluir</button></td>
        `;

        // Evento para excluir criptomoeda da tabela
        newRow.querySelector(".delete-button").addEventListener("click", function() {
            selectedCryptos.delete(symbol); // Remove do conjunto para permitir nova escolha
            newRow.remove();
        });
    }

    document.querySelectorAll(".crypto-list img").forEach(img => {
        img.addEventListener("click", function() {
            let symbol = this.getAttribute("onclick").split("'")[1];
            let name = this.getAttribute("alt");
            selectCrypto(symbol, name);
        });
    });
});
