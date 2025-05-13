// Definição global para permitir acesso em todas as funções
let selectedCrypto = "BTC"; // Define um valor inicial padrão

// Função para buscar cotação da criptomoeda na API CoinMarketCap
async function getCryptoPrice(crypto) {
    try {
        let response = await fetch(`http://localhost:3000/crypto/${crypto.toUpperCase()}`);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        let data = await response.json();
        return data?.data?.[crypto.toUpperCase()]?.quote?.USD?.price || null;
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        return "Erro na cotação";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let nextButton = document.getElementById("next-button");
    let cryptoAmountInput = document.getElementById("crypto-amount");

    if (!nextButton || !cryptoAmountInput) {
        console.error("Erro: Elementos não encontrados!");
        return;
    }

    // Atualiza valor estimado com base na cotação
    cryptoAmountInput.addEventListener("input", async function() {
        let amount = parseFloat(this.value);
        let price = await getCryptoPrice(selectedCrypto);

        document.getElementById("crypto-value").value = price ? (amount * price).toFixed(2) + " USD" : "Erro na cotação";
    });

    // Evento de clique no botão "Próximo"
    nextButton.addEventListener("click", function() {
        console.log("Botão Próximo clicado!");

        let cryptoName = document.getElementById("crypto-name")?.textContent.trim() || "";
        let cryptoImage = document.getElementById("crypto-image")?.src || "";
        let cryptoAmount = cryptoAmountInput.value.trim() || "";
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

// Função para limitar casas decimais na entrada
function limitDecimals(input) {
    let value = input.value;
    input.value = value.match(/^\d*(\.\d{0,8})?/)[0]; // Limita a 8 casas decimais
}
