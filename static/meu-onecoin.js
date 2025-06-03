document.getElementById("update-button").addEventListener("click", function () {
    let campaignData = {
        nome: document.getElementById("campaign-name").value.trim(),
        periodo: document.getElementById("campaign-period").value.trim(),
        objetivo: document.getElementById("campaign-goal").value.trim(),
        imagens: [],
        video: document.getElementById("video-player").src,
        criptomoedas: []
    };

    let campaignImages = document.getElementById("campaign-images").files;
    if (campaignImages.length > 0) {
        for (let i = 0; i < campaignImages.length; i++) {
            campaignData.imagens.push(URL.createObjectURL(campaignImages[i]));
        }
    }

    let cryptoRows = document.querySelectorAll("#crypto-table tbody tr");
    cryptoRows.forEach(row => {
        let cells = row.querySelectorAll("td");
        campaignData.criptomoedas.push({
            simbolo: cells[0]?.textContent.trim(),
            quantidade: cells[1]?.textContent.trim(),
            valorEstimado: cells[2]?.textContent.trim(),
            imagem: cells[0]?.querySelector("img")?.src || ""
        });
    });

    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));
    alert("Campanha salva com sucesso!");
});

document.addEventListener("DOMContentLoaded", function () {
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign"));
    if (campaignData) {
        document.getElementById("campaign-name").value = campaignData.nome;
        document.getElementById("campaign-period").value = campaignData.periodo;
        document.getElementById("panel-title").textContent = campaignData.nome;
        document.getElementById("panel-duration").textContent = `Período: ${campaignData.periodo} dias`;
        document.getElementById("panel-goal").textContent = "Objetivo: " + campaignData.objetivo;
        document.getElementById("video-player").src = campaignData.video;
        document.getElementById("video-player").load();

        let slideshowImage = document.getElementById("slideshow-image");
        if (campaignData.imagens.length > 0) {
            let imageIndex = 0;
            slideshowImage.src = campaignData.imagens[imageIndex];
            setInterval(() => {
                imageIndex = (imageIndex + 1) % campaignData.imagens.length;
                slideshowImage.src = campaignData.imagens[imageIndex];
            }, 3000);
        }

        bloquearCampos();
    }
});

document.getElementById("finalize-button").addEventListener("click", function () {
    let campaignData = {
        nome: document.getElementById("campaign-name").value.trim(),
        periodo: document.getElementById("campaign-period").value.trim(),
        objetivo: document.getElementById("campaign-goal").value.trim(),
        criptomoedas: []
    };

    fetch("http://localhost:3000/finalizar-campanha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: campanhaId }) // ✅ Enviando o ID correto
})
    .then(response => response.json())
    .then(data => alert(data.mensagem))
    .catch(error => console.error("Erro ao salvar:", error));
});

document.addEventListener("DOMContentLoaded", function () {
 fetch("http://localhost:3000/campanhas-finalizadas")
.then(response => response.json())
.then(campanhas => {
    let ultimaCampanha = campanhas[campanhas.length - 1]; // ✅ Certifique-se de que há campanhas no array
    if (ultimaCampanha) {
        document.getElementById("campaign-name").value = ultimaCampanha.nome;
        document.getElementById("campaign-period").value = ultimaCampanha.periodo;
        document.getElementById("panel-title").textContent = ultimaCampanha.nome;
        document.getElementById("panel-duration").textContent = `Período: ${ultimaCampanha.periodo} dias`;
        document.getElementById("panel-goal").textContent = ultimaCampanha.objetivo; // ✅ Evita repetição do objetivo
    }
})
.catch(error => console.error("Erro ao carregar campanhas:", error));



document.getElementById("finalize-button").addEventListener("click", function () {
    let campaignName = document.getElementById("campaign-name").value.trim();

    if (!campaignName) {
        alert("Digite um nome para a campanha!");
        return;
    }

    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    // Evita duplicatas
    if (!campaigns.find(c => c.nome === campaignName)) {
        campaigns.push({ nome: campaignName, url: `meu-onecoin.html?campanha=${encodeURIComponent(campaignName)}` });
        localStorage.setItem("userCampaigns", JSON.stringify(campaigns));
    }

    alert("Campanha finalizada! Agora ela pode ser acessada em 'Minhas Campanhas'.");
});




document.addEventListener("DOMContentLoaded", function () {
    let cryptoPanelBody = document.querySelector(".crypto-panel-table tbody");
    cryptoPanelBody.innerHTML = ""; // ✅ Evita duplicação ao recarregar

    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    if (selectedCryptos.length === 0) {
        console.warn("Nenhuma criptomoeda encontrada.");
        return;
    }

    selectedCryptos.forEach(crypto => {
        let row = document.createElement("tr");

        let cellImage = document.createElement("td");
        let cellNetworkButton = document.createElement("td");
        let cellAddress = document.createElement("td");
        let cellCopyButton = document.createElement("td");

        // ✅ Adiciona imagem da criptomoeda
        cellImage.innerHTML = `<img src="${crypto.image}" alt="${crypto.name}" width="40">`;

        // ✅ Botão "Selecionar Rede"
        let selectNetworkBtn = document.createElement("button");
        selectNetworkBtn.textContent = "Selecionar Rede";
        selectNetworkBtn.classList.add("select-network-btn");
        selectNetworkBtn.setAttribute("data-crypto", crypto.name);
        cellNetworkButton.appendChild(selectNetworkBtn);

        // ✅ Espaço para exibir o endereço da rede selecionada
        cellAddress.textContent = crypto.selectedAddress || "Selecione uma rede";

        // ✅ Botão "Copiar Endereço"
        let copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar";
        copyBtn.classList.add("copy-btn");
        copyBtn.addEventListener("click", function () {
            if (cellAddress.textContent !== "Selecione uma rede") {
                navigator.clipboard.writeText(cellAddress.textContent);
                alert("Endereço copiado!");
            } else {
                alert("Selecione uma rede primeiro!");
            }
        });
        cellCopyButton.appendChild(copyBtn);

        row.appendChild(cellImage);
        row.appendChild(cellNetworkButton);
        row.appendChild(cellAddress);
        row.appendChild(cellCopyButton);

        cryptoPanelBody.appendChild(row);
    });

    // ✅ Adiciona evento para abrir o modal de seleção de redes
    document.querySelectorAll(".select-network-btn").forEach(button => {
        button.addEventListener("click", function () {
            let cryptoName = this.getAttribute("data-crypto");
            abrirSelecaoDeRede(cryptoName, this.parentElement.nextElementSibling);
        });
    });
});






function abrirSelecaoDeRede(cryptoName, addressCell) {
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];
    let selectedCrypto = selectedCryptos.find(c => c.name === cryptoName);
    
    let networks = selectedCrypto?.networks || [];
    let addresses = selectedCrypto?.addresses || [];

    let networkForm = document.createElement("div");
    networkForm.innerHTML = `
        <h3>Selecione uma rede para ${cryptoName}</h3>
        <div id="network-options"></div>
        <button class="close-btn">Fechar</button>
    `;

    let networkOptions = networkForm.querySelector("#network-options");

    if (networks.length === 0 || addresses.length === 0) {
        networkOptions.innerHTML = "<p>As redes e endereços não foram cadastrados.</p>";
    } else {
        networks.forEach((network, index) => {
            let btn = document.createElement("button");
            btn.textContent = network;
            btn.classList.add("network-option");
            btn.addEventListener("click", function() {
                addressCell.textContent = addresses[index]; 
                modal.remove();
            });
            networkOptions.appendChild(btn);
        });
    }

    networkForm.querySelector(".close-btn").addEventListener("click", function() {
        modal.remove();
    });

    modal.appendChild(networkForm);
    document.body.appendChild(modal);
}




document.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", function() {
        let addressCell = this.parentElement.previousElementSibling;
        if (addressCell.textContent !== "Selecione uma rede") {
            navigator.clipboard.writeText(addressCell.textContent);
            alert("Endereço copiado!");
        } else {
            alert("Selecione uma rede primeiro!");
        }
    });
});

let campaignData = {
    nome: document.getElementById("campaign-name").value.trim(),
    periodo: document.getElementById("campaign-period").value.trim(),
    objetivo: document.getElementById("campaign-goal").value.trim(),
    criptomoedas: [],
    finalizada: true // ✅ Agora a campanha fica marcada como finalizada
};



document.getElementById("finalize-button").addEventListener("click", function () {
    let campaignData = {
        nome: document.getElementById("campaign-name").value.trim(),
        periodo: document.getElementById("campaign-period").value.trim(),
        objetivo: document.getElementById("campaign-goal").value.trim(),
        criptomoedas: [],
        finalizada: true // ✅ Agora a campanha fica marcada como finalizada
    };

    fetch("http://localhost:3000/finalizar-campanha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignData)
    })
    .then(response => response.json())
    .then(data => alert(data.mensagem))
    .catch(error => console.error("Erro ao finalizar campanha:", error));
});

// ✅ **Recuperar campanhas finalizadas**
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/campanhas-finalizadas")
    .then(response => response.json())
    .then(campanhas => {
        let ultimaCampanha = campanhas[campanhas.length - 1];
        if (ultimaCampanha) {
            document.getElementById("campaign-name").value = ultimaCampanha.nome;
            document.getElementById("campaign-period").value = ultimaCampanha.periodo;
            document.getElementById("panel-title").textContent = ultimaCampanha.nome;
            document.getElementById("panel-duration").textContent = `Período: ${ultimaCampanha.periodo} dias`;
            document.getElementById("panel-goal").textContent = "Objetivo: " + ultimaCampanha.objetivo;
        }
    })
    .catch(error => console.error("Erro ao carregar campanhas:", error));
});

