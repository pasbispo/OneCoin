require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require("node-fetch"); // Se usar Node.js <18, instale com `npm install node-fetch`

const app = express();
app.use(cors());
app.use(express.json());

// 🔄 **Conectar ao MongoDB Atlas** (Removida duplicação de `mongoose`)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Conectado ao MongoDB Atlas!"))
.catch(error => console.error("❌ Erro ao conectar ao MongoDB:", error));



// 📌 **Definir esquema de campanhas**
const CampanhaSchema = new mongoose.Schema({
    nome: String,
    periodo: Number,
    objetivo: String,
    imagens: [String],
    video: String,
    criptomoedas: Array,
    finalizada: { type: Boolean, default: false } // 🔄 Corrige problema da tabela esquerda desbloqueando
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

// ✅ **Finalizar campanha (agora a tabela direita recupera os dados corretamente)**
app.post('/finalizar-campanha', async (req, res) => {
    try {
        const { id } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const campanha = await Campanha.findByIdAndUpdate(id, { finalizada: true }, { new: true });
        if (!campanha) {
            return res.status(404).json({ error: "Campanha não encontrada" });
        }

        res.json({ mensagem: "Campanha finalizada!", campanha });
    } catch (error) {
        console.error("Erro ao finalizar campanha:", error);
        res.status(500).json({ error: "Erro ao finalizar campanha" });
    }
});

// ✅ Buscar campanha específica por ID
app.get('/campanhas/:id', async (req, res) => {
    try {
        const campanha = await Campanha.findById(req.params.id);
        if (!campanha) return res.status(404).json({ error: "Campanha não encontrada" });
        res.json(campanha);
    } catch (error) {
        console.error("Erro ao buscar campanha:", error);
        res.status(500).json({ error: "Erro ao buscar campanha" });
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
const CMC_API_KEY = process.env.CMC_API_KEY;
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




app.delete('/campanhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Campanha.findByIdAndDelete(id);
        res.json({ mensagem: "Campanha excluída com sucesso." });
    } catch (error) {
        console.error("Erro ao excluir campanha:", error);
        res.status(500).json({ error: "Erro ao excluir campanha." });
    }
});






// 🚀 **Iniciar Servidor**
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
