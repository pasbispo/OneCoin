const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require("node-fetch"); // Se usar Node.js <18, instale com `npm install node-fetch`

const app = express();
app.use(cors());
app.use(express.json());

// 🔄 **Conectar ao MongoDB Atlas** (Removida duplicação de `mongoose`)
mongoose.connect("mongodb+srv://Pasbispo:%40Nvidia12Fechar@cluster0.dnvhea7.mongodb.net/onecoin?retryWrites=true&w=majority")
.then(() => console.log("✅ Conectado ao MongoDB Atlas!"))
.catch(error => console.error("❌ Erro ao conectar ao MongoDB:", error));

// 📌 **Definir esquema de campanhas**
const CampanhaSchema = new mongoose.Schema({
    nome: String,
    periodo: Number,
    objetivo: String,
    imagens: [String], // ✅ Agora pode armazenar múltiplas imagens
    video: String,
    criptomoedas: Array
});

const Campanha = mongoose.model("Campanha", CampanhaSchema);

// ✅ **Salvar Campanha no MongoDB**
app.post('/salvar-campanha', async (req, res) => {
    try {
        const novaCampanha = new Campanha(req.body);
        await novaCampanha.save();
        res.json({ mensagem: "Campanha salva no banco de dados!" });
    } catch (error) {
        console.error("Erro ao salvar campanha:", error);
        res.status(500).json({ error: "Erro ao salvar campanha" });
    }
});

// ✅ **Recuperar campanhas do MongoDB**
app.get('/campanhas', async (req, res) => {
    try {
        const campanhas = await Campanha.find();
        res.json(campanhas);
    } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
        res.status(500).json({ error: "Erro ao carregar campanhas" });
    }
});

// ✅ **Rota CoinMarketCap**
const CMC_API_KEY = "bdf7d0eb-b427-4f59-b721-664d807c1fe2";
app.get('/crypto/:symbol', async (req, res) => {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${req.params.symbol.toUpperCase()}&convert=USD`;
    
    try {
        const response = await fetch(url, { headers: { 'X-CMC_PRO_API_KEY': CMC_API_KEY } });
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});

// 🚀 **Iniciar Servidor**
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
