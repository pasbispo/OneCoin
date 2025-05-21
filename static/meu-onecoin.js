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
    let cryptoTable = document.getElementById("crypto-table");

    // 🔹 Obtém os dados armazenados na página escolher-criptomoedas.html
    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    if (selectedCryptos.length === 0) {
        console.warn("Nenhuma criptomoeda selecionada.");
        return;
    }

    selectedCryptos.forEach(crypto => {
        let row = cryptoTable.insertRow();
        
        let cellSymbol = row.insertCell(0);
        let cellQuantity = row.insertCell(1);
        let cellValue = row.insertCell(2);
        let cellNetworks = row.insertCell(3);

        cellSymbol.innerHTML = `<img src="${crypto.image}" alt="${crypto.name}" width="40">`;
        cellQuantity.textContent = crypto.quantity;
        cellValue.textContent = crypto.estimatedValue;
        cellNetworks.innerHTML = `<button class="network-btn" data-crypto="${crypto.name}">Redes</button>`;
    });

    // 🔹 Adiciona evento para abrir a tabela de redes ao clicar no botão
    document.querySelectorAll(".network-btn").forEach(button => {
        button.addEventListener("click", function() {
            let cryptoName = this.getAttribute("data-crypto");
            openNetworkTable(cryptoName);
        });
    });
});

// 🔹 Função para abrir a tabela de redes corretamente
function openNetworkTable(cryptoName) {
    let networkTable = document.createElement("table");
    networkTable.innerHTML = `
        <tr>
            <th>Rede</th>
            <th>Endereço</th>
        </tr>
        <tr><td>Ethereum</td><td>0x123abc...</td></tr>
        <tr><td>Binance Smart Chain</td><td>0x456def...</td></tr>
        <tr><td>Polygon</td><td>0x789ghi...</td></tr>
        <tr><td>Solana</td><td>0xabc123...</td></tr>
        <tr><td>Cardano</td><td>0xdef456...</td></tr>
    `;

    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.appendChild(networkTable);
    document.body.appendChild(modal);

    // 🔹 Fecha a tabela ao clicar fora
    modal.addEventListener("click", function() {
        modal.remove();
    });
}
