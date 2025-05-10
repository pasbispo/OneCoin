const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Para permitir requisições do seu frontend

const app = express();
app.use(cors());

app.get('/crypto', async (req, res) => {
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC&convert=USD';
    const options = { headers: { 'X-CMC_PRO_API_KEY': 'SUA_CHAVE_API' } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
