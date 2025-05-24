document.getElementById("finalize-button").addEventListener("click", function() {
    let confirmFinalize = confirm("Se finalizar, não será possível fazer mudanças. Deseja continuar?");
    
    if (confirmFinalize) {
        let campaignName = document.getElementById("campaign-name").value;
        let campaignPeriod = document.getElementById("campaign-period").value;
        let campaignGoal = document.getElementById("campaign-goal").value;
        let campaignImages = document.getElementById("campaign-images").files;
        let campaignVideo = document.getElementById("video-file").files[0];

        let cryptoData = [];
        document.querySelectorAll("#crypto-table tbody tr").forEach(row => {
            let cryptoName = row.cells[0].textContent;
            let cryptoQuantity = row.cells[1].textContent;
            let cryptoValue = row.cells[2].textContent;
            let cryptoNetworks = row.cells[3].textContent;

            cryptoData.push({
                name: cryptoName,
                quantity: cryptoQuantity,
                estimatedValue: cryptoValue,
                networks: cryptoNetworks
            });
        });

        let campaign = {
            name: campaignName,
            period: campaignPeriod,
            goal: campaignGoal,
            images: Array.from(campaignImages).map(img => img.name),
            video: campaignVideo ? campaignVideo.name : "",
            cryptos: cryptoData
        };

        let userCampaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];
        userCampaigns.push(campaign);
        localStorage.setItem("userCampaigns", JSON.stringify(userCampaigns));

        alert("Campanha finalizada! Agora você será direcionado para acompanhar suas campanhas.");
        window.location.href = "https://pasbispo.github.io/OneCoin/minhas-campanhas.html";
    } else {
        alert("Você ainda pode fazer ajustes.");
    }
});








document.addEventListener("DOMContentLoaded", function() {
    let campaignsContainer = document.getElementById("campaigns-container");

    if (!campaignsContainer) {
        console.error("Erro: O elemento 'campaigns-container' não foi encontrado!");
        return;
    }

    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    if (campaigns.length === 0) {
        campaignsContainer.innerHTML = "<p>Você ainda não criou nenhuma campanha.</p>";
        return;
    }

    campaigns.forEach((campaign, index) => {
        let campaignDiv = document.createElement("div");
        campaignDiv.classList.add("campaign-box");

        campaignDiv.innerHTML = `
            <h2>Campanha ${index + 1}: ${campaign.name}</h2>
            <p>Período: ${campaign.period} dias</p>
            <p>Objetivo: <textarea class="edit-objective">${campaign.goal}</textarea></p>
            <input type="file" class="edit-image" accept="image/*">
            <input type="file" class="edit-video" accept="video/*">
            <button class="save-campaign" data-index="${index}">Atualizar</button>
            <button class="delete-campaign" data-index="${index}">Excluir</button>
        `;

        campaignsContainer.appendChild(campaignDiv);
    });
});
