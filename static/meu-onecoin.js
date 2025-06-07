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















document.getElementById("update-button").addEventListener("click", () => {
    const selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];
    const tbody = document.querySelector(".crypto-panel-table tbody");
    tbody.innerHTML = ""; // Limpa a tabela antes de preencher

    selectedCryptos.forEach(crypto => {
        const row = document.createElement("tr");

        // 1. Célula da imagem da criptomoeda
        const cellImage = document.createElement("td");
        const img = document.createElement("img");
        img.src = crypto.imagem;
        img.alt = crypto.simbolo;
        img.width = 40;
        cellImage.appendChild(img);
        row.appendChild(cellImage);

               
        // 2. Célula do botão "Rede" + opções de redes
        const cellNetwork = document.createElement("td");
        const networkBtn = document.createElement("button");
        networkBtn.textContent = "Rede";
        networkBtn.classList.add("network-select-btn");

        const networkOptions = document.createElement("div");
        networkOptions.classList.add("network-options");
        networkOptions.style.display = "none";

        let selectedAddress = "";

        crypto.redes?.forEach((rede, i) => {
            const optionBtn = document.createElement("button");
            optionBtn.textContent = rede.nome || `Rede ${i + 1}`;
            optionBtn.addEventListener("click", () => {
                addressCell.textContent = rede.endereco || "";
                selectedAddress = rede.endereco || "";
                networkOptions.style.display = "none";
            });
            networkOptions.appendChild(optionBtn);
        });

        networkBtn.addEventListener("click", () => {
            networkOptions.style.display = networkOptions.style.display === "none" ? "block" : "none";
        });

        cellNetwork.appendChild(networkBtn);
        cellNetwork.appendChild(networkOptions);
        row.appendChild(cellNetwork);

        // 3. Célula do endereço (vazio até o usuário escolher a rede)
        const addressCell = document.createElement("td");
        addressCell.textContent = ""; // Será preenchido após clicar na rede
        row.appendChild(addressCell);

        // 4. Célula do botão copiar
        const cellCopy = document.createElement("td");
        const copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar";
        copyBtn.classList.add("copy-btn");
        copyBtn.addEventListener("click", () => {
            if (!selectedAddress) {
                alert("Escolha uma rede primeiro.");
                return;
            }
            navigator.clipboard.writeText(selectedAddress)
                .then(() => alert("Endereço copiado!"))
                .catch(err => alert("Erro ao copiar."));
        });
        cellCopy.appendChild(copyBtn);
        row.appendChild(cellCopy);

        tbody.appendChild(row);
    });

    console.log("✅ Tabela da direita atualizada com sucesso!");
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












document.getElementById("end-campaign-button").addEventListener("click", function () {
    const nome = document.getElementById("campaign-name").value;
    const periodo = document.getElementById("campaign-period").value;
    const objetivo = document.getElementById("campaign-goal").value;

    // Captura imagens (como blob temporário para visualização futura)
    const imagens = Array.from(document.getElementById("campaign-images").files).map(file =>
        URL.createObjectURL(file)
    );

    // Captura vídeo (também como blob temporário)
    const videoFile = document.getElementById("video-file").files[0];
    const video = videoFile ? URL.createObjectURL(videoFile) : null;

    // Salva os dados da TABELA ESQUERDA
    const selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    // Salva os dados da TABELA DIREITA
    const rightTableRows = Array.from(document.querySelector(".crypto-panel-table tbody").children);
    const rightTableData = rightTableRows.map(row => {
        const img = row.querySelector("img")?.src || "";
        const simbolo = row.querySelector("img")?.alt || "";
        const redes = Array.from(row.querySelectorAll(".network-option")).map(btn => ({
            nome: btn.textContent,
            endereco: btn.getAttribute("data-endereco")
        }));
        return { simbolo, imagem: img, redes };
    });

    // Monta o objeto da campanha
    const campaignData = {
        nome,
        periodo,
        objetivo,
        imagens,
        video,
        selectedCryptos,
        rightTableData
    };

    // Salva a campanha no localStorage
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];
    campaigns.push(campaignData);
    localStorage.setItem("userCampaigns", JSON.stringify(campaigns));

    // Redireciona para a página de campanhas
    window.location.href = "minhas-campanhas.html";
});

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("data");

    if (data) {
        const campanha = JSON.parse(decodeURIComponent(data));

        // Preencher campos com os dados salvos
        document.getElementById("campaign-name").value = campanha.nome;
        document.getElementById("campaign-period").value = campanha.periodo;
        document.getElementById("campaign-goal").value = campanha.objetivo;

        // Imagens
        const container = document.getElementById("campaign-images-container");
        campanha.imagens.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.style.width = "100px";
            img.style.margin = "5px";
            container.appendChild(img);
        });

        // Vídeo
        if (campanha.video) {
            document.getElementById("video-player").src = campanha.video;
        }

        // Criptomoedas (lado direito)
        preencherTabelaDireita(campanha.criptos);

        // 🔒 Bloqueia campos se for uma campanha salva
        if (campanha.bloqueado) {
            document.getElementById("campaign-name").setAttribute("disabled", true);
            document.getElementById("campaign-period").setAttribute("disabled", true);
            document.getElementById("campaign-goal").setAttribute("disabled", true);
            document.getElementById("campaign-images").setAttribute("disabled", true);
            document.getElementById("video-file").setAttribute("disabled", true);
            document.querySelector("#crypto-table").classList.add("disabled-table");
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("data");

    if (data) {
        const campanha = JSON.parse(decodeURIComponent(data));

        // Preencher campos com os dados salvos
        document.getElementById("campaign-name").value = campanha.nome;
        document.getElementById("campaign-period").value = campanha.periodo;
        document.getElementById("campaign-goal").value = campanha.objetivo;

        // Imagens
        const container = document.getElementById("campaign-images-container");
        campanha.imagens.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.style.width = "100px";
            img.style.margin = "5px";
            container.appendChild(img);
        });

        // Vídeo
        if (campanha.video) {
            document.getElementById("video-player").src = campanha.video;
        }

        // Criptomoedas (lado direito)
        preencherTabelaDireita(campanha.criptos);

        // 🔒 Bloqueia campos se for uma campanha salva
        if (campanha.bloqueado) {
            document.getElementById("campaign-name").setAttribute("disabled", true);
            document.getElementById("campaign-period").setAttribute("disabled", true);
            document.getElementById("campaign-goal").setAttribute("disabled", true);
            document.getElementById("campaign-images").setAttribute("disabled", true);
            document.getElementById("video-file").setAttribute("disabled", true);
            document.querySelector("#crypto-table").classList.add("disabled-table");
        }
    }
});







