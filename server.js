


const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = "campanhas.json"; // Arquivo para armazenar campanhas

// ✅ Salvar campanha no arquivo MongoDB
app.post('/salvar-campanha', async (req, res) => {
    try {
        const novaCampanha = new Campanha(req.body);
        await novaCampanha.save();
        res.json({ mensagem: "Campanha salva no banco de dados!" });
    } catch (error) {
        console.error("Erro ao salvar:", error);
        res.status(500).json({ error: "Erro ao salvar campanha" });
    }
});


const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://<seu_usuario>:<sua_senha>@cluster.mongodb.net/onecoin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const CampanhaSchema = new mongoose.Schema({
    nome: String,
    periodo: Number,
    objetivo: String,
    imagens: [String], // ✅ Agora pode armazenar várias imagens
    video: String,
    criptomoedas: Array
});

const Campanha = mongoose.model("Campanha", CampanhaSchema);


const fetch = require("node-fetch"); // Se não estiver instalado, execute `npm install node-fetch`

const CMC_API_KEY = "bdf7d0eb-b427-4f59-b721-664d807c1fe2"; // 🔐 Substitua pela sua chave da CoinMarketCap
const CMC_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";

// ✅ Função para buscar preços atualizados da CoinMarketCap
async function buscarPrecoCriptomoedas(simbolos) {
    try {
        const response = await fetch(`${CMC_URL}?symbol=${simbolos.join(",")}&convert=USD`, {
            headers: { "X-CMC_PRO_API_KEY": CMC_API_KEY }
        });

        if (!response.ok) throw new Error(`Erro na API CoinMarketCap: ${response.status}`);
        const data = await response.json();

        // 🔄 Retorna os preços em um objeto organizado
        let precos = {};
        for (let simbolo of simbolos) {
            if (data.data[simbolo]) {
                precos[simbolo] = data.data[simbolo].quote.USD.price;
            }
        }
        return precos;
    } catch (error) {
        console.error("Erro ao buscar preços:", error);
        return {}; // Retorna um objeto vazio em caso de erro
    }
}

// ✅ Alteração na rota `/campanhas`
app.get("/campanhas", async (req, res) => {
    try {
        const campanhas = await Campanha.find();
        
        // 🔄 Extraí os símbolos das criptomoedas das campanhas salvas
        let simbolos = [];
        campanhas.forEach(campanha => {
            campanha.criptomoedas.forEach(crypto => {
                if (!simbolos.includes(crypto.simbolo)) {
                    simbolos.push(crypto.simbolo);
                }
            });
        });

        // 🏆 Busca os preços das criptomoedas antes de enviar a resposta
        const precosAtualizados = await buscarPrecoCriptomoedas(simbolos);

        // 🔄 Atualiza as campanhas com os preços atuais
        campanhas.forEach(campanha => {
            campanha.criptomoedas.forEach(crypto => {
                crypto.valorEstimado = precosAtualizados[crypto.simbolo] || crypto.valorEstimado;
            });
        });

        res.json(campanhas);
    } catch (error) {
        console.error("Erro ao buscar campanhas:", error);
        res.status(500).json({ error: "Erro ao carregar campanhas" });
    }
});


