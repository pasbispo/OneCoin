document.getElementById("update-button").addEventListener("click", function () {
    let campaignName = document.getElementById("campaign-name").value.trim();
    let campaignPeriod = document.getElementById("campaign-period").value.trim();
    let campaignGoal = document.getElementById("campaign-goal").value.trim();
    let campaignImage = document.getElementById("slideshow-image").src;
    let campaignVideo = document.getElementById("video-player").src;

    if (!campaignName || !campaignPeriod) {
        alert("Preencha todas as informações antes de atualizar!");
        return;
    }

    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    // ✅ Evita duplicatas antes de salvar
    if (!campaigns.find(c => c.nome === campaignName)) {
        campaigns.push({ nome: campaignName, url: `meu-onecoin.html?campanha=${encodeURIComponent(campaignName)}` });
        localStorage.setItem("userCampaigns", JSON.stringify(campaigns));
    }

    let campaignData = {
        nome: campaignName,
        periodo: campaignPeriod,
        objetivo: campaignGoal || "Nenhum objetivo definido.",
        imagens: campaignImage,
        video: campaignVideo,
        criptomoedas: []
    };

    let cryptoTableRows = document.querySelectorAll("#crypto-table tbody tr");
    cryptoTableRows.forEach(row => {
        let cells = row.querySelectorAll("td");
        campaignData.criptomoedas.push({
            simbolo: cells[0]?.textContent.trim(),
            quantidade: cells[1]?.textContent.trim(),
            valorEstimado: cells[2]?.textContent.trim(),
            imagem: cells[0]?.querySelector("img")?.src,
            rede: cells[3]?.textContent.trim() || "Nenhuma rede selecionada",
            endereco: cells[4]?.textContent.trim() || "Selecione uma rede"
        });
    });

    localStorage.setItem("activeCampaign", JSON.stringify(campaignData));
    console.log("✅ Campanha salva:", campaignData);

    // ✅ Bloqueia edições
    document.getElementById("campaign-name").setAttribute("readonly", true);
    document.getElementById("campaign-period").setAttribute("readonly", true);
    document.getElementById("campaign-goal").setAttribute("readonly", true);

    alert("Campanha salva! Redirecionando para 'Minhas Campanhas'...");

    // ✅ Aguarda um pequeno tempo antes de redirecionar
    setTimeout(function () {
        window.location.href = "minhas-campanhas.html";
    }, 1000);
});
