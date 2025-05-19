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

        // Inicia o slideshow
        slideshowImage.src = imagesArray[imageIndex];
        setInterval(() => {
            imageIndex = (imageIndex + 1) % imagesArray.length;
            slideshowImage.src = imagesArray[imageIndex];
        }, 3000); // Troca de imagem a cada 3 segundos
    }
}





function playLocalVideo() {
    let videoInput = document.getElementById("video-file");
    let localVideo = document.getElementById("local-video");
    let onlineVideo = document.getElementById("online-video");

    if (videoInput.files.length > 0) {
        let videoUrl = URL.createObjectURL(videoInput.files[0]);
        localVideo.src = videoUrl;
        localVideo.style.display = "block";
        onlineVideo.style.display = "none"; // Oculta o vídeo online se um arquivo for carregado
    }
}

function playOnlineVideo() {
    let videoUrl = document.getElementById("video-link").value;
    let onlineVideo = document.getElementById("online-video");
    let localVideo = document.getElementById("local-video");

    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") || videoUrl.includes("vimeo.com")) {
        let embedUrl = videoUrl.replace("watch?v=", "embed/");
        onlineVideo.src = embedUrl;
        onlineVideo.style.display = "block";
        localVideo.style.display = "none"; // Oculta o vídeo local se um link for inserido
    } else {
        alert("Insira um link válido do YouTube ou Vimeo!");
    }
}



