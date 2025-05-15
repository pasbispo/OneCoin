document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-bar");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");
    let cryptoAmountInput = document.getElementById("crypto-amount"); // Campo onde o usuário define a quantidade
    let selectedCryptos = new Set(); // ✅ Evita duplicações
    let table = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];

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

    function addCryptoToTable(foundCrypto, quantity) {
        if (selectedCryptos.has(foundCrypto.symbol)) {
            alert("Você já adicionou essa criptomoeda! Escolha outra.");
            return;
        }

        selectedCryptos.add(foundCrypto.symbol); // ✅ Adiciona ao conjunto para evitar duplicação

        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="${foundCrypto.image}" width="30"> ${foundCrypto.name}</td>
            <td>${quantity}</td>
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
            cryptoImage.src = foundCrypto.image;
            cryptoImage.classList.remove("hidden");
            cryptoName.textContent = foundCrypto.name;
            cryptoAmountInput.value = ""; // ✅ Limpa o campo de quantidade para o usuário definir

            // ✅ Aguarda o usuário digitar a quantidade antes de adicionar na tabela
            cryptoAmountInput.addEventListener("change", function() {
                let quantity = cryptoAmountInput.value.trim();
                if (quantity && !selectedCryptos.has(foundCrypto.symbol)) {
                    addCryptoToTable(foundCrypto, quantity);
                }
            });

            searchInput.value = ""; // ✅ Limpa o campo de pesquisa após a busca
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    });
});
