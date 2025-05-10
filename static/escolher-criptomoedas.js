
// Definição global para permitir acesso em todas as funções
let selectedCrypto = "BTC"; // Define um valor inicial padrão

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("crypto-amount").addEventListener("input", async function() {
        let amount = parseFloat(this.value);
        let price = await getCryptoPrice(selectedCrypto); // Usa a criptomoeda escolhida

        if (price) {
            document.getElementById("crypto-value").value = (amount * price).toFixed(2) + " USD";
        } else {
            document.getElementById("crypto-value").value = "Erro na cotação";
        }
    });
});

// Atualizar a criptomoeda selecionada e exibir no retângulo
function selectCrypto(crypto, name) {
    selectedCrypto = crypto; // Atualiza variável global
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");

    if (cryptoImage && cryptoName) { // Evita erros se os elementos não existirem
        cryptoImage.src = `static/img/${crypto}.png`;
        cryptoImage.classList.remove("hidden");
        cryptoName.textContent = name;
    } else {
        console.error("Erro: Elementos da criptomoeda não encontrados!");
    }
}


    // Filtrar criptomoedas na pesquisa
    function filterCryptos() {
        let input = document.getElementById("search-bar").value.toLowerCase();
        let images = document.querySelectorAll(".crypto-list img");

        images.forEach(img => {
            let cryptoName = img.getAttribute("alt").toLowerCase();
            img.style.display = cryptoName.includes(input) ? "inline-block" : "none";
        });
    }

    // Limitar casas decimais no campo de entrada
    function limitDecimals(input) {
        let value = input.value.replace(/[^0-9.]/g, ''); // Apenas números e ponto decimal
        let parts = value.split('.');
        if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
        if (parts.length === 2 && parts[1].length > 8) parts[1] = parts[1].substring(0, 8);
        input.value = parts.join('.');
    }

    // Redirecionamento ao clicar no logo
    document.querySelector(".logo-container img").addEventListener("click", function() {
        window.location.href = "index.html";
    });


async function getCryptoPrice(crypto) {
    let response = await fetch(`https://pro.coinmarketcap.com/v1/criptomoeda/cotações/mais recentes?symbol=${crypto}&convert=USD`);
    let data = await response.json();
    return data.data?.[crypto]?.quote?.USD?.price || null;
}



document.getElementById("crypto-amount").addEventListener("input", function() {
    console.log("Valor digitado:", this.value);
});


