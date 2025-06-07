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












document.addEventListener("DOMContentLoaded", function () {
    let cryptoTableBody = document.querySelector("#crypto-table tbody");
    cryptoTableBody.innerHTML = "";

    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    selectedCryptos.forEach(crypto => {
        let row = document.createElement("tr");

        let cellSymbol = document.createElement("td");
        let cellQuantity = document.createElement("td");
        let cellValue = document.createElement("td");
        let cellActions = document.createElement("td");

        cellSymbol.innerHTML = `<img src="${crypto.imagem}" alt="${crypto.simbolo}" width="40"> ${crypto.simbolo}`;
        cellQuantity.textContent = crypto.quantidade || "0";
        cellValue.textContent = crypto.valorEstimado ? `${crypto.valorEstimado} USD` : "0 USD";

        let networkBtn = document.createElement("button");
        networkBtn.textContent = "Minhas Redes";
        networkBtn.classList.add("network-btn");
        networkBtn.addEventListener("click", () => {
            openNetworkModal(crypto);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Excluir";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            selectedCryptos = selectedCryptos.filter(c => c.simbolo !== crypto.simbolo);
            localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
            row.remove();
        });

        cellActions.appendChild(networkBtn);
        cellActions.appendChild(deleteBtn);
        row.appendChild(cellSymbol);
        row.appendChild(cellQuantity);
        row.appendChild(cellValue);
        row.appendChild(cellActions);

        cryptoTableBody.appendChild(row);
    });

    console.log("✅ Tabela da esquerda carregada corretamente!");
});

function openNetworkModal(crypto) {
    const modal = document.getElementById("network-modal");
    modal.classList.add("active");
    document.getElementById("crypto-name").textContent = crypto.simbolo;

    document.getElementById("network1").value = crypto.redes?.[0]?.nome || "";
    document.getElementById("address1").value = crypto.redes?.[0]?.endereco || "";
    document.getElementById("network2").value = crypto.redes?.[1]?.nome || "";
    document.getElementById("address2").value = crypto.redes?.[1]?.endereco || "";
    document.getElementById("network3").value = crypto.redes?.[2]?.nome || "";
    document.getElementById("address3").value = crypto.redes?.[2]?.endereco || "";

    document.getElementById("save-network").onclick = () => {
        crypto.redes = [
            {
                nome: document.getElementById("network1").value,
                endereco: document.getElementById("address1").value,
            },
            {
                nome: document.getElementById("network2").value,
                endereco: document.getElementById("address2").value,
            },
            {
                nome: document.getElementById("network3").value,
                endereco: document.getElementById("address3").value,
            },
        ];

        let updated = JSON.parse(localStorage.getItem("selectedCryptos")) || [];
        updated = updated.map(c => (c.simbolo === crypto.simbolo ? crypto : c));
        localStorage.setItem("selectedCryptos", JSON.stringify(updated));
        modal.classList.remove("active");
    };

    document.getElementById("close-network").onclick = () => {
        modal.classList.remove("active");
    };
}

function openNetworkModal(crypto) {
    let existingModal = document.getElementById("network-modal");
    if (existingModal) existingModal.remove();

    const modal = document.createElement("div");
    modal.id = "network-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.6)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    modal.innerHTML = `
        <div style="background:white;padding:20px;border-radius:8px;width:300px;">
            <h3>Redes de ${crypto.simbolo}</h3>
            ${[1,2,3].map(i => `
                <div style="margin-bottom:10px;">
                    <label>Rede ${i}:</label><br>
                    <input type="text" id="network${i}" value="${crypto.redes?.[i-1]?.nome || ''}" style="width:100%;"><br>
                    <label>Endereço ${i}:</label><br>
                    <input type="text" id="address${i}" value="${crypto.redes?.[i-1]?.endereco || ''}" style="width:100%;">
                </div>
            `).join("")}
            <button id="save-network">Salvar</button>
            <button id="close-network" style="margin-left:10px;">Fechar</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("save-network").onclick = () => {
        crypto.redes = [1, 2, 3].map(i => ({
            nome: document.getElementById(`network${i}`).value,
            endereco: document.getElementById(`address${i}`).value
        }));

        let updated = JSON.parse(localStorage.getItem("selectedCryptos")) || [];
        updated = updated.map(c => (c.simbolo === crypto.simbolo ? crypto : c));
        localStorage.setItem("selectedCryptos", JSON.stringify(updated));
        modal.remove();
    };

    document.getElementById("close-network").onclick = () => {
        modal.remove();
    };
}



















function atualizarTabelaPainel() {
    const tbodyPainel = document.querySelector(".crypto-panel-table tbody");
    tbodyPainel.innerHTML = "";

    const selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    selectedCryptos.forEach((crypto, index) => {
        if (!crypto.redes) return;

        const row = document.createElement("tr");

        // 📸 Célula 1: Imagem da cripto
        const tdImagem = document.createElement("td");
        const img = document.createElement("img");
        img.src = crypto.imagem;
        img.alt = crypto.simbolo;
        img.width = 40;
        tdImagem.appendChild(img);

        // 🌐 Célula 2: Botão "Rede" que abre 3 botões de escolha
        const tdRede = document.createElement("td");
        const btnRede = document.createElement("button");
        btnRede.textContent = "Rede";
        const containerRedes = document.createElement("div");
        containerRedes.style.display = "none"; // inicia oculto
        containerRedes.style.marginTop = "5px";

        crypto.redes.forEach((rede, idx) => {
            if (rede.nome && rede.endereco) {
                const redeBtn = document.createElement("button");
                redeBtn.textContent = rede.nome;
                redeBtn.style.marginRight = "5px";
                redeBtn.onclick = () => {
                    tdEndereco.textContent = rede.endereco;
                };
                containerRedes.appendChild(redeBtn);
            }
        });

        btnRede.onclick = () => {
            containerRedes.style.display =
                containerRedes.style.display === "none" ? "block" : "none";
        };

        tdRede.appendChild(btnRede);
        tdRede.appendChild(containerRedes);

        // 📍 Célula 3: Endereço (preenchido ao clicar na rede)
        const tdEndereco = document.createElement("td");
        tdEndereco.textContent = ""; // começa vazio

        // 📋 Célula 4: Botão "Copiar"
        const tdCopiar = document.createElement("td");
        const btnCopiar = document.createElement("button");
        btnCopiar.textContent = "Copiar";
        btnCopiar.onclick = () => {
            const texto = tdEndereco.textContent;
            if (!texto) {
                alert("Nenhum endereço selecionado!");
                return;
            }
            navigator.clipboard.writeText(texto).then(() => {
                alert("Endereço copiado!");
            });
        };
        tdCopiar.appendChild(btnCopiar);

        // Adiciona as células à linha
        row.appendChild(tdImagem);
        row.appendChild(tdRede);
        row.appendChild(tdEndereco);
        row.appendChild(tdCopiar);

        // Adiciona a linha à tabela
        tbodyPainel.appendChild(row);
    });
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
        
        let networkBtn = document.createElement("button");
        networkBtn.textContent = "Minhas Redes";
        networkBtn.classList.add("network-btn");
        networkBtn.addEventListener("click", function () {
            let userNetwork = prompt(`Digite a rede para ${cryptoData.simbolo}:`);
            if (userNetwork) {
                cryptoData.endereco = userNetwork;
                cellPanelAddress.textContent = userNetwork;
            }
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

    // ✅ Salvar campanha no localStorage
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Campanha e tabelas atualizadas!");
});













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













