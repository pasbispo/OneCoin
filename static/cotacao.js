async function getCryptoPrice(crypto) {
    try {
        let response = await fetch(`http://localhost:3000/crypto/${crypto.toUpperCase()}`);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        let data = await response.json();
        console.log("Dados recebidos no frontend:", data); // 🔍 Depuração

        return data?.data?.[crypto.toUpperCase()]?.quote?.USD?.price || null;
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        return null;
    }
}
