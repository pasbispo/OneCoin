async function getCryptoPrice(crypto) {
    let apiKey = "bdf7d0eb-b427-4f59-b721-664d807c1fe2"; // Substitua pela sua chave de API
    let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}&convert=USD`;

    let response = await fetch(url, {
        headers: {
            "X-CMC_PRO_API_KEY": apiKey
        }
    });

    let data = await response.json();
    return data.data[crypto].quote.USD.price;
}

// Exemplo de uso
getCryptoPrice("BTC").then(price => {
    console.log(`Preço do Bitcoin: $${price.toFixed(2)}`);
});



document.getElementById("crypto-amount").addEventListener("input", async function() {
    let amount = parseFloat(this.value);
    let price = await getCryptoPrice("BTC");
    document.getElementById("crypto-value").value = (amount * price).toFixed(2) + " USD";
});
