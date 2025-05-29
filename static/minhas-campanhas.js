document.addEventListener("DOMContentLoaded", function () {
    let campaignContainer = document.getElementById("userCampaignsBox"); // 🔄 Novo nome sem conflito
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    if (campaigns.length === 0) {
        campaignContainer.innerHTML = "<p>Você ainda não tem campanhas finalizadas.</p>";
        return;
    }

    campaignContainer.innerHTML = ""; // 🔄 Limpa antes de adicionar os itens

    campaigns.forEach(campaign => {
        let campaignBox = document.createElement("div");
        campaignBox.classList.add("campaign-box");

        let campaignTitle = document.createElement("h3");
        campaignTitle.textContent = campaign.nome;

        let coinImage = document.createElement("img");
        coinImage.src = "static/img/simbolo.png";
        coinImage.alt = "Imagem da moeda";

        campaignBox.addEventListener("click", function () {
            window.location.href = campaign.url;
        });

        campaignBox.appendChild(campaignTitle);
        campaignBox.appendChild(coinImage);
        campaignContainer.appendChild(campaignBox);
    });
});
