document.getElementById("update-button").addEventListener("click", function () {
    let campaignData = {
        nome: document.getElementById("campaign-name").value.trim(),
        periodo: document.getElementById("campaign-period").value.trim(),
        objetivo: document.getElementById("campaign-goal").value.trim(),
        imagens: document.getElementById("slideshow-image").src || "",
        video: document.getElementById("video-player").src || "",
        criptomoedas: getCryptoTableData()
    };

    localStorage.setItem("savedCampaign", JSON.stringify(campaignData));

    // ✅ Atualizar a planilha do lado direito
    document.getElementById("panel-title").textContent = campaignData.nome;
    document.getElementById("panel-duration").textContent = `Período: ${campaignData.periodo} dias`;
    document.getElementById("panel-goal").textContent = campaignData.objetivo;

    bloquearCampos();
    alert("Campanha atualizada! Agora os dados foram salvos e estão bloqueados.");
});

// ✅ Função para obter os dados da tabela de criptomoedas
function getCryptoTableData() {
    let cryptoData = [];
    document.querySelectorAll(".crypto-panel-table tbody tr").forEach(row => {
        let cells = row.querySelectorAll("td");
        cryptoData.push({
            simbolo: cells[0]?.textContent.trim(),
            rede: cells[1]?.textContent.trim(),
            endereco: cells[2]?.textContent.trim()
        });
    });
    return cryptoData;
}



function bloquearCampos() {
    document.getElementById("campaign-name").setAttribute("disabled", "true");
    document.getElementById("campaign-period").setAttribute("disabled", "true");

    document.querySelectorAll("#crypto-table input, #crypto-table button:not(.select-network-btn)").forEach(element => {
        element.setAttribute("disabled", "true");
    });

    alert("Os campos foram bloqueados! Agora só é possível modificar imagens, objetivo e vídeo.");
}


document.addEventListener("DOMContentLoaded", function () {
    let campaignData = JSON.parse(localStorage.getItem("savedCampaign"));

    if (!campaignData) {
        console.log("Nenhuma campanha salva encontrada!");
        return;
    }

    document.getElementById("campaign-name").value = campaignData.nome || "Nome não encontrado";
    document.getElementById("panel-title").textContent = campaignData.nome || "Nova campanha!";
    document.getElementById("panel-duration").textContent = campaignData.periodo || "0 dias";
    document.getElementById("panel-goal").textContent = campaignData.objetivo || "Nenhum objetivo definido.";

    if (campaignData.imagens && campaignData.imagens !== "") {
        document.getElementById("slideshow-image").src = campaignData.imagens;
    }

    if (campaignData.video && campaignData.video !== "") {
        document.getElementById("video-player").src = campaignData.video;
        document.getElementById("video-player").load();
    }

    restaurarTabelaCriptomoedas(campaignData.criptomoedas);
    bloquearCampos();
});

// ✅ Restaurar a tabela de criptomoedas corretamente ao carregar a página
function restaurarTabelaCriptomoedas(cryptoData) {
    let cryptoPanelBody = document.querySelector(".crypto-panel-table tbody");
    cryptoPanelBody.innerHTML = "";

    cryptoData.forEach(crypto => {
        let row = document.createElement("tr");

        let cellSymbol = document.createElement("td");
        let cellNetwork = document.createElement("td");
        let cellAddress = document.createElement("td");
        let cellCopyButton = document.createElement("td");

        cellSymbol.textContent = crypto.simbolo || "Criptomoeda desconhecida";
        cellNetwork.textContent = crypto.rede || "Selecionar Rede";
        cellAddress.textContent = crypto.endereco || "Selecione uma rede";

        let selectNetworkBtn = document.createElement("button");
        selectNetworkBtn.textContent = "Selecionar Rede";
        selectNetworkBtn.classList.add("select-network-btn");
        selectNetworkBtn.setAttribute("data-crypto", crypto.simbolo);
        selectNetworkBtn.addEventListener("click", function () {
            abrirSelecaoDeRede(crypto.simbolo, cellAddress);
        });

        let copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar";
        copyBtn.classList.add("copy-btn");
        copyBtn.addEventListener("click", function () {
            if (cellAddress.textContent !== "Selecione uma rede") {
                navigator.clipboard.writeText(cellAddress.textContent);
                alert("Endereço copiado!");
            } else {
                alert("Selecione uma rede antes de copiar!");
            }
        });

        cellCopyButton.appendChild(copyBtn);
        cellNetwork.appendChild(selectNetworkBtn);

        row.appendChild(cellSymbol);
        row.appendChild(cellNetwork);
        row.appendChild(cellAddress);
        row.appendChild(cellCopyButton);

        cryptoPanelBody.appendChild(row);
    });
}
