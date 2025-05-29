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
    let campaignList = document.getElementById("menu-my");
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    if (campaigns.length > 0) {
        let dropdown = document.createElement("div");
        dropdown.classList.add("dropdown-menu");

        campaigns.forEach(campaign => {
            let link = document.createElement("a");
            link.href = campaign.url;
            link.textContent = campaign.nome;
            dropdown.appendChild(link);
        });

        campaignList.appendChild(dropdown);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(window.location.search);
    let campaignName = params.get("campanha");

    if (campaignName) {
        document.getElementById("panel-title").textContent = campaignName;
    } else {
        document.getElementById("panel-title").textContent = "Nova campanha!";
    }
});
























document.getElementById("delete-button").addEventListener("click", function () {
    let confirmDelete = confirm("Tem certeza de que deseja excluir os dados da campanha?");
    
    if (confirmDelete) {
        let campaign = document.querySelector(".container");

        if (!campaign) {
            console.error("Erro: Estrutura da campanha não encontrada!");
            return;
        }

        // ✅ Restaurar os campos de entrada, sem limpar a tabela
        campaign.querySelectorAll("input, textarea").forEach(element => {
            element.value = "";
            element.removeAttribute("disabled"); // 🔄 Remove bloqueios nos campos de texto
        });

        campaign.querySelector(".panel-title").textContent = "Nova campanha!";
        campaign.querySelector(".panel-goal").textContent = "Objetivo:";
        campaign.querySelector(".panel-duration").textContent = "Período: Digite o período";

        // ✅ Restaurar eventos dos botões dentro da tabela de criptomoedas
        document.querySelectorAll(".select-network-btn").forEach(button => {
            button.addEventListener("click", function() {
                let cryptoName = this.getAttribute("data-crypto");
                abrirSelecaoDeRede(cryptoName, this.parentElement.nextElementSibling);
            });
        });

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

        alert("Dados da campanha excluídos! Agora você pode continuar editando a tabela.");
    }
});








document.addEventListener("DOMContentLoaded", function () {
    let updateBtn = document.getElementById("update-button");
    let deleteBtn = document.getElementById("delete-button");

    if (updateBtn && deleteBtn) {
        // ✅ Ao carregar a página, o botão "Excluir" NÃO fica desativado
        deleteBtn.removeAttribute("disabled");

        updateBtn.addEventListener("click", function () {
            deleteBtn.removeAttribute("disabled"); // ✅ Mantém ativado após atualização
        });
    } else {
        console.error("Erro: Botões não encontrados.");
    }
});



function excluirDadosCampanha(campaignWrapper) {
    let confirmDelete = confirm("Tem certeza de que deseja excluir todos os dados desta campanha?");
    
    if (confirmDelete) {
        let campaign = campaignWrapper.querySelector(".container");

        if (!campaign) {
            console.error("Erro: Estrutura da campanha não encontrada!");
            return;
        }

        // 🔄 Restaurar valores para o padrão vazio
        campaign.querySelector("input[type='text']").value = "";
        campaign.querySelector("textarea").value = "";
        campaign.querySelector("input[type='number']").value = "";
        campaign.querySelector("input[type='file']").value = "";
        campaign.querySelector(".slideshow-image").src = "#";
        campaign.querySelector(".video-player").src = "";
        campaign.querySelector(".panel-title").textContent = "Nova campanha!";
        campaign.querySelector(".panel-goal").textContent = "Objetivo:";
        campaign.querySelector(".panel-duration").textContent = "Período: 0 dias";

        alert("Todos os dados da campanha foram excluídos!");
    }
}





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

    // ✅ Ativar o botão "Excluir" depois de atualizar
    let deleteBtn = campaignWrapper.querySelector(".btn-secondary");
    if (deleteBtn) {
        deleteBtn.removeAttribute("disabled");
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








document.getElementById("update-button").addEventListener("click", function() {
    // 🏆 Atualizar dados da campanha apenas ao clicar no botão
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

    // 🏆 Atualizando elementos na planilha direita
    panelTitle.textContent = campaignName;
    panelGoal.textContent = "Objetivo: " + campaignGoal;
    panelDuration.textContent = `Período: ${campaignPeriod} dias`;

    // 🏆 Atualizar imagens apenas após o clique no botão
    if (campaignImages.length > 0) {
        let imageURL = URL.createObjectURL(campaignImages[0]);
        panelImage.src = imageURL;
    }

    // 🏆 Atualizar vídeo apenas após o clique no botão
    if (campaignVideo) {
        let videoURL = URL.createObjectURL(campaignVideo);
        videoPlayer.src = videoURL;
        videoPlayer.load();
    }
});


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
    let campaignPeriod = document.getElementById("campaign-period").value;

    if (campaignPeriod) {
        localStorage.setItem("campaign-period", campaignPeriod); // ✅ Salva no localStorage corretamente
        document.getElementById("panel-duration").textContent = `Período: ${campaignPeriod} dias`;
    } else {
        console.error("Erro: O período da campanha não foi definido corretamente.");
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
    selectedCryptos = selectedCryptos.filter(crypto => crypto.name !== cryptoName);
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





document.getElementById("finalize-button").addEventListener("click", function () {
    let campaignWrapper = document.querySelector(".container");

    if (campaignWrapper) {
        finalizarCampanha(campaignWrapper);
    } else {
        console.error("Erro: A campanha ativa não foi encontrada.");
    }
});



