
document.getElementById("finalize-button").addEventListener("click", function() {
    let confirmFinalize = confirm("Após finalizar, você só poderá modificar imagens, objetivo e vídeo. Deseja continuar?");
    
    if (confirmFinalize) {
        let campaignName = document.getElementById("campaign-name");
        let campaignPeriod = document.getElementById("campaign-period");
        let cryptoTable = document.getElementById("crypto-table");

        if (campaignName) campaignName.setAttribute("disabled", "true");
        if (campaignPeriod) campaignPeriod.setAttribute("disabled", "true");

        document.querySelectorAll("#crypto-table input, #crypto-table textarea, #crypto-table button").forEach(element => {
            element.setAttribute("disabled", "true");
        });

        if (cryptoTable) cryptoTable.style.pointerEvents = "none";

        // 🔥 Salvar estado finalizado no localStorage
        localStorage.setItem("campaignFinalized", "true");

        alert("Campanha finalizada! Agora você só pode editar imagens, objetivo e vídeo.");
    } else {
        alert("Você ainda pode modificar tudo antes de finalizar.");
    }
});
document.addEventListener("DOMContentLoaded", function() {
    let isFinalized = localStorage.getItem("campaignFinalized");

    if (isFinalized === "true") {
        let campaignName = document.getElementById("campaign-name");
        let campaignPeriod = document.getElementById("campaign-period");
        let cryptoTable = document.getElementById("crypto-table");

        if (campaignName) campaignName.setAttribute("disabled", "true");
        if (campaignPeriod) campaignPeriod.setAttribute("disabled", "true");

        document.querySelectorAll("#crypto-table input, #crypto-table textarea, #crypto-table button").forEach(element => {
            element.setAttribute("disabled", "true");
        });

        if (cryptoTable) cryptoTable.style.pointerEvents = "none";

        console.log("Campanha bloqueada após recarregar a página.");
    }
});

document.getElementById("delete-campaign-button").addEventListener("click", function() {
    localStorage.removeItem("campaignFinalized"); // 🔥 Limpar estado finalizado
    location.reload(); // 🔄 Recarregar a página para restaurar a edição
});








document.getElementById("new-campaign-button").addEventListener("click", function() {
    let campaignsContainer = document.getElementById("campaigns-container"); // 🏆 Local onde novas campanhas serão adicionadas
    let originalCampaign = document.querySelector(".container"); // 🏆 Captura toda a campanha original

    if (campaignsContainer && originalCampaign) {
        let newCampaignWrapper = document.createElement("div"); // 🏆 Criando um contêiner para a nova campanha
        newCampaignWrapper.classList.add("campaign-wrapper"); // 🏆 Classe para manter a estrutura intacta

        let newCampaign = originalCampaign.cloneNode(true); // 🔥 Clona toda a estrutura da campanha

        // 🔄 Remove IDs duplicados para evitar conflitos
        newCampaign.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));

        // 🔄 Limpa os valores anteriores para que o usuário possa preencher
        newCampaign.querySelectorAll("input, textarea").forEach(el => el.value = "");
        newCampaign.querySelector("img").src = "#";
        newCampaign.querySelector("video").src = "";

        // 🔥 Clona os botões corretamente e os vincula à campanha copiada
        let buttonsContainer = document.querySelector(".button-container").cloneNode(true);
        
        // 🔥 Adiciona evento ao botão "Excluir" para remover apenas aquela campanha
        buttonsContainer.querySelector("#delete-campaign-button").addEventListener("click", function() {
            newCampaignWrapper.remove(); // 🔥 Agora só a campanha clonada e seus botões desaparecem!
        });

        // 🏆 Adiciona uma linha separadora antes da nova campanha
        let divider = document.createElement("hr");
        divider.classList.add("campaign-divider");

        // 🏆 Estrutura correta para manter os botões abaixo das planilhas
        newCampaignWrapper.appendChild(divider);
        newCampaignWrapper.appendChild(newCampaign);
        newCampaignWrapper.appendChild(buttonsContainer);

        campaignsContainer.appendChild(newCampaignWrapper);

        alert("Nova campanha adicionada!");
    } else {
        console.error("Erro: Estrutura de campanha não encontrada!");
    }
});



// 🔄 Função para atualizar a campanha corretamente
function atualizarCampanha(campaign) {
    let campaignName = campaign.querySelector("input[type='text']").value;
    let campaignGoal = campaign.querySelector("textarea").value;
    let campaignPeriod = campaign.querySelector("input[type='number']").value;
    let campaignImages = campaign.querySelector("input[type='file']").files;
    let campaignVideo = campaign.querySelector("input[type='file']").files[0];

    let panelTitle = campaign.querySelector(".panel-title");
    let panelGoal = campaign.querySelector(".panel-goal");
    let panelDuration = campaign.querySelector(".panel-duration");
    let panelImage = campaign.querySelector(".slideshow-image");
    let videoPlayer = campaign.querySelector(".video-player");

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
}

// 🔄 Função para finalizar a campanha corretamente
function finalizarCampanha(campaign) {
    let confirmFinalize = confirm("Após finalizar, você só poderá modificar imagens, objetivo e vídeo. Deseja continuar?");
    
    if (confirmFinalize) {
        campaign.querySelector("input[type='text']").setAttribute("disabled", "true");
        campaign.querySelector("input[type='number']").setAttribute("disabled", "true");

        campaign.querySelectorAll("#crypto-table input, #crypto-table textarea, #crypto-table button").forEach(element => {
            element.setAttribute("disabled", "true");
        });

        campaign.querySelector("#crypto-table").style.pointerEvents = "none";

        alert("Campanha finalizada! Agora você só pode editar imagens, objetivo e vídeo.");
    }
}











document.getElementById("finalize-button").addEventListener("click", function() {
    let confirmFinalize = confirm("Após finalizar, você só poderá modificar imagens, objetivo e vídeo. Deseja continuar?");
    
    if (confirmFinalize) {
        let campaignName = document.getElementById("campaign-name");
        let campaignPeriod = document.getElementById("campaign-period");
        let cryptoTable = document.getElementById("crypto-table");

        if (campaignName) campaignName.setAttribute("disabled", "true");
        if (campaignPeriod) campaignPeriod.setAttribute("disabled", "true");

        document.querySelectorAll("#crypto-table input, #crypto-table textarea, #crypto-table button").forEach(element => {
            element.setAttribute("disabled", "true");
        });

        if (cryptoTable) cryptoTable.style.pointerEvents = "none"; // 🔒 Bloqueia interações com a tabela

        alert("Campanha finalizada! Agora você só pode editar imagens, objetivo e vídeo.");
    } else {
        alert("Você ainda pode modificar tudo antes de finalizar.");
    }
});



document.addEventListener("DOMContentLoaded", function() {
    let campaignName = document.getElementById("campaign-name");

    if (campaignName) {
        campaignName.value = "Nova campanha!";
    } else {
        console.error("Erro: O elemento 'campaign-name' não foi encontrado!");
    }
});












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





document.getElementById("new-campaign-button").addEventListener("click", function() {
    alert("Nova Campanha será adicionada!");
    // A funcionalidade real será implementada no próximo passo
});

document.getElementById("delete-campaign-button").addEventListener("click", function() {
    alert("Excluindo campanha...");
    // A lógica de exclusão será definida depois que estruturarmos as campanhas corretamente
});




