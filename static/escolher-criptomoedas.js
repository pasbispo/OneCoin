document.addEventListener("DOMContentLoaded", function () {
    carregarCampanhaAtiva();
    configurarBotaoContinuar();
    configurarBuscaCripto();
    carregarCriptomoedasTabela();
    configurarBotaoAtualizar();
    configurarCampoQuantidade();
});

// ✅ **Atualizar valor estimado ao alterar quantidade**
function configurarCampoQuantidade() {
    let cryptoAmountInput = document.getElementById("crypto-amount");
    if (!cryptoAmountInput) return console.error("Erro: Campo de quantidade não encontrado!");

    cryptoAmountInput.addEventListener("input", async function () {
        let amount = parseFloat(this.value);
        if (isNaN(amount) || amount <= 0) {
            document.getElementById("crypto-value").value = "Valor inválido";
            return;
        }

        if (selectedCrypto) {
            let price = await getCryptoPrice(selectedCrypto);
            document.getElementById("crypto-value").value = price ? (amount * price).toFixed(2) + " USD" : "Erro na cotação";
        }
    });
}

// ✅ **Configurar botão "Continuar"**
function configurarBotaoContinuar() {
    let continueButton = document.getElementById("continue-button");
    if (!continueButton) return console.error("Erro: Botão Continuar não encontrado!");

    continueButton.addEventListener("click", function () {
        let confirmation = confirm("Você confirma que todos os dados estão corretos?");
        window.location.href = confirmation ? "meu-onecoin.html" : "cadastro.html";
    });
}

// ✅ **Recuperar e exibir nome da campanha**
function carregarCampanhaAtiva() {
    let campaignNameInput = document.getElementById("campaign-name");
    let storedCampaignName = localStorage.getItem("campaignName");

    if (storedCampaignName && campaignNameInput) {
        campaignNameInput.value = storedCampaignName;
    } else {
        campaignNameInput.placeholder = "Nome não encontrado";
    }
}

// ✅ **Configurar busca de criptomoedas**
function configurarBuscaCripto() {
    let searchInput = document.getElementById("crypto-search");
    if (!searchInput) return console.error("Erro: Campo de busca não encontrado!");

    searchInput.placeholder = "Digite o nome da criptomoeda...";
}

// ✅ **Carregar tabela de criptomoedas**
function carregarCriptomoedasTabela() {
    let cryptoTableBody = document.querySelector(".crypto-panel-table tbody");
    let cryptoData = JSON.parse(localStorage.getItem("cryptoList"));

    if (!cryptoData || cryptoData.length === 0) {
        return console.error("Erro: Dados da criptomoeda não encontrados.");
    }

    cryptoTableBody.innerHTML = ""; // ✅ Limpa antes de preencher

    cryptoData.forEach(crypto => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${crypto.imageSrc}" alt="${crypto.name}"></td>
            <td><button>Selecionar Rede</button></td>
            <td>${crypto.quantity}</td>
            <td>${crypto.value}</td>
        `;
        cryptoTableBody.appendChild(row);
    });
}

// ✅ **Salvar criptomoeda no `localStorage` ao clicar no botão "Próximo"**
document.getElementById("next-button").addEventListener("click", function () {
    let cryptoName = document.getElementById("crypto-name").textContent;
    let cryptoImage = document.getElementById("crypto-image").src;
    let cryptoAmount = document.getElementById("crypto-amount").value;
    let cryptoValue = document.getElementById("crypto-value").value;

    if (!cryptoName || !cryptoAmount || !cryptoValue) {
        alert("Preencha todos os campos antes de continuar!");
        return;
    }

    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    selectedCryptos.push({
        name: cryptoName,
        image: cryptoImage,
        quantity: cryptoAmount,
        estimatedValue: cryptoValue
    });

    localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
    console.log("Criptomoedas salvas no localStorage!");
});

// ✅ **Configurar botão "Atualizar"**
function configurarBotaoAtualizar() {
    let updateButton = document.getElementById("update-button");
    if (!updateButton) return console.error("Erro: Botão 'Atualizar' não encontrado!");

    updateButton.addEventListener("click", function () {
        console.log("Botão clicado!");
    });
}
