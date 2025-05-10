


// Definição global para permitir acesso em todas as funções
let selectedCrypto = "BTC"; // Define um valor inicial padrão



// Função para buscar cotação da criptomoeda na API CoinMarketCap
async function getCryptoPrice(crypto) {
    let response = await fetch(`http://localhost:3000/crypto/${crypto}`);
    let data = await response.json();
    return data?.data?.[crypto]?.quote?.USD?.price || null;
}


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
async function selectCrypto(crypto, name) {
    selectedCrypto = crypto; // Atualiza variável global
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");

    if (cryptoImage && cryptoName) {
        cryptoImage.src = `static/img/${crypto}.png`;
        cryptoImage.classList.remove("hidden");
        cryptoName.textContent = name;
    } else {
        console.error("Erro: Elementos da criptomoeda não encontrados!");
    }

    // Atualiza a cotação automaticamente ao selecionar a criptomoeda
    let price = await getCryptoPrice(selectedCrypto);
    if (price) {
        document.getElementById("crypto-value").value = (price).toFixed(2) + " USD"; // Mostra o valor unitário da criptomoeda
    } else {
        document.getElementById("crypto-value").value = "Erro na cotação";
    }
}
