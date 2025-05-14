document.addEventListener("DOMContentLoaded", function() {
    let nextButton = document.getElementById("next-button");
    let signupButton = document.getElementById("signup-button");
    let cryptoAmountInput = document.getElementById("crypto-amount");
    let searchButton = document.getElementById("search-button");
    let searchInput = document.getElementById("search-crypto");
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");

    // ✅ Verifica se os elementos existem antes de adicionar eventos
    if (nextButton) {
        nextButton.addEventListener("click", function() {
            console.log("Botão Próximo clicado!");
        });
    } else {
        console.error("Erro: O botão Próximo não foi encontrado!");
    }

    if (signupButton) {
        signupButton.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "cadastro.html";
        });
    } else {
        console.error("Erro: O botão de cadastro não foi encontrado!");
    }

    if (cryptoAmountInput) {
        cryptoAmountInput.addEventListener("input", function() {
            limitDecimals(this);
        });
    } else {
        console.error("Erro: O campo de quantidade de criptomoeda não foi encontrado!");
    }

    if (searchButton && searchInput && cryptoImage && cryptoName) {
        searchButton.addEventListener("click", function() {
            let query = searchInput.value.trim().toLowerCase();

            if (query === "") {
                alert("Digite o nome da criptomoeda para pesquisar!");
                return;
            }

            // Simulação de lista de criptomoedas
            const cryptoList = [
                { name: "Bitcoin", symbol: "BTC", image: "static/img/bitcoin.png" },
                { name: "Ethereum", symbol: "ETH", image: "static/img/ethereum.png" },
                { name: "Dogecoin", symbol: "DOGE", image: "static/img/dogecoin.png" },
                { name: "Cardano", symbol: "ADA", image: "static/img/cardano.png" }
            ];

            // Busca a criptomoeda pelo nome digitado
            let foundCrypto = cryptoList.find(crypto => crypto.name.toLowerCase() === query);

            if (foundCrypto) {
                cryptoImage.src = foundCrypto.image;
                cryptoImage.classList.remove("hidden");
                cryptoName.textContent = foundCrypto.name;
            } else {
                alert("Criptomoeda não encontrada! Verifique o nome e tente novamente.");
            }
        });
    } else {
        console.error("Erro: Elementos de pesquisa não encontrados!");
    }
});

// ✅ Correção da função limitDecimals
function limitDecimals(input) {
    let value = input.value;
    input.value = value.match(/^\d*(\.\d{0,8})?/)[0]; // Limita a 8 casas decimais
}
