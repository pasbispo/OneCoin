const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Para permitir requisições do seu frontend

const app = express();
app.use(cors());

app.get('/crypto/:symbol', async (req, res) => {
    const crypto = req.params.symbol.toUpperCase();
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}&convert=USD`;
    const options = { headers: { 'X-CMC_PRO_API_KEY': 'bdf7d0eb-b427-4f59-b721-664d807c1fe2' } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});


app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
