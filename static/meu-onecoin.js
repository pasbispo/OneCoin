document.addEventListener("DOMContentLoaded", function () {
    console.log("Página carregada!");

    // Verificando se os elementos existem
    let campaignName = document.getElementById("campaign-name");
    let campaignPeriod = document.getElementById("campaign-period");
    let campaignGoal = document.getElementById("campaign-goal");
    let campaignImage = document.getElementById("campaign-images");
    let campaignVideo = document.getElementById("video-file");
    let updateButton = document.getElementById("update-button");

    if (!campaignName || !campaignPeriod || !campaignGoal || !campaignImage || !campaignVideo || !updateButton) {
        console.error("Erro: Um ou mais elementos não foram encontrados no HTML!");
        return;
    }

    console.log("✅ Todos os elementos foram encontrados!");
});


















document.getElementById("update-button").addEventListener("click", function () {
    let campaignName = document.getElementById("campaign-name").value.trim();

    if (!campaignName) {
        alert("Digite um nome para a campanha antes de atualizar!");
        return;
    }

    // ✅ Atualiza o nome no painel direito
    document.getElementById("panel-title").textContent = campaignName;

    // ✅ Salva no localStorage
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.nome = campaignName;
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Nome atualizado:", campaignName);
});











document.getElementById("update-button").addEventListener("click", function () {
    let campaignPeriod = parseInt(document.getElementById("campaign-period").value.trim());

    if (isNaN(campaignPeriod) || campaignPeriod < 1 || campaignPeriod > 365) {
        alert("O período deve estar entre 1 e 365 dias!");
        return;
    }

    // ✅ Atualiza o painel direito
    let periodDisplay = document.getElementById("panel-duration");
    periodDisplay.textContent = campaignPeriod;

    // ✅ Calcula se já passou 80% do tempo e altera cor
    let remainingDays = campaignPeriod * 0.2;
    periodDisplay.style.color = campaignPeriod <= remainingDays ? "red" : "green";

    // ✅ Salva no localStorage
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.periodo = campaignPeriod;
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Período atualizado:", campaignPeriod);
});









document.getElementById("update-button").addEventListener("click", function () {
    let campaignImagesInput = document.getElementById("campaign-images");

    if (campaignImagesInput.files.length === 0) {
        alert("Por favor, selecione pelo menos uma imagem para a campanha!");
        return;
    }

    let campaignImages = [];
    for (let i = 0; i < campaignImagesInput.files.length; i++) {
        campaignImages.push(URL.createObjectURL(campaignImagesInput.files[i]));
    }

    // ✅ Salva todas as imagens no localStorage para exibição futura
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.imagens = campaignImages;
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Imagens da campanha salvas:", campaignImages);

    // ✅ Exibir todas as imagens dinamicamente
    let campaignImagesContainer = document.getElementById("campaign-images-container");
    campaignImagesContainer.innerHTML = ""; // Limpa antes de preencher

    campaignImages.forEach((imageSrc, index) => {
        let imgElement = document.createElement("img");
        imgElement.src = imageSrc;
        imgElement.alt = `Imagem ${index + 1} da campanha`;
        imgElement.classList.add("campaign-image");
        imgElement.style.display = index === 0 ? "block" : "none"; // Exibe apenas a primeira inicialmente
        campaignImagesContainer.appendChild(imgElement);
    });

    // ✅ Inicia o slideshow automático
    startSlideshow();
});
function startSlideshow() {
    let images = document.querySelectorAll(".campaign-image");
    let currentIndex = 0;

    if (images.length < 2) return; // Se houver só uma imagem, não precisa de slideshow

    setInterval(() => {
        images.forEach(img => img.style.display = "none");
        images[currentIndex].style.display = "block";

        currentIndex = (currentIndex + 1) % images.length;
    }, 3000); // ✅ Troca a imagem a cada 3 segundos
}










document.getElementById("update-button").addEventListener("click", function () {
    let campaignGoal = document.getElementById("campaign-goal").value.trim();

    if (campaignGoal.length > 565) {
        alert("O objetivo da campanha não pode exceder 565 caracteres!");
        return;
    }

    // ✅ Atualiza o painel direito
    document.getElementById("panel-goal").textContent = campaignGoal;

    // ✅ Salva no localStorage
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.objetivo = campaignGoal;
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Objetivo atualizado:", campaignGoal);
});









document.getElementById("update-button").addEventListener("click", function () {
    let campaignVideoInput = document.getElementById("video-file");

    if (campaignVideoInput.files.length === 0) {
        alert("Por favor, selecione um vídeo para a campanha!");
        return;
    }

    let campaignVideo = URL.createObjectURL(campaignVideoInput.files[0]);

    // ✅ Exibe o vídeo no painel direito
    document.getElementById("video-player").src = campaignVideo;
    document.getElementById("video-player").style.display = "block"; // Torna o vídeo visível

    // ✅ Salva no localStorage para exibição futura
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.video = campaignVideo;
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Vídeo atualizado:", campaignVideo);
});







document.getElementById("update-button").addEventListener("click", function () {
    let cryptoTableRows = document.querySelectorAll("#crypto-table tbody tr");
    let cryptoPanelTableBody = document.querySelector(".crypto-panel-table tbody");

    cryptoPanelTableBody.innerHTML = ""; // ✅ Limpa antes de preencher

    if (cryptoTableRows.length === 0) {
        alert("Adicione criptomoedas antes de atualizar!");
        return;
    }

    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.criptomoedas = [];

    cryptoTableRows.forEach(row => {
        let cells = row.querySelectorAll("td");

        let cryptoData = {
            simbolo: cells[0]?.textContent.trim(),
            quantidade: cells[1]?.textContent.trim(),
            valorEstimado: cells[2]?.textContent.trim(),
            imagem: cells[0]?.querySelector("img")?.src,
            redes: [
                { nome: "", endereco: "" }, // ✅ Placeholder para Rede 1
                { nome: "", endereco: "" }, // ✅ Placeholder para Rede 2
                { nome: "", endereco: "" }  // ✅ Placeholder para Rede 3
            ]
        };

        campaignData.criptomoedas.push(cryptoData);

        let rowPanel = document.createElement("tr");

        let cellPanelSymbol = document.createElement("td");
        let cellPanelNetwork = document.createElement("td");
        let cellPanelAddress = document.createElement("td");
        let cellPanelCopy = document.createElement("td");

        cellPanelSymbol.innerHTML = `<img src="${cryptoData.imagem}" alt="${cryptoData.simbolo}" width="40"> ${cryptoData.simbolo}`;

        let networkBtn = document.createElement("button");
        networkBtn.textContent = "Selecionar Rede";
        networkBtn.classList.add("network-btn");
        networkBtn.addEventListener("click", function () {
            openNetworkSelection(cryptoData, cellPanelAddress);
        });

        let copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar";
        copyBtn.classList.add("copy-btn");
        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(cellPanelAddress.textContent);
            alert("Endereço copiado!");
        });

        cellPanelNetwork.appendChild(networkBtn);
        cellPanelCopy.appendChild(copyBtn);
        rowPanel.appendChild(cellPanelSymbol);
        rowPanel.appendChild(cellPanelNetwork);
        rowPanel.appendChild(cellPanelAddress);
        rowPanel.appendChild(cellPanelCopy);

        cryptoPanelTableBody.appendChild(rowPanel);
    });

    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));
});

function openNetworkSelection(cryptoData, cellPanelAddress) {
    let modal = document.getElementById("network-modal");
    modal.classList.add("active"); // ✅ Faz a aba aparecer
    document.getElementById("crypto-name").textContent = cryptoData.simbolo;

    // ✅ Preenche automaticamente os campos se já houver redes salvas
    document.getElementById("network1").value = cryptoData.redes[0]?.nome || "";
    document.getElementById("address1").value = cryptoData.redes[0]?.endereco || "";
    document.getElementById("network2").value = cryptoData.redes[1]?.nome || "";
    document.getElementById("address2").value = cryptoData.redes[1]?.endereco || "";
    document.getElementById("network3").value = cryptoData.redes[2]?.nome || "";
    document.getElementById("address3").value = cryptoData.redes[2]?.endereco || "";

    document.getElementById("save-network").onclick = function () {
        cryptoData.redes = [
            { nome: document.getElementById("network1").value, endereco: document.getElementById("address1").value },
            { nome: document.getElementById("network2").value, endereco: document.getElementById("address2").value },
            { nome: document.getElementById("network3").value, endereco: document.getElementById("address3").value }
        ];

        // ✅ Exibe corretamente os três botões das redes na tabela da direita
        cellPanelAddress.innerHTML = `
            ${cryptoData.redes.map(r => `<button class="network-option" onclick="selectAddress('${r.endereco}')">${r.nome}</button>`).join(" ")}
        `;

        // ✅ Atualiza os dados no localStorage
        let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
        campaignData.criptomoedas.forEach(c => {
            if (c.simbolo === cryptoData.simbolo) {
                c.redes = cryptoData.redes;
            }
        });
        localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

        modal.classList.remove("active"); // ✅ Fecha a aba
    };

    document.getElementById("close-network").onclick = function () {
        modal.classList.remove("active"); // ✅ Fecha sem salvar
    };
}

// ✅ Quando o usuário seleciona uma rede, exibe o endereço correto
function selectAddress(endereco) {
    document.querySelector("#selected-address").textContent = endereco;
}











document.getElementById("update-button").addEventListener("click", function () {
    let campaignName = document.getElementById("campaign-name").value.trim();
    let campaignPeriod = parseInt(document.getElementById("campaign-period").value.trim());
    let campaignGoal = document.getElementById("campaign-goal").value.trim();
    let campaignImage = document.getElementById("campaign-images").files[0];
    let campaignVideo = document.getElementById("video-file").files[0];

    if (!campaignName || isNaN(campaignPeriod) || campaignPeriod < 1 || campaignPeriod > 365) {
        alert("Preencha corretamente o nome e período (de 1 a 365 dias)!");
        return;
    }

    if (campaignGoal.length > 560) {
        alert("O objetivo da campanha não pode exceder 560 caracteres!");
        return;
    }

    // ✅ Atualizando o painel direito
    document.getElementById("panel-title").textContent = campaignName;
    document.getElementById("panel-duration").textContent = campaignPeriod;
    document.getElementById("panel-goal").textContent = campaignGoal;

    // ✅ Exibir imagem e vídeo no painel direito
    let campaignImageURL = campaignImage ? URL.createObjectURL(campaignImage) : "";
    let campaignVideoURL = campaignVideo ? URL.createObjectURL(campaignVideo) : "";

    if (campaignImageURL) {
        document.getElementById("slideshow-image").src = campaignImageURL;
    }

    if (campaignVideoURL) {
        let videoPlayer = document.getElementById("video-player");
        videoPlayer.src = campaignVideoURL;
        videoPlayer.style.display = "block"; // Torna o vídeo visível
    }

    // ✅ Criando objeto para salvar no localStorage
    let campaignData = {
        nome: campaignName,
        periodo: campaignPeriod,
        objetivo: campaignGoal || "Nenhum objetivo definido.",
        imagens: campaignImageURL,
        video: campaignVideoURL,
        criptomoedas: []
    };

    // ✅ Atualiza a tabela da direita com os dados das criptomoedas
    let cryptoTableRows = document.querySelectorAll("#crypto-table tbody tr");
    let cryptoPanelTableBody = document.querySelector(".crypto-panel-table tbody");
    cryptoPanelTableBody.innerHTML = ""; 

    cryptoTableRows.forEach(row => {
        let cells = row.querySelectorAll("td");

        let cryptoData = {
            simbolo: cells[0]?.textContent.trim(),
            quantidade: cells[1]?.textContent.trim(),
            valorEstimado: cells[2]?.textContent.trim(),
            imagem: cells[0]?.querySelector("img")?.src,
            redes: [],
            endereco: ""
        };

        campaignData.criptomoedas.push(cryptoData);

        let rowPanel = document.createElement("tr");
        let cellPanelSymbol = document.createElement("td");
        let cellPanelNetwork = document.createElement("td");
        let cellPanelAddress = document.createElement("td");
        let cellPanelCopy = document.createElement("td");

        cellPanelSymbol.innerHTML = `<img src="${cryptoData.imagem}" alt="${cryptoData.simbolo}" width="40"> ${cryptoData.simbolo}`;
        
        

        let copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar";
        copyBtn.classList.add("copy-btn");
        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(cellPanelAddress.textContent);
            alert("Endereço copiado!");
        });

        cellPanelNetwork.appendChild(networkBtn);
        cellPanelCopy.appendChild(copyBtn);
        rowPanel.appendChild(cellPanelSymbol);
        rowPanel.appendChild(cellPanelNetwork);
        rowPanel.appendChild(cellPanelAddress);
        rowPanel.appendChild(cellPanelCopy);

        cryptoPanelTableBody.appendChild(rowPanel);
    });

    // ✅ Salvar campanha no localStorage
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Campanha e tabelas atualizadas!");
});



function openNetworkSelection(cryptoData, cellPanelAddress) {
    let modal = document.getElementById("network-modal");
    modal.classList.add("active"); // ✅ Faz a aba aparecer
    document.getElementById("crypto-name").textContent = cryptoData.simbolo;

    // ✅ Preenche os campos corretamente ao abrir a aba
    document.getElementById("network1").value = cryptoData.redes?.[0]?.nome || "";
    document.getElementById("address1").value = cryptoData.redes?.[0]?.endereco || "";
    document.getElementById("network2").value = cryptoData.redes?.[1]?.nome || "";
    document.getElementById("address2").value = cryptoData.redes?.[1]?.endereco || "";
    document.getElementById("network3").value = cryptoData.redes?.[2]?.nome || "";
    document.getElementById("address3").value = cryptoData.redes?.[2]?.endereco || "";

    document.getElementById("save-network").onclick = function () {
        cryptoData.redes = [
            { nome: document.getElementById("network1").value, endereco: document.getElementById("address1").value },
            { nome: document.getElementById("network2").value, endereco: document.getElementById("address2").value },
            { nome: document.getElementById("network3").value, endereco: document.getElementById("address3").value }
        ];

        // ✅ Exibe corretamente os três botões das redes na tabela da direita
        cellPanelAddress.innerHTML = `
            ${cryptoData.redes.map(r => `<button class="network-option" onclick="selectAddress('${r.endereco}')">${r.nome}</button>`).join(" ")}
        `;

        // ✅ Atualiza os dados no localStorage
        let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
        campaignData.criptomoedas.forEach(c => {
            if (c.simbolo === cryptoData.simbolo) {
                c.redes = cryptoData.redes;
            }
        });
        localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

        modal.classList.remove("active"); // ✅ Fecha a aba
    };

    document.getElementById("close-network").onclick = function () {
        modal.classList.remove("active"); // ✅ Fecha sem salvar
    };
}

// ✅ Quando o usuário seleciona uma rede, exibe o endereço correto
function selectAddress(endereco) {
    document.querySelector("#selected-address").textContent = endereco;
}










document.getElementById("end-campaign-button").addEventListener("click", function () {
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};

    if (!campaignData.nome || !campaignData.periodo || campaignData.criptomoedas.length === 0) {
        alert("Finalize apenas campanhas com nome, período e criptomoedas definidas!");
        return;
    }

    // ✅ Bloqueia edições
    document.getElementById("campaign-name").setAttribute("readonly", true);
    document.getElementById("campaign-period").setAttribute("readonly", true);
    document.getElementById("crypto-table").classList.add("table-locked");

    alert("Campanha finalizada e salva na conta do usuário!");

    let finishedCampaigns = JSON.parse(localStorage.getItem("finishedCampaigns")) || [];
    finishedCampaigns.push(campaignData);
    localStorage.setItem("finishedCampaigns", JSON.stringify(finishedCampaigns));

    console.log("✅ Campanha finalizada e armazenada!");
});













document.getElementById("new-campaign-button").addEventListener("click", function () {
    if (!confirm("Tem certeza de que deseja iniciar uma nova campanha? Isso apagará os dados não finalizados.")) {
        return;
    }

    // ✅ Limpa campos
    document.getElementById("campaign-name").value = "";
    document.getElementById("campaign-period").value = "";
    document.getElementById("campaign-goal").value = "";
    document.getElementById("slideshow-image").src = "";
    document.getElementById("video-player").src = "";
    document.querySelector("#crypto-table tbody").innerHTML = "";
    document.querySelector(".crypto-panel-table tbody").innerHTML = "";

    localStorage.removeItem("activeCampaign");

    console.log("✅ Nova campanha iniciada!");
});














document.addEventListener("DOMContentLoaded", function () {
    let cryptoTableBody = document.querySelector("#crypto-table tbody");
    cryptoTableBody.innerHTML = ""; 

    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    if (selectedCryptos.length === 0) {
        console.warn("Nenhuma criptomoeda encontrada no localStorage.");
        return;
    }

    selectedCryptos.forEach(crypto => {
        let row = document.createElement("tr");

        let cellSymbol = document.createElement("td");
        let cellQuantity = document.createElement("td");
        let cellValue = document.createElement("td");
        let cellActions = document.createElement("td");

        cellSymbol.innerHTML = `<img src="${crypto.imagem}" alt="${crypto.simbolo}" width="40"> ${crypto.simbolo}`;
        cellQuantity.textContent = crypto.quantidade ? crypto.quantidade : "0";
        cellValue.textContent = crypto.valorEstimado ? `${crypto.valorEstimado} USD` : "0 USD";

        let networkBtn = document.createElement("button");
networkBtn.textContent = "Selecionar Rede";
networkBtn.classList.add("network-btn");
networkBtn.setAttribute("data-crypto", crypto.simbolo);
networkBtn.addEventListener("click", function () {
    openNetworkSelection(crypto, cellActions); // ✅ Agora chama corretamente a aba de redes
});


        cellActions.appendChild(networkBtn);
        row.appendChild(cellSymbol);
        row.appendChild(cellQuantity);
        row.appendChild(cellValue);
        row.appendChild(cellActions);

        cryptoTableBody.appendChild(row);
    });

    console.log("✅ Tabela de criptomoedas carregada!");
});

