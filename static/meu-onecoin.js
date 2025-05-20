document.getElementById("update-button").addEventListener("click", function() {
    document.getElementById("panel-title").textContent = document.getElementById("campaign-name").value;
    document.getElementById("panel-goal").textContent = document.getElementById("campaign-goal").value;
    document.getElementById("panel-duration").textContent = document.getElementById("duration").value;

    let imageInput = document.getElementById("campaign-image");
    if (imageInput.files.length > 0) {
        let imageUrl = URL.createObjectURL(imageInput.files[0]);
        document.getElementById("panel-image").src = imageUrl;
    }
});



document.addEventListener("DOMContentLoaded", function() {
    let cryptoName = localStorage.getItem("selectedCrypto");
    let cryptoQuantity = localStorage.getItem("cryptoQuantity");
    let estimatedValue = localStorage.getItem("estimatedValue");
    let cryptoImage = localStorage.getItem("cryptoImage");

    if (cryptoName && cryptoQuantity && estimatedValue && cryptoImage) {
        document.getElementById("crypto-name").textContent = cryptoName;
        document.getElementById("crypto-quantity").textContent = cryptoQuantity;
        document.getElementById("crypto-value").textContent = estimatedValue;
        document.getElementById("crypto-image").src = cryptoImage;
    } else {
        console.error("Erro: Dados da criptomoeda não encontrados.");
    }
});
















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
        
        // ✅ Adicionamos um pequeno atraso para garantir que a cor seja aplicada corretamente
        setTimeout(() => {
            panelDuration.style.color = remainingDays > threshold ? "green" : "red";
        }, 50);
        
    } else {
        panelDuration.textContent = "Período: Encerrado!";
        panelDuration.style.color = "red";
    }
}

// 🚀 Executa automaticamente ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(updatePeriodAutomatically, 100); // ✅ Pequeno delay para garantir que o elemento foi atualizado corretamente
});























document.addEventListener("DOMContentLoaded", function() {
    let cryptoTableBody = document.querySelector(".crypto-panel-table tbody");
    let cryptoData = JSON.parse(localStorage.getItem("cryptoList"));

    if (cryptoData && cryptoData.length > 0) {
        cryptoTableBody.innerHTML = ""; // ✅ Limpa a tabela antes de preencher

        cryptoData.forEach(crypto => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td><img src="${crypto.imageSrc}" alt="${crypto.name}"></td>
                <td><button>Selecionar Rede</button></td>
                <td>${crypto.quantity}</td>
                <td>${crypto.value}</td>
            `;

            cryptoTableBody.appendChild(row);
        });
    } else {
        console.error("Erro: Dados da criptomoeda não encontrados.");
    }
});


document.getElementById("update-button").addEventListener("click", function() {
    document.getElementById("panel-title").textContent = document.getElementById("campaign-name").value;
    document.getElementById("panel-goal").textContent = document.getElementById("campaign-goal").value;
    document.getElementById("panel-duration").textContent = document.getElementById("campaign-period").value; // ✅ Correção aqui

    let imageInput = document.getElementById("campaign-image");
    if (imageInput && imageInput.files.length > 0) {
        let imageUrl = URL.createObjectURL(imageInput.files[0]);
        document.getElementById("panel-image").src = imageUrl;
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






