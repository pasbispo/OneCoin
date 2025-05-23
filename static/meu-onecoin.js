

document.getElementById("update-button").addEventListener("click", function() {
    let campaignName = document.getElementById("campaign-name");
    let campaignGoal = document.getElementById("campaign-goal");
    let campaignPeriod = document.getElementById("campaign-period");
    let panelTitle = document.getElementById("panel-title");
    let panelGoal = document.getElementById("panel-goal");
    let panelDuration = document.getElementById("panel-duration");
    let imageInput = document.getElementById("campaign-image");
    let panelImage = document.getElementById("panel-image");

    // Verifica se todos os elementos existem antes de acessar suas propriedades
    if (campaignName && panelTitle) {
        panelTitle.textContent = campaignName.value;
    }

    if (campaignGoal && panelGoal) {
        panelGoal.textContent = campaignGoal.value;
    }

    if (campaignPeriod && panelDuration) {
        panelDuration.textContent = campaignPeriod.value;
    }

    if (imageInput && panelImage && imageInput.files.length > 0) {
        let imageUrl = URL.createObjectURL(imageInput.files[0]);
        panelImage.src = imageUrl;
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
        let cellNetworks = document.createElement("td");

        cellSymbol.innerHTML = `<img src="${crypto.image}" alt="${crypto.name}" width="40">`;
        cellQuantity.textContent = crypto.quantity;
        cellValue.textContent = crypto.estimatedValue;
        cellNetworks.innerHTML = `<button class="network-btn" data-crypto="${crypto.name}">Redes</button>`;

        row.appendChild(cellSymbol);
        row.appendChild(cellQuantity);
        row.appendChild(cellValue);
        row.appendChild(cellNetworks);

        cryptoTableBody.appendChild(row);
    });

    // ✅ Adiciona evento ao botão "Redes" para abrir a tabela de redes
    document.querySelectorAll(".network-btn").forEach(button => {
        button.addEventListener("click", function() {
            let cryptoName = this.getAttribute("data-crypto");
            openNetworkTable(cryptoName);
        });
    });
});






function openNetworkTable(cryptoName) {
    let modal = document.createElement("div");
    modal.classList.add("modal");

    // ✅ Criar formulário dentro do modal para inserir três redes e endereços
    let networkForm = document.createElement("div");
    networkForm.innerHTML = `
        <h3>Redes de ${cryptoName}</h3>
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

    // ✅ Adiciona evento ao botão "Salvar"
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

        console.log(`Redes e Endereços de ${cryptoName}:`, networkData);
        modal.remove(); // ✅ Fecha o modal após salvar
    });

    // ✅ Adiciona evento ao botão "Fechar"
    networkForm.querySelector(".close-btn").addEventListener("click", function() {
        modal.remove(); // ✅ Fecha o modal ao clicar no botão "Fechar"
    });

    modal.appendChild(networkForm);
    document.body.appendChild(modal);

    // ✅ Fechar o modal ao clicar fora
    modal.addEventListener("click", function(e) {
        if (e.target === modal) modal.remove();
    });
}






document.addEventListener("DOMContentLoaded", async function() {
    let cryptoTableBody = document.querySelector("#crypto-table tbody");

    // ✅ Limpa a tabela antes de preenchê-la
    cryptoTableBody.innerHTML = ""; 

    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    if (selectedCryptos.length === 0) {
        console.warn("Nenhuma criptomoeda encontrada no localStorage.");
        return;
    }

    for (let crypto of selectedCryptos) {
        let price = await getCryptoPrice(crypto.name);
        crypto.estimatedValue = price ? (crypto.quantity * price).toFixed(2) + " USD" : "Erro na cotação";

        let row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${crypto.image}" alt="${crypto.name}" width="40"> ${crypto.name}</td>
            <td>${crypto.quantity}</td>
            <td>${crypto.estimatedValue}</td>
            <td>
                <button class="network-btn" data-crypto="${crypto.name}">Redes</button>
                <button class="delete-btn">Excluir</button>
            </td>
        `;

        // ✅ Adiciona evento ao botão "Excluir"
        row.querySelector(".delete-btn").addEventListener("click", function() {
            row.remove();
            updateLocalStorage(crypto.name);
        });

        // ✅ Adiciona evento ao botão "Redes" para abrir o modal
        row.querySelector(".network-btn").addEventListener("click", function() {
            let cryptoName = this.getAttribute("data-crypto");
            openNetworkTable(cryptoName);
        });

        cryptoTableBody.appendChild(row);
    }
});

// ✅ Função para remover do localStorage ao excluir uma criptomoeda da tabela
function updateLocalStorage(cryptoName) {
    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];
    selectedCryptos = selectedCryptos.filter(crypto => crypto.name !== cryptoName);
    localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
}










document.addEventListener("DOMContentLoaded", function() {
    let cryptoNetworkBody = document.querySelector("#crypto-network-table tbody");

    // ✅ Limpa a tabela antes de preenchê-la
    cryptoNetworkBody.innerHTML = ""; 

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

        // ✅ Adiciona botão "Redes"
        let networkBtn = document.createElement("button");
        networkBtn.textContent = "Redes";
        networkBtn.classList.add("network-btn");
        networkBtn.setAttribute("data-crypto", crypto.name);
        cellNetworkButton.appendChild(networkBtn);

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

        cryptoNetworkBody.appendChild(row);
    });

    // ✅ Adiciona eventos para abrir o modal das redes
    document.querySelectorAll(".network-btn").forEach(button => {
        button.addEventListener("click", function() {
            let cryptoName = this.getAttribute("data-crypto");
            openNetworkTable(cryptoName, this.parentElement.nextElementSibling);
        });
    });
});



