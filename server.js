


const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "campanhas.json"; // Arquivo para armazenar campanhas

// ✅ Salvar campanha no arquivo JSON
app.post('/salvar-campanha', (req, res) => {
    let campanhas = [];

    if (fs.existsSync(FILE_PATH)) {
        campanhas = JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
    }

    campanhas.push(req.body);
    fs.writeFileSync(FILE_PATH, JSON.stringify(campanhas, null, 2));

    res.json({ mensagem: "Campanha salva com sucesso!" });
});

// ✅ Recuperar campanhas salvas
app.get('/campanhas', (req, res) => {
    if (!fs.existsSync(FILE_PATH)) {
        return res.json([]);
    }

    res.json(JSON.parse(fs.readFileSync(FILE_PATH, "utf-8")));
});

// ✅ Rota CoinMarketCap (já existente)
app.get('/crypto/:symbol', async (req, res) => {
    const crypto = req.params.symbol.toUpperCase();
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}&convert=USD`;
    const options = { headers: { 'X-CMC_PRO_API_KEY': 'bdf7d0eb-b427-4f59-b721-664d807c1fe2' } };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);

        const data = await response.json();
        console.log("Resposta da API:", JSON.stringify(data, null, 2));

        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
