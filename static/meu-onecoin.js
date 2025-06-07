document.getElementById("update-button").addEventListener("click", function () {
    let campaignName = document.getElementById("campaign-name").value.trim();
    let campaignPeriod = parseInt(document.getElementById("campaign-period").value.trim());
    let campaignGoal = document.getElementById("campaign-goal").value.trim();
    let campaignImagesInput = document.getElementById("campaign-images");
    let campaignVideoInput = document.getElementById("video-file");

    if (!campaignName) {
        alert("Digite um nome para a campanha!");
        return;
    }

    if (isNaN(campaignPeriod) || campaignPeriod < 1 || campaignPeriod > 365) {
        alert("O período deve estar entre 1 e 365 dias!");
        return;
    }

    if (campaignGoal.length > 565) {
        alert("O objetivo da campanha não pode exceder 565 caracteres!");
        return;
    }

    if (campaignImagesInput.files.length === 0) {
        alert("Selecione pelo menos uma imagem da campanha!");
        return;
    }

    if (campaignVideoInput.files.length === 0) {
        alert("Selecione um vídeo para a campanha!");
        return;
    }

    // Atualiza o painel direito
    document.getElementById("panel-title").textContent = campaignName;
    document.getElementById("panel-duration").textContent = campaignPeriod;
    document.getElementById("panel-goal").textContent = campaignGoal;

    // Imagens - inicia slideshow
    let campaignImages = [];
    let imageContainer = document.getElementById("campaign-images-container");
    imageContainer.innerHTML = "";

    for (let i = 0; i < campaignImagesInput.files.length; i++) {
        let imageURL = URL.createObjectURL(campaignImagesInput.files[i]);
        campaignImages.push(imageURL);

        let img = document.createElement("img");
        img.src = imageURL;
        img.classList.add("campaign-image");
        img.style.display = i === 0 ? "block" : "none";
        imageContainer.appendChild(img);
    }

    startSlideshow();

    // Vídeo
    let videoURL = URL.createObjectURL(campaignVideoInput.files[0]);
    let videoPlayer = document.getElementById("video-player");
    videoPlayer.src = videoURL;
    videoPlayer.style.display = "block";

    // Criptomoedas - lê da tabela da esquerda
    let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    // Atualiza painel da direita
    const tbodyPainel = document.querySelector(".crypto-panel-table tbody");
    tbodyPainel.innerHTML = "";
    selectedCryptos.forEach((crypto) => {
        if (!crypto.redes) return;

        const row = document.createElement("tr");

        const tdImagem = document.createElement("td");
        const img = document.createElement("img");
        img.src = crypto.imagem;
        img.alt = crypto.simbolo;
        img.width = 40;
        tdImagem.appendChild(img);

        const tdRede = document.createElement("td");
        const btnRede = document.createElement("button");
        btnRede.textContent = "Rede";
        const containerRedes = document.createElement("div");
        containerRedes.style.display = "none";
        containerRedes.style.marginTop = "5px";

        const tdEndereco = document.createElement("td");
        tdEndereco.textContent = "";

        crypto.redes.forEach((rede) => {
            if (rede.nome && rede.endereco) {
                const redeBtn = document.createElement("button");
                redeBtn.textContent = rede.nome;
                redeBtn.style.marginRight = "5px";
                redeBtn.onclick = () => {
                    tdEndereco.textContent = rede.endereco;
                };
                containerRedes.appendChild(redeBtn);
            }
        });

        btnRede.onclick = () => {
            containerRedes.style.display =
                containerRedes.style.display === "none" ? "block" : "none";
        };

        tdRede.appendChild(btnRede);
        tdRede.appendChild(containerRedes);

        const tdCopiar = document.createElement("td");
        const btnCopiar = document.createElement("button");
        btnCopiar.textContent = "Copiar";
        btnCopiar.onclick = () => {
            if (!tdEndereco.textContent) {
                alert("Nenhum endereço selecionado!");
                return;
            }
            navigator.clipboard.writeText(tdEndereco.textContent).then(() => {
                alert("Endereço copiado!");
            });
        };
        tdCopiar.appendChild(btnCopiar);

        row.appendChild(tdImagem);
        row.appendChild(tdRede);
        row.appendChild(tdEndereco);
        row.appendChild(tdCopiar);

        tbodyPainel.appendChild(row);
    });

    // Salva no localStorage
    let campaignData = {
        nome: campaignName,
        periodo: campaignPeriod,
        objetivo: campaignGoal,
        imagens: campaignImages,
        video: videoURL,
        criptomoedas: selectedCryptos
    };

    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Campanha atualizada com sucesso!");
});
