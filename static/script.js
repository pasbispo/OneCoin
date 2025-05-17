document.addEventListener("DOMContentLoaded", function() {
    let searchInput = document.getElementById("search-bar");
    let cryptoContainer = document.getElementById("crypto-container"); // ✅ Área onde as imagens são exibidas

    const cryptoList = [
        { name: "Bitcoin", symbol: "bitcoin", image: "static/img/btc.png" },
        { name: "Ethereum", symbol: "ethereum", image: "static/img/eth.png" },
        { name: "Tether", symbol: "tether", image: "static/img/usdt.png" },
        { name: "Cardano", symbol: "cardano", image: "static/img/ada.png" },
        { name: "XRP", symbol: "ripple", image: "static/img/xrp.png" },
        { name: "Solana", symbol: "solana", image: "static/img/sol.png" },
        { name: "Dogecoin", symbol: "dogecoin", image: "static/img/doge.png" },
        { name: "Polkadot", symbol: "polkadot", image: "static/img/dot.png" }
    ];

    searchInput.addEventListener("input", function() {
        let query = searchInput.value.trim().toLowerCase();
        cryptoContainer.innerHTML = ""; // ✅ Remove todas as imagens antes de exibir a correspondente

        if (query === "") {
            return; // ✅ Se o campo estiver vazio, nenhuma imagem será mostrada
        }

        let foundCrypto = cryptoList.find(crypto => crypto.name.toLowerCase().includes(query));
        if (foundCrypto) {
            let cryptoElement = document.createElement("img");
            cryptoElement.src = foundCrypto.image;
            cryptoElement.alt = foundCrypto.name;
            cryptoElement.classList.add("selected-crypto"); // ✅ Adiciona classe para estilização
            cryptoContainer.appendChild(cryptoElement);
        }
    });
});
