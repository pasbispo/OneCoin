const express = require('express');
const cors = require('cors'); // Permite requisições externas

const app = express();
app.use(cors()); // Habilita CORS para que o frontend possa acessar a API

app.get('/crypto/:symbol', async (req, res) => {
    const crypto = req.params.symbol.toUpperCase();
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}&convert=USD`;
    const options = { headers: { 'X-CMC_PRO_API_KEY': 'bdf7d0eb-b427-4f59-b721-664d807c1fe2' } };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        console.log("Resposta da API:", JSON.stringify(data, null, 2));

        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
