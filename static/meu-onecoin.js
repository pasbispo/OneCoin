document.getElementById("update-button").addEventListener("click", function () {
    let campaignName = document.getElementById("campaign-name").value.trim();
    let campaignPeriod = document.getElementById("campaign-period").value.trim();
    let campaignGoal = document.getElementById("campaign-goal").value.trim();
    let campaignImages = document.getElementById("campaign-images").files[0];
    let campaignVideo = document.getElementById("video-file").files[0];

    if (!campaignName || !campaignPeriod) {
        alert("Preencha todas as informações antes de atualizar!");
        return;
    }

    // ✅ Atualizar a planilha da direita com os dados do lado esquerdo
    document.getElementById("panel-title").textContent = campaignName;
    document.getElementById("panel-duration").textContent = `Período: ${campaignPeriod} dias`;
    document.getElementById("panel-goal").textContent = campaignGoal || "Nenhum objetivo definido.";

    // ✅ Se houver imagem, mostrar na direita
    if (campaignImages) {
        let imageURL = URL.createObjectURL(campaignImages);
        document.getElementById("slideshow-image").src = imageURL;
    }

    // ✅ Se houver vídeo, mostrar na direita
    if (campaignVideo) {
        let videoURL = URL.createObjectURL(campaignVideo);
        document.getElementById("video-player").src = videoURL;
        document.getElementById("video-player").load();
    }

    // ✅ Atualizar a TABELA DE CRIPTOMOEDAS
    let cryptoPanelBody = document.querySelector(".crypto-panel-table tbody");
    cryptoPanelBody.innerHTML = ""; // Limpa a tabela antes de preenchê-la

    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];
    if (selectedCryptos.length === 0) {
        cryptoPanelBody.innerHTML = `<tr><td colspan="4">Nenhuma criptomoeda cadastrada.</td></tr>`;
        return;
    }

    selectedCryptos.forEach(crypto => {
        let row = document.createElement("tr");

        let cellImage = document.createElement("td");
        let cellSymbol = document.createElement("td");
        let cellNetworkButton = document.createElement("td");
        let cellAddress = document.createElement("td");
        let cellCopyButton = document.createElement("td");

        cellImage.innerHTML = `<img src="${crypto.image || 'static/img/default-crypto.png'}" alt="${crypto.name}" width="40">`;
        cellSymbol.textContent = crypto.name || "Criptomoeda desconhecida";
        cellNetworkButton.innerHTML = `<button class="select-network-btn" data-crypto="${crypto.name}">Selecionar Rede</button>`;
        cellAddress.textContent = crypto.selectedAddress || "Selecione uma rede";

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
        row.appendChild(cellSymbol);
        row.appendChild(cellNetworkButton);
        row.appendChild(cellAddress);
        row.appendChild(cellCopyButton);
        cryptoPanelBody.appendChild(row);
    });

    alert("Campanha e tabela de criptomoedas atualizadas!");
});






document.getElementById("update-button").addEventListener("click", function () {
    let campaignImages = document.getElementById("campaign-images").files;
    let imageURLs = [];

    if (campaignImages.length > 0) {
        for (let i = 0; i < campaignImages.length; i++) {
            imageURLs.push(URL.createObjectURL(campaignImages[i]));
        }
    }

    let campaignData = {
        nome: document.getElementById("campaign-name").value.trim(),
        periodo: document.getElementById("campaign-period").value.trim(),
        objetivo: document.getElementById("campaign-goal").value.trim(),
        imagens: imageURLs, // ✅ Agora salva todas as imagens
        video: document.getElementById("video-player").src,
        criptomoedas: []
    };

    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));
    alert("Campanha atualizada e imagens salvas corretamente!");
});
document.addEventListener("DOMContentLoaded", function () {
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign"));

    if (campaignData && campaignData.imagens.length > 0) {
        let slideshowImage = document.getElementById("slideshow-image");
        let imagesArray = campaignData.imagens;
        let imageIndex = 0;

        slideshowImage.src = imagesArray[imageIndex];

        setInterval(() => {
            imageIndex = (imageIndex + 1) % imagesArray.length;
            slideshowImage.src = imagesArray[imageIndex];
        }, 3000); // ✅ Agora alterna entre todas as imagens corretamente
    }
});
document.getElementById("update-button").addEventListener("click", function () {
    let cryptoTableInputs = document.querySelectorAll("#crypto-table input, #crypto-table button");

    cryptoTableInputs.forEach(element => {
        element.setAttribute("disabled", "true"); // ✅ Mantém bloqueado
    });

    alert("Tabela bloqueada! Agora você só pode modificar imagens, objetivo e vídeo.");
});

document.addEventListener("DOMContentLoaded", function () {
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign"));

    if (campaignData) {
        let cryptoPanelBody = document.querySelector(".crypto-panel-table tbody");
        cryptoPanelBody.innerHTML = "";

        campaignData.criptomoedas.forEach(crypto => {
            let row = document.createElement("tr");

            let cellImage = document.createElement("td");
            let cellSymbol = document.createElement("td");
            let cellNetworkButton = document.createElement("td");
            let cellAddress = document.createElement("td");
            let cellCopyButton = document.createElement("td");

            // ✅ Garante que a imagem da criptomoeda aparece corretamente
            cellImage.innerHTML = `<img src="${crypto.imagem}" alt="${crypto.simbolo}" width="40">`;

            cellSymbol.textContent = crypto.simbolo;
            cellAddress.textContent = crypto.endereco || "Selecione uma rede";

            let selectNetworkBtn = document.createElement("button");
            selectNetworkBtn.textContent = "Selecionar Rede";
            selectNetworkBtn.classList.add("select-network-btn");
            selectNetworkBtn.setAttribute("data-crypto", crypto.simbolo);
            cellNetworkButton.appendChild(selectNetworkBtn);

            let copyBtn = document.createElement("button");
            copyBtn.textContent = "Copiar";
            copyBtn.classList.add("copy-btn");
            copyBtn.addEventListener("click", function () {
                navigator.clipboard.writeText(cellAddress.textContent);
                alert("Endereço copiado!");
            });

            cellCopyButton.appendChild(copyBtn);

            row.appendChild(cellImage);
            row.appendChild(cellSymbol);
            row.appendChild(cellNetworkButton);
            row.appendChild(cellAddress);
            row.appendChild(cellCopyButton);

            cryptoPanelBody.appendChild(row);
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign"));
    let cryptoPanelBody = document.querySelector(".crypto-panel-table tbody");

    if (!campaignData || !campaignData.criptomoedas || campaignData.criptomoedas.length === 0) {
        console.warn("Nenhuma campanha ativa encontrada ou sem criptomoedas!");
        cryptoPanelBody.innerHTML = `<tr><td colspan="4">Nenhuma criptomoeda cadastrada.</td></tr>`;
        return;
    }

    // ✅ Garante que os dados da campanha sejam carregados corretamente
    document.getElementById("campaign-name").value = campaignData.nome;
    document.getElementById("campaign-period").value = campaignData.periodo;
    document.getElementById("panel-title").textContent = campaignData.nome;
    document.getElementById("panel-duration").textContent = `Período: ${campaignData.periodo} dias`;
    document.getElementById("panel-goal").textContent = "Objetivo: " + campaignData.objetivo;
    document.getElementById("slideshow-image").src = campaignData.imagens || "static/img/default.jpg";
    document.getElementById("video-player").src = campaignData.video || "";
    document.getElementById("video-player").load();

    cryptoPanelBody.innerHTML = ""; // ✅ Só limpa a tabela quando há dados

    campaignData.criptomoedas.forEach(crypto => {
        let row = document.createElement("tr");

        let cellImage = document.createElement("td");
        let cellSymbol = document.createElement("td");
        let cellNetworkButton = document.createElement("td");
        let cellAddress = document.createElement("td");
        let cellCopyButton = document.createElement("td");

        // ✅ Garante que a imagem da criptomoeda aparece corretamente
        cellImage.innerHTML = `<img src="${crypto.imagem || 'static/img/default-crypto.png'}" alt="${crypto.simbolo}" width="40">`;

        cellSymbol.textContent = crypto.simbolo || "Criptomoeda desconhecida";
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
        cellNetworkButton.appendChild(selectNetworkBtn);

        row.appendChild(cellImage);
        row.appendChild(cellSymbol);
        row.appendChild(cellNetworkButton);
        row.appendChild(cellAddress);
        row.appendChild(cellCopyButton);

        cryptoPanelBody.appendChild(row);
    });

    bloquearCampos(); // ✅ Bloqueia edição dos campos após carregamento correto
});


function bloquearCampos() {
    // ✅ Bloqueia os campos da campanha salva
    document.getElementById("campaign-name").setAttribute("disabled", "true");
    document.getElementById("campaign-period").setAttribute("disabled", "true");

    document.querySelectorAll("#crypto-table input, #crypto-table textarea, #crypto-table button:not(.select-network-btn)").forEach(element => {
        element.setAttribute("disabled", "true");
    });
}



document.getElementById("finalize-button").addEventListener("click", function () {
    let campaignData = {
        nome: document.getElementById("campaign-name").value.trim(),
        periodo: document.getElementById("campaign-period").value.trim(),
        objetivo: document.getElementById("campaign-goal").value.trim(),
        criptomoedas: [] // Adicione criptomoedas se necessário
    };

    fetch("http://localhost:3000/salvar-campanha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignData)
    })
    .then(response => response.json())
    .then(data => alert(data.mensagem))
    .catch(error => console.error("Erro ao salvar:", error));
});


document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/campanhas")
    .then(response => response.json())
    .then(campanhas => {
        if (campanhas.length > 0) {
            let ultimaCampanha = campanhas[campanhas.length - 1]; // Pega a mais recente

            document.getElementById("campaign-name").value = ultimaCampanha.nome;
            document.getElementById("campaign-period").value = ultimaCampanha.periodo;
            document.getElementById("panel-title").textContent = ultimaCampanha.nome;
            document.getElementById("panel-duration").textContent = `Período: ${ultimaCampanha.periodo} dias`;
            document.getElementById("panel-goal").textContent = "Objetivo: " + ultimaCampanha.objetivo;
        }
    })
    .catch(error => console.error("Erro ao carregar campanhas:", error));
});




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

document.getElementById("update-button").addEventListener("click", function() {
    let campaignName = document.getElementById("campaign-name").value;
    let campaignGoal = document.getElementById("campaign-goal").value;
    let campaignPeriod = document.getElementById("campaign-period").value;
    let campaignImages = document.getElementById("campaign-images").files;
    let campaignVideo = document.getElementById("video-file").files[0];

    let panelTitle = document.getElementById("panel-title");
    let panelGoal = document.getElementById("panel-goal");
    let panelDuration = document.getElementById("panel-duration");
    let panelImage = document.getElementById("slideshow-image");
    let videoPlayer = document.getElementById("video-player");
    let cryptoPanelBody = document.querySelector(".crypto-panel-table tbody");

    // 🏆 Atualizando elementos principais da campanha
    panelTitle.textContent = campaignName;
    panelGoal.textContent = "Objetivo: " + campaignGoal;
    panelDuration.textContent = `Período: ${campaignPeriod} dias`;

    // 🏆 Atualizar imagens e vídeo
    if (campaignImages.length > 0) {
        let imageURL = URL.createObjectURL(campaignImages[0]);
        panelImage.src = imageURL;
    }
    if (campaignVideo) {
        let videoURL = URL.createObjectURL(campaignVideo);
        videoPlayer.src = videoURL;
        videoPlayer.load();
    }

    // 🏆 Atualizar TABELA DE CRIPTOMOEDAS
    cryptoPanelBody.innerHTML = ""; // ✅ Limpa a tabela antes de preenchê-la

    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];
    if (selectedCryptos.length === 0) {
        cryptoPanelBody.innerHTML = `<tr><td colspan="4">Nenhuma criptomoeda cadastrada.</td></tr>`;
        return;
    }

    selectedCryptos.forEach(crypto => {
        let row = document.createElement("tr");

        let cellImage = document.createElement("td");
        let cellSymbol = document.createElement("td");
        let cellNetworkButton = document.createElement("td");
        let cellAddress = document.createElement("td");
        let cellCopyButton = document.createElement("td");

        cellImage.innerHTML = `<img src="${crypto.image || 'static/img/default-crypto.png'}" alt="${crypto.name}" width="40">`;
        cellSymbol.textContent = crypto.name || "Criptomoeda desconhecida";
        cellNetworkButton.innerHTML = `<button class="select-network-btn" data-crypto="${crypto.name}">Selecionar Rede</button>`;
        cellAddress.textContent = crypto.selectedAddress || "Selecione uma rede";

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
        row.appendChild(cellSymbol);
        row.appendChild(cellNetworkButton);
        row.appendChild(cellAddress);
        row.appendChild(cellCopyButton);
        cryptoPanelBody.appendChild(row);
    });

    alert("Campanha e tabela de criptomoedas atualizadas!");
});


let cryptoPanelBody = document.querySelector(".crypto-panel-table tbody");
cryptoPanelBody.innerHTML = "";

let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

selectedCryptos.forEach(crypto => {
    let row = document.createElement("tr");

    let cellSymbol = document.createElement("td");
    let cellNetwork = document.createElement("td");
    let cellAddress = document.createElement("td");
    let cellCopyButton = document.createElement("td");

    cellSymbol.textContent = crypto.simbolo || "Criptomoeda desconhecida";
    cellNetwork.textContent = crypto.rede || "Selecione uma rede";
    cellAddress.textContent = crypto.endereco || "Selecione uma rede";

    // ✅ Adicionar botão "Selecionar Rede"
    let selectNetworkBtn = document.createElement("button");
    selectNetworkBtn.textContent = "Selecionar Rede";
    selectNetworkBtn.classList.add("select-network-btn");
    selectNetworkBtn.setAttribute("data-crypto", crypto.simbolo);
    selectNetworkBtn.addEventListener("click", function () {
        abrirSelecaoDeRede(crypto.simbolo, cellAddress);
    });

    // ✅ Adicionar botão "Copiar"
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


 document.getElementById("update-button").addEventListener("click", function () {
    let campaignName = document.getElementById("campaign-name");
    let campaignPeriod = document.getElementById("campaign-period");
    let cryptoTableInputs = document.querySelectorAll("#crypto-table input, #crypto-table button");

    // ✅ Bloqueia os campos do lado esquerdo
    campaignName.setAttribute("disabled", "true");
    campaignPeriod.setAttribute("disabled", "true");

    cryptoTableInputs.forEach(element => {
        element.setAttribute("disabled", "true"); // ✅ Bloqueia a tabela de criptomoedas
    });

    alert("Campanha bloqueada! Agora você só pode editar imagens, objetivo e vídeo.");
});




document.addEventListener("DOMContentLoaded", function() {
    let updateButton = document.getElementById("update-button");

    if (updateButton) {  // ✅ Garante que o elemento existe antes de adicionar o evento
        updateButton.addEventListener("click", function() {
            console.log("Botão clicado!");
        });
    } else {
        console.error("Erro: O elemento 'update-button' não foi encontrado!");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    let params = new URLSearchParams(window.location.search);
    let campaignName = params.get("campanha");

    if (campaignName) {
        document.getElementById("crypto-panel-table").textContent = decodeURIComponent(campaignName);
    } else {
        document.getElementById("crypto-panel-table").textContent = "Nova campanha!";
    }

    // ✅ Garante que a tabela de criptomoedas seja carregada
    carregarTabelaCriptomoedas();
});




function updateCampaignData(campaignWrapper) {
    let campaign = campaignWrapper.querySelector(".container");

    let campaignName = campaign.querySelector("input[type='text']").value;
    let campaignGoal = campaign.querySelector("textarea").value;
    let campaignPeriod = campaign.querySelector("input[type='number']").value;
    let campaignImages = campaign.querySelector("input[type='file']").files;
    let campaignVideo = campaign.querySelector("input[type='file']").files[0];

    let panelTitle = campaignWrapper.querySelector(".panel-title");
    let panelGoal = campaignWrapper.querySelector(".panel-goal");
    let panelDuration = campaignWrapper.querySelector(".panel-duration");
    let panelImage = campaignWrapper.querySelector(".slideshow-image");
    let videoPlayer = campaignWrapper.querySelector(".video-player");

    panelTitle.textContent = campaignName;
    panelGoal.textContent = "Objetivo: " + campaignGoal;
    panelDuration.textContent = `Período: ${campaignPeriod} dias`;

    if (campaignImages.length > 0) {
        let imageURL = URL.createObjectURL(campaignImages[0]);
        panelImage.src = imageURL;
    }

    if (campaignVideo) {
        let videoURL = URL.createObjectURL(campaignVideo);
        videoPlayer.src = videoURL;
        videoPlayer.load();
    }

    

    alert(`Campanha "${campaignName}" foi atualizada!`);
}







function finalizarCampanha(campaignWrapper) {
    let confirmFinalize = confirm("Após finalizar, você só poderá modificar imagens, objetivo e vídeo. Deseja continuar?");
    
    if (confirmFinalize) {
        let campaign = campaignWrapper;

        let campaignName = campaign.querySelector("input[type='text']");
        let campaignPeriod = campaign.querySelector("input[type='number']");
        let cryptoTable = campaign.querySelector("#crypto-table");

        if (campaignName) campaignName.setAttribute("disabled", "true");
        if (campaignPeriod) campaignPeriod.setAttribute("disabled", "true");

        campaign.querySelectorAll("#crypto-table input, #crypto-table textarea, #crypto-table button").forEach(element => {
            element.setAttribute("disabled", "true");
        });

        if (cryptoTable) cryptoTable.style.pointerEvents = "none";

        // ✅ Apenas imagem, objetivo e vídeo permanecem editáveis
        let campaignImages = campaign.querySelector("#campaign-images");
        let campaignGoal = campaign.querySelector("#campaign-goal");
        let campaignVideo = campaign.querySelector("#video-file");

        if (campaignImages) campaignImages.removeAttribute("disabled");
        if (campaignGoal) campaignGoal.removeAttribute("disabled");
        if (campaignVideo) campaignVideo.removeAttribute("disabled");

        alert("Campanha finalizada! Agora você só pode editar imagens, objetivo e vídeo.");
    }
}








// 🚀 Executa automaticamente ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    let cryptoName = localStorage.getItem("selectedCrypto");
    let cryptoQuantity = localStorage.getItem("cryptoQuantity");
    let estimatedValue = localStorage.getItem("estimatedValue");
    let cryptoImage = localStorage.getItem("cryptoImage");

    if (cryptoName && cryptoQuantity && estimatedValue && cryptoImage) {
        let cryptoNameElem = document.getElementById("crypto-name");
        let cryptoQuantityElem = document.getElementById("crypto-quantity");
        let cryptoValueElem = document.getElementById("crypto-value");
        let cryptoImageElem = document.getElementById("crypto-image");

        if (cryptoNameElem) cryptoNameElem.textContent = cryptoName;
        if (cryptoQuantityElem) cryptoQuantityElem.textContent = cryptoQuantity;
        if (cryptoValueElem) cryptoValueElem.textContent = estimatedValue;
        if (cryptoImageElem) cryptoImageElem.src = cryptoImage;
    } else {
        console.error("Erro: Dados da criptomoeda não encontrados.");
    }
});







document.getElementById("update-button").addEventListener("click", function() {
    let cryptoName = document.getElementById("crypto-name").textContent;
    let cryptoQuantity = document.getElementById("crypto-quantity").textContent;
    let estimatedValue = document.getElementById("crypto-value").textContent;
    let cryptoImage = document.getElementById("crypto-image").src;

    if (cryptoName && cryptoQuantity && estimatedValue && cryptoImage) {
        localStorage.setItem("selectedCrypto", cryptoName);
        localStorage.setItem("cryptoQuantity", cryptoQuantity);
        localStorage.setItem("estimatedValue", estimatedValue);
        localStorage.setItem("cryptoImage", cryptoImage);
    } else {
        console.error("Erro: Dados da criptomoeda não foram definidos corretamente.");
    }
});







document.getElementById("campaign-goal").addEventListener("input", function() {
    let maxLength = 544;  // ✅ Define o limite
    let currentLength = this.value.length;

    if (currentLength > maxLength) {
        this.value = this.value.substring(0, maxLength); // ✅ Corta o texto para 544 caracteres
    }
});



function previewCampaignImage() {
    let imageInput = document.getElementById("campaign-image");
    let panelImage = document.getElementById("panel-image");

    if (imageInput.files.length > 0) {
        let imageUrl = URL.createObjectURL(imageInput.files[0]);
        panelImage.src = imageUrl;
    }
}




let imageIndex = 0;
let imagesArray = [];

function startSlideshow() {
    let imageInput = document.getElementById("campaign-images");
    let slideshowImage = document.getElementById("slideshow-image");

    if (imageInput.files.length > 0) {
        imagesArray = Array.from(imageInput.files).map(file => URL.createObjectURL(file));
        imageIndex = 0;

        // Inicia o slideshow corretamente
        slideshowImage.src = imagesArray[imageIndex];

        setInterval(() => {
            imageIndex = (imageIndex + 1) % imagesArray.length;
            slideshowImage.src = imagesArray[imageIndex];
        }, 3000); // Troca de imagem a cada 3 segundos
    } else {
        console.error("Nenhuma imagem foi carregada.");
    }
}


function playVideo() {
    let videoInput = document.getElementById("video-file");
    let videoPlayer = document.getElementById("video-player");

    if (videoInput.files.length > 0) {
        let videoUrl = URL.createObjectURL(videoInput.files[0]);
        videoPlayer.src = videoUrl;
        videoPlayer.load(); // ✅ Certifica que o vídeo será carregado corretamente
    }
}


function expandVideo() {
    let videoContainer = document.querySelector(".video-container");
    let videoPlayer = document.getElementById("video-player");

    videoContainer.classList.toggle("expanded");

    if (videoContainer.classList.contains("expanded")) {
        videoPlayer.play(); // ✅ O vídeo começa a tocar automaticamente ao expandir
    } else {
        videoPlayer.pause(); // ✅ Se minimizar, o vídeo pausa
    }
}


function updatePeriod() {
    let campaignPeriod = document.getElementById("campaign-period");
    let panelDuration = document.getElementById("panel-duration");

    if (campaignPeriod && panelDuration) {
        panelDuration.textContent = `Período: ${campaignPeriod.value} dias`;
    } else {
        console.error("Erro: Elementos não encontrados!");
    }
}




function updatePeriod() {
    let periodInput = document.getElementById("campaign-period").value;
    let panelDuration = document.getElementById("panel-duration");

    // Converte o período para número
    let totalDays = parseInt(periodInput, 10);

    if (!isNaN(totalDays) && totalDays > 0) {
        panelDuration.textContent = `Período: ${totalDays} dias`;

        // Define o limite de 20% do tempo
        let threshold = Math.floor(totalDays * 0.2);

        // 🟥 Se faltar menos de 20% do tempo, fica vermelho
        if (totalDays <= threshold) {
            panelDuration.style.color = "red";
        } else {
            panelDuration.style.color = "green";
        }
    }
}




function updatePeriodAutomatically() {
    let totalDays = localStorage.getItem("campaign-period");
    let panelDuration = document.getElementById("panel-duration");

    if (!totalDays || isNaN(totalDays)) return;

    totalDays = parseInt(totalDays, 10);

    // Obtém a data inicial (ou define hoje como início)
    let startDate = localStorage.getItem("campaign-start-date");
    if (!startDate) {
        startDate = new Date().toISOString().split("T")[0]; // ✅ Salva a data de hoje
        localStorage.setItem("campaign-start-date", startDate);
    }

    // Calcula dias restantes corretamente
    let today = new Date();
    let start = new Date(startDate);
    let daysElapsed = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    let remainingDays = Math.max(totalDays - daysElapsed, 0); // ✅ Evita valores negativos

    // 🟥 Ajusta a cor corretamente e exibe "Encerrado" quando acabar
    if (remainingDays > 0) {
        panelDuration.textContent = `Período: ${remainingDays} dias`;
        panelDuration.style.color = remainingDays <= Math.floor(totalDays * 0.2) ? "red" : "green";
    } else {
        panelDuration.textContent = "Período: Encerrado!";
        panelDuration.style.color = "red";
    }
}

// 🚀 Garante que a função seja executada ao carregar a página
document.addEventListener("DOMContentLoaded", updatePeriodAutomatically);


document.addEventListener("DOMContentLoaded", function() {
    let cryptoTableBody = document.querySelector("#crypto-table tbody");

    // ✅ Limpa a tabela antes de preenchê-la
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

        cellSymbol.innerHTML = `<img src="${crypto.image}" alt="${crypto.name}" width="40"> ${crypto.name}`;
        cellQuantity.textContent = crypto.quantity;
        cellValue.textContent = crypto.estimatedValue;

        // ✅ Botão "Redes" (verde)
        let networkBtn = document.createElement("button");
        networkBtn.textContent = "Redes";
        networkBtn.classList.add("network-btn");
        networkBtn.setAttribute("data-crypto", crypto.name);

        // ✅ Botão "Excluir" (vermelho)
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Excluir";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            row.remove();
            updateLocalStorage(crypto.name);
        });

        cellActions.appendChild(networkBtn);
        cellActions.appendChild(deleteBtn);

        row.appendChild(cellSymbol);
        row.appendChild(cellQuantity);
        row.appendChild(cellValue);
        row.appendChild(cellActions);

        cryptoTableBody.appendChild(row);
    });

    // ✅ Adiciona evento ao botão "Redes"
    document.querySelectorAll(".network-btn").forEach(button => {
        button.addEventListener("click", function() {
            let cryptoName = this.getAttribute("data-crypto");
            openNetworkModal(cryptoName);
        });
    });
});



// ✅ Função para abrir o modal de redes
function openNetworkModal(cryptoName) {
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let networkForm = document.createElement("div");
    networkForm.innerHTML = `
        <h3>Digite as Redes e seus Endereços para ${cryptoName}</h3>
        <table>
            <tr><th>Rede</th><th>Endereço</th></tr>
            <tr>
                <td><input type="text" class="network-input" placeholder="Digite a Rede 1"></td>
                <td><input type="text" class="address-input" placeholder="Digite o Endereço 1"></td>
            </tr>
            <tr>
                <td><input type="text" class="network-input" placeholder="Digite a Rede 2"></td>
                <td><input type="text" class="address-input" placeholder="Digite o Endereço 2"></td>
            </tr>
            <tr>
                <td><input type="text" class="network-input" placeholder="Digite a Rede 3"></td>
                <td><input type="text" class="address-input" placeholder="Digite o Endereço 3"></td>
            </tr>
        </table>
        <button class="save-btn">Salvar</button>
        <button class="close-btn">Fechar</button>
    `;

    networkForm.querySelector(".save-btn").addEventListener("click", function() {
        let networks = document.querySelectorAll(".network-input");
        let addresses = document.querySelectorAll(".address-input");

        let networkData = [];
        for (let i = 0; i < networks.length; i++) {
            let network = networks[i].value.trim();
            let address = addresses[i].value.trim();

            if (!network || !address) {
                alert("Preencha todas as redes e endereços!");
                return;
            }

            networkData.push({ rede: network, endereco: address });
        }

        let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];
        let crypto = selectedCryptos.find(c => c.name === cryptoName);
        if (crypto) {
            crypto.networks = networkData.map(n => n.rede);
            crypto.addresses = networkData.map(n => n.endereco);
            localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
        }

        modal.remove();
    });

    networkForm.querySelector(".close-btn").addEventListener("click", function() {
        modal.remove();
    });

    modal.appendChild(networkForm);
    document.body.appendChild(modal);
}


// ✅ Função para remover criptomoeda do `localStorage`
function updateLocalStorage(cryptoName) {
    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];
    
    selectedCryptos = selectedCryptos.map(crypto => {
        if (crypto.name === cryptoName) {
            return { ...crypto, updated: Date.now() }; // ✅ Mantém os dados e só marca atualização
        }
        return crypto;
    });

    localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
}






document.getElementById("update-button").addEventListener("click", function() {
    transferirDadosTabela(); // ✅ Agora os dados só são lançados após clicar "Atualizar"
});

function transferirDadosTabela() {
    let cryptoPanelBody = document.querySelector(".crypto-panel-table tbody");

    // ✅ Limpa a tabela antes de preenchê-la
    cryptoPanelBody.innerHTML = ""; 

    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    if (selectedCryptos.length === 0) {
        console.warn("Nenhuma criptomoeda encontrada no localStorage.");
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

        // ✅ Adiciona botão "Selecionar Rede"
        let selectNetworkBtn = document.createElement("button");
        selectNetworkBtn.textContent = "Selecionar Rede";
        selectNetworkBtn.classList.add("select-network-btn");
        selectNetworkBtn.setAttribute("data-crypto", crypto.name);
        cellNetworkButton.appendChild(selectNetworkBtn);

        // ✅ Espaço para exibir o endereço da rede selecionada
        cellAddress.textContent = "Selecione uma rede";

        // ✅ Adiciona botão "Copiar"
        let copyBtn = document.createElement("button");
        copyBtn.textContent = "Copiar";
        copyBtn.classList.add("copy-btn");
        copyBtn.addEventListener("click", function() {
            navigator.clipboard.writeText(cellAddress.textContent);
            alert("Endereço copiado!");
        });
        cellCopyButton.appendChild(copyBtn);

        row.appendChild(cellImage);
        row.appendChild(cellNetworkButton);
        row.appendChild(cellAddress);
        row.appendChild(cellCopyButton);

        cryptoPanelBody.appendChild(row);
    });

    // ✅ Adiciona eventos para abrir o modal das redes
    document.querySelectorAll(".select-network-btn").forEach(button => {
        button.addEventListener("click", function() {
            let cryptoName = this.getAttribute("data-crypto");
            abrirSelecaoDeRede(cryptoName, this.parentElement.nextElementSibling);
        });
    });
}

   







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




