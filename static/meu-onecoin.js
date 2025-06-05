document.getElementById("update-button").addEventListener("click", function () {
    let campaignName = document.getElementById("campaign-name").value.trim();

    if (!campaignName) {
        alert("Digite um nome para a campanha antes de atualizar!");
        return;
    }

    // ✅ Atualiza o nome no painel direito
    document.getElementById("panel-title").textContent = campaignName;

    // ✅ Salva no localStorage
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.nome = campaignName;
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Nome atualizado:", campaignName);
});











document.getElementById("update-button").addEventListener("click", function () {
    let campaignPeriod = parseInt(document.getElementById("campaign-period").value.trim());

    if (isNaN(campaignPeriod) || campaignPeriod < 1 || campaignPeriod > 365) {
        alert("O período deve estar entre 1 e 365 dias!");
        return;
    }

    // ✅ Atualiza o painel direito
    let periodDisplay = document.getElementById("panel-duration");
    periodDisplay.textContent = campaignPeriod;

    // ✅ Calcula se já passou 80% do tempo e altera cor
    let remainingDays = campaignPeriod * 0.2;
    periodDisplay.style.color = campaignPeriod <= remainingDays ? "red" : "green";

    // ✅ Salva no localStorage
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.periodo = campaignPeriod;
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Período atualizado:", campaignPeriod);
});









document.getElementById("update-button").addEventListener("click", function () {
    let campaignImagesInput = document.getElementById("campaign-images");

    if (campaignImagesInput.files.length === 0) {
        alert("Por favor, selecione pelo menos uma imagem para a campanha!");
        return;
    }

    let campaignImages = [];
    for (let i = 0; i < campaignImagesInput.files.length; i++) {
        campaignImages.push(URL.createObjectURL(campaignImagesInput.files[i]));
    }

    // ✅ Exibe a primeira imagem no lado direito
    document.getElementById("slideshow-image").src = campaignImages[0];

    // ✅ Salva no localStorage para exibição futura
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.imagens = campaignImages;
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Imagens atualizadas:", campaignImages);
});










document.getElementById("update-button").addEventListener("click", function () {
    let campaignGoal = document.getElementById("campaign-goal").value.trim();

    if (campaignGoal.length > 565) {
        alert("O objetivo da campanha não pode exceder 565 caracteres!");
        return;
    }

    // ✅ Atualiza o painel direito
    document.getElementById("panel-goal").textContent = campaignGoal;

    // ✅ Salva no localStorage
    let campaignData = JSON.parse(localStorage.getItem("activeCampaign")) || {};
    campaignData.objetivo = campaignGoal;
    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));

    console.log("✅ Objetivo atualizado:", campaignGoal);
});
