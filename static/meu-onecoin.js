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




function updatePeriod() {
    let periodInput = document.getElementById("campaign-period").value;
    let panelDuration = document.getElementById("panel-duration");

    // Converte o período para número
    let totalDays = parseInt(periodInput, 10);

    if (!isNaN(totalDays) && totalDays > 0) {
        panelDuration.textContent = totalDays + " dias";
        
        // Calcula 20% do tempo total
        let threshold = Math.floor(totalDays * 0.2);

        if (totalDays <= threshold && totalDays > 0) {
            panelDuration.style.color = "red"; // 🔴 Faltando menos de 20% do tempo, fica vermelho
        } else {
            panelDuration.style.color = "green"; // 🟢 Ainda dentro do prazo, fica verde
        }

        // Quando o tempo zerar
        if (totalDays <= 0) {
            panelDuration.textContent = "Período: Encerrado!";
            panelDuration.style.color = "red";
        }
    }
}

