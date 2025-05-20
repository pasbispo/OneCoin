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
        localStorage.setItem("campaign-period", campaignPeriod.value); // ✅ Salva no localStorage
        updatePeriodAutomatically(); // ✅ Atualiza imediatamente após alteração
    } else {
        console.error("Erro: Elementos não encontrados!");
    }
}

function updatePeriodAutomatically() {
    let panelDuration = document.getElementById("panel-duration");
    let periodInput = localStorage.getItem("campaign-period");

    if (!periodInput || isNaN(periodInput)) {
        console.error("Erro: Período não foi salvo corretamente.");
        return;
    }

    let totalDays = parseInt(periodInput, 10);

    // Obtém a data de início
    let startDate = localStorage.getItem("campaign-start-date");
    if (!startDate) {
        startDate = new Date().toISOString().split("T")[0];
        localStorage.setItem("campaign-start-date", startDate);
    }

    // Calcula os dias restantes
    let today = new Date();
    let start = new Date(startDate);
    let daysElapsed = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    let remainingDays = Math.max(totalDays - daysElapsed, 0);

    // 🔹 Atualiza o período e aplica a cor corretamente
    if (remainingDays > 0) {
        panelDuration.textContent = `Período: ${remainingDays} dias`;

        let threshold = Math.floor(totalDays * 0.2);

        setTimeout(() => {
            panelDuration.style.color = remainingDays > threshold ? "#008000" : "#FF0000"; // ✅ Verde acima de 20%, Vermelho abaixo
        }, 100);
    } else {
        panelDuration.textContent = "Período: Encerrado!";
        panelDuration.style.color = "#FF0000"; // 🔴 Campanha encerrada
    }
}

// 🚀 Garante que o período seja atualizado ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(updatePeriodAutomatically, 300);
});


