



// Definição global para permitir acesso em todas as funções
let selectedCrypto = "BTC"; // Define um valor inicial padrão



// Função para buscar cotação da criptomoeda na API CoinMarketCap
async function getCryptoPrice(crypto) {
    let response = await fetch(`http://localhost:3000/crypto/${crypto.toUpperCase()}`);
    let data = await response.json();
    return data?.data?.[crypto.toUpperCase()]?.quote?.USD?.price || null;
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("crypto-amount").addEventListener("input", async function() {
        let amount = parseFloat(this.value);
        let price = await getCryptoPrice(selectedCrypto); // Usa a criptomoeda escolhida

        if (price) {
            document.getElementById("crypto-value").value = (amount * price).toFixed(2) + " USD";
        } else {
            document.getElementById("crypto-value").value = "Erro na cotação";
        }
    });
});

// Atualizar a criptomoeda selecionada e exibir no retângulo
async function selectCrypto(crypto, name) {
    selectedCrypto = crypto; // Atualiza variável global
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");

    if (cryptoImage && cryptoName) {
        cryptoImage.src = `static/img/${crypto}.png`;
        cryptoImage.classList.remove("hidden");
        cryptoName.textContent = name;
    } else {
        console.error("Erro: Elementos da criptomoeda não encontrados!");
    }

    // Atualiza a cotação automaticamente ao selecionar a criptomoeda
    let price = await getCryptoPrice(selectedCrypto);
    if (price) {
        document.getElementById("crypto-value").value = (price).toFixed(2) + " USD"; // Mostra o valor unitário da criptomoeda
    } else {
        document.getElementById("crypto-value").value = "Erro na cotação";
    }
}

app.get('/crypto/:symbol', async (req, res) => {
    const crypto = req.params.symbol.toUpperCase();
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}&convert=USD`;
    const options = { headers: { 'X-CMC_PRO_API_KEY': 'bdf7d0eb-b427-4f59-b721-664d807c1fe2' } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log("Resposta da API:", data); // <-- Adicionado para depuração
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        res.status(500).json({ error: 'Erro ao buscar dados' });
    }
});









document.addEventListener("DOMContentLoaded", function() {
    let nextButton = document.getElementById("next-button");

    if (!nextButton) {
        console.error("Erro: O botão Próximo não foi encontrado!");
        return;
    }

    nextButton.addEventListener("click", function() {
        let cryptoName = document.getElementById("crypto-name")?.textContent.trim() || "";
        let cryptoImage = document.getElementById("crypto-image")?.src || "";
        let cryptoAmount = document.getElementById("crypto-amount")?.value.trim() || "";
        let cryptoValue = document.getElementById("crypto-value")?.value.trim() || "";

        if (!cryptoName || cryptoAmount === "" || cryptoValue === "") {
            alert("Preencha todos os campos antes de continuar!");
            return;
        }

        let table = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];

        // Remover linha vazia inicial, se existir
        let emptyRow = document.querySelector(".empty-row");
        if (emptyRow) emptyRow.remove();

        // Criando nova linha na tabela
        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="${cryptoImage}" width="30"> ${cryptoName}</td>
            <td>${cryptoAmount}</td>
            <td>${cryptoValue}</td>
            <td><button class="delete-button">Excluir</button></td>
        `;

        newRow.querySelector(".delete-button").addEventListener("click", function() {
            newRow.remove();
            
            if (table.rows.length === 0) {
                table.innerHTML = `<tr class="empty-row"><td colspan="4" style="text-align: center; color: gray;">Nenhum dado cadastrado ainda.</td></tr>`;
            }
        });
    });
});





function limitDecimals(input) {
    let value = input.value;
    input.value = value.match(/^\d*(\.\d{0,8})?/)[0]; // Limita a 8 casas decimais
}





document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => { // Adiciona um pequeno atraso para garantir que tudo seja carregado
        let nextButton = document.getElementById("next-button");

        if (!nextButton) {
            console.error("Erro: O botão Próximo não foi encontrado!");
            return;
        }

        nextButton.addEventListener("click", function() {
            console.log("Botão Próximo clicado!"); // Para testar no console
        });
    }, 500); // Aguarda meio segundo antes de executar o código
});
