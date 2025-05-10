async function getCryptoPrice(crypto) {
    let apiKey = "bdf7d0eb-b427-4f59-b721-664d807c1fe2"; // Sua chave de API
    let url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}&convert=USD`;

    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "X-CMC_PRO_API_KEY": apiKey,
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        let data = await response.json();
        return data.data[crypto].quote.USD.price; // Retorna apenas o preço
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        return null;
    }
}

