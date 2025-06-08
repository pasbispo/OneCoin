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

















// === BOTÃO FINALIZAR ===
// === BOTÃO FINALIZAR ===
document.getElementById("end-campaign-button").addEventListener("click", async () => {
    const nome = document.getElementById("nome-campanha").value;
    const periodo = document.getElementById("periodo-campanha").value;
    const objetivo = document.getElementById("objetivo-campanha").value;
    const video = document.getElementById("video-campanha").value;

    const imagens = Array.from(document.querySelectorAll(".imagem-dinamica img")).map(img => img.src);

    const tabelaDireita = document.querySelectorAll(".crypto-panel-table tbody tr");
    const criptomoedas = Array.from(tabelaDireita).map(row => {
        const simbolo = row.querySelector("img")?.alt || "";
        const imagem = row.querySelector("img")?.src || "";
        const endereco = row.children[2]?.textContent || "";

        // 🟡 Você pode salvar também as redes, se quiser:
        const redes = []; // ou extrair se já estiverem salvas

        return { simbolo, imagem, enderecoSelecionado: endereco, redes };
    });

    const dadosCampanha = {
        nome,
        periodo,
        objetivo,
        video,
        imagens,
        criptomoedas,
        finalizada: true
    };

    const resposta = await fetch("http://localhost:3000/salvar-campanha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosCampanha)
    });

    const resultado = await resposta.json();
    if (resposta.ok) {
        alert("Campanha salva com sucesso!");
        window.location.href = "minhas-campanhas.html";
    } else {
        alert("Erro ao salvar: " + resultado.error);
    }
});



document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const campanhaId = urlParams.get("campanhaId");

    if (!campanhaId) return;

    try {
        const res = await fetch(`http://localhost:3000/campanhas`);
        const campanhas = await res.json();
        const campanha = campanhas.find(c => c._id === campanhaId);

        if (!campanha) return;

        // Preenche os campos com os dados
        document.getElementById("nome-campanha").value = campanha.nome;
        document.getElementById("periodo-campanha").value = campanha.periodo;
        document.getElementById("objetivo-campanha").value = campanha.objetivo;
        document.getElementById("video-campanha").value = campanha.video;

        campanha.imagens.forEach(src => {
            const container = document.getElementById("imagens-container");
            const img = document.createElement("img");
            img.src = src;
            container.appendChild(img);
        });

        // Tabela da esquerda: você pode reconstruir se quiser

        // Tabela da direita:
        const tbody = document.querySelector(".crypto-panel-table tbody");
        campanha.criptomoedas.forEach(crypto => {
            const row = document.createElement("tr");

            const tdImg = document.createElement("td");
            const img = document.createElement("img");
            img.src = crypto.imagem;
            img.alt = crypto.simbolo;
            img.width = 40;
            tdImg.appendChild(img);
            row.appendChild(tdImg);

            const tdRede = document.createElement("td");
            const btn = document.createElement("button");
            btn.textContent = "Rede";
            const options = document.createElement("div");
            options.style.display = "none";

            (crypto.redes || []).forEach(rede => {
                const op = document.createElement("button");
                op.textContent = rede.nome;
                op.addEventListener("click", () => {
                    tdEndereco.textContent = rede.endereco;
                    selectedEndereco = rede.endereco;
                    options.style.display = "none";
                });
                options.appendChild(op);
            });

            btn.addEventListener("click", () => {
                options.style.display = options.style.display === "none" ? "block" : "none";
            });

            tdRede.appendChild(btn);
            tdRede.appendChild(options);
            row.appendChild(tdRede);

            const tdEndereco = document.createElement("td");
            tdEndereco.textContent = crypto.enderecoSelecionado || "";
            row.appendChild(tdEndereco);

            const tdCopy = document.createElement("td");
            const copyBtn = document.createElement("button");
            copyBtn.textContent = "Copiar";
            copyBtn.addEventListener("click", () => {
                navigator.clipboard.writeText(tdEndereco.textContent);
                alert("Endereço copiado!");
            });
            tdCopy.appendChild(copyBtn);
            row.appendChild(tdCopy);

            tbody.appendChild(row);
        });

    } catch (e) {
        console.error("Erro ao carregar campanha:", e);
    }
});

function preencherTabelaDireitaSalva(dados) {
    const tbody = document.querySelector(".crypto-panel-table tbody");
    tbody.innerHTML = "";

    dados.forEach(cripto => {
        const row = document.createElement("tr");

        // 1. Imagem + símbolo
        const imgCell = document.createElement("td");
        const img = document.createElement("img");
        img.src = cripto.imagem;
        img.alt = cripto.simbolo;
        img.width = 40;
        imgCell.appendChild(img);
        row.appendChild(imgCell);

        // 2. Botões de rede
        const networkCell = document.createElement("td");
        const networkBtn = document.createElement("button");
        networkBtn.textContent = "Rede";
        networkBtn.classList.add("network-select-btn");

        const networkOptions = document.createElement("div");
        networkOptions.classList.add("network-options");
        networkOptions.style.display = "none";

        cripto.redes.forEach(rede => {
            const optionBtn = document.createElement("button");
            optionBtn.textContent = rede.nome;
            optionBtn.setAttribute("data-endereco", rede.endereco);
            optionBtn.addEventListener("click", () => {
                addressCell.textContent = rede.endereco;
                selectedAddress = rede.endereco;
                networkOptions.style.display = "none";
            });
            networkOptions.appendChild(optionBtn);
        });

        networkBtn.addEventListener("click", () => {
            networkOptions.style.display = networkOptions.style.display === "none" ? "block" : "none";
        });

        networkCell.appendChild(networkBtn);
        networkCell.appendChild(networkOptions);
        row.appendChild(networkCell);

        // 3. Endereço selecionado
        const addressCell = document.createElement("td");
        let selectedAddress = cripto.enderecoSelecionado || cripto.redes[0]?.endereco || "";
        addressCell.textContent = selectedAddress;
        row.appendChild(addressCell);

        // 4. Botão copiar
        const copyCell = document.createElement("td");
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
        copyCell.appendChild(copyBtn);
        row.appendChild(copyCell);

        tbody.appendChild(row);
    });
}








