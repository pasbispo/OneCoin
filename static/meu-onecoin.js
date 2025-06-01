document.getElementById("update-button").addEventListener("click", function () {
    let campaignName = document.getElementById("campaign-name").value.trim();
    let campaignPeriod = document.getElementById("campaign-period").value.trim();
    let campaignGoal = document.getElementById("campaign-goal").value.trim();
    let campaignImages = document.getElementById("campaign-images").files[0];

    if (!campaignName || !campaignPeriod || !campaignGoal) {
        alert("Preencha todas as informações antes de atualizar!");
        return;
    }

    let campaignData = {
        nome: campaignName,
        periodo: campaignPeriod,
        objetivo: campaignGoal,
        imagens: "",
        video: document.getElementById("video-player").src || "",
        criptomoedas: getCryptoTableData() // ✅ Pega apenas imagem, rede e endereço da tabela esquerda
    };

    // ✅ Salvar imagem como base64 para persistência
    if (campaignImages) {
        let reader = new FileReader();
        reader.readAsDataURL(campaignImages);
        reader.onload = function () {
            campaignData.imagens = reader.result;
            localStorage.setItem("savedCampaign", JSON.stringify(campaignData));
            document.getElementById("slideshow-image").src = campaignData.imagens;
        };
    } else {
        localStorage.setItem("savedCampaign", JSON.stringify(campaignData));
    }

    document.getElementById("panel-title").textContent = campaignName;
    document.getElementById("panel-duration").textContent = `Período: ${campaignPeriod} dias`;
    document.getElementById("panel-goal").textContent = campaignGoal;

    preencherTabelaCriptomoedasDireita(campaignData.criptomoedas); // ✅ Atualiza a tabela corretamente
    alert("Campanha atualizada! Agora os dados foram transferidos corretamente.");
});

// ✅ Função para pegar apenas imagem, rede e endereço da tabela esquerda
function getCryptoTableData() {
    let cryptoData = [];
    document.querySelectorAll("#crypto-table tbody tr").forEach(row => {
        let cells = row.querySelectorAll("td");
        cryptoData.push({
            imagem: row.querySelector("img")?.src || "static/img/default.png",
            rede: cells[1]?.textContent.trim(),
            endereco: cells[2]?.textContent.trim()
        });
    });
    return cryptoData;
}
document.addEventListener("DOMContentLoaded", function () {
    let campaignData = JSON.parse(localStorage.getItem("savedCampaign"));

    if (!campaignData) {
        console.log("Nenhuma campanha salva encontrada!");
        return;
    }

    document.getElementById("panel-title").textContent = campaignData.nome || "Nome não encontrado";
    document.getElementById("panel-duration").textContent = campaignData.periodo || "0 dias";
    document.getElementById("panel-goal").textContent = campaignData.objetivo || "Nenhum objetivo definido.";

    if (campaignData.imagens && campaignData.imagens !== "") {
        document.getElementById("slideshow-image").src = campaignData.imagens;
    }

    preencherTabelaCriptomoedasDireita(campaignData.criptomoedas);
});

// ✅ Função para preencher corretamente a tabela do lado direito
function preencherTabelaCriptomoedasDireita(cryptoData) {
    let cryptoPanelBody = document.querySelector(".crypto-panel-table tbody");
    cryptoPanelBody.innerHTML = "";

    cryptoData.forEach(crypto => {
        let row = document.createElement("tr");

        let cellImage = document.createElement("td");
        let cellNetwork = document.createElement("td");
        let cellAddress = document.createElement("td");
        let cellCopyButton = document.createElement("td");

        cellImage.innerHTML = `<img src="${crypto.imagem}" alt="Cripto" width="40">`;
        cellNetwork.textContent = crypto.rede || "Selecionar Rede";
        cellAddress.textContent = crypto.endereco || "Endereço não disponível";

        let copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar";
        copyBtn.classList.add("copy-btn");
        copyBtn.addEventListener("click", function () {
            if (crypto.endereco && crypto.endereco !== "Endereço não disponível") {
                navigator.clipboard.writeText(crypto.endereco);
                alert("Endereço copiado!");
            } else {
                alert("Nenhum endereço disponível para copiar!");
            }
        });

        cellCopyButton.appendChild(copyBtn);
        row.appendChild(cellImage);
        row.appendChild(cellNetwork);
        row.appendChild(cellAddress);
        row.appendChild(cellCopyButton);

        cryptoPanelBody.appendChild(row);
    });
}
