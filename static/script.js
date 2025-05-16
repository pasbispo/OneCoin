document.addEventListener("DOMContentLoaded", function() {
    let searchButton = document.getElementById("search-button"); // ✅ Adicionado corretamente
    let searchInput = document.getElementById("search-bar");
    let suggestionsBox = document.getElementById("suggestions");

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
                });
                suggestionsBox.appendChild(suggestion);
            });
        } else {
            suggestionsBox.style.display = "none";
        }
    });




    // ✅ Corrigido: Evento para o botão de pesquisa
    searchButton.addEventListener("click", function() {
        let query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            alert("Digite à criptomoeda!");
            return;
        }

        let foundCrypto = cryptoList.find(crypto => crypto.name.toLowerCase() === query);

        if (foundCrypto) {
            document.getElementById("crypto-image").src = foundCrypto.image;
            document.getElementById("crypto-image").classList.remove("hidden");
            document.getElementById("crypto-name").textContent = foundCrypto.name;

            // ✅ Limpa o campo de pesquisa após a busca
            searchInput.value = "";
        } else {
            alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
        }
    });



if (filteredCryptos.length > 0) {
            suggestionsBox.style.display = "block";
            filteredCryptos.forEach(crypto => {
                let suggestion = document.createElement("div");
                suggestion.innerHTML = `<img src="${crypto.image}" width="20"> ${crypto.name}`;
                suggestion.addEventListener("click", function() {
                    searchInput.value = crypto.name;
                    suggestionsBox.style.display = "none";
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
