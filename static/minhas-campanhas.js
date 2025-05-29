document.addEventListener("DOMContentLoaded", function () {
    let campaignContainer = document.getElementById("campaign-container");
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    if (campaigns.length === 0) {
        campaignContainer.innerHTML = "<p>Você ainda não tem campanhas finalizadas.</p>";
        return;
    }

    campaignContainer.innerHTML = ""; // 🔄 Limpa antes de adicionar os itens

    campaigns.forEach(campaign => {
        let campaignBox = document.createElement("div");
        campaignBox.classList.add("campaign-box");

        // ✅ Adiciona título da campanha
        let campaignTitle = document.createElement("h3");
        campaignTitle.textContent = campaign.nome;

        // ✅ Adiciona imagem da moeda
        let coinImage = document.createElement("img");
        coinImage.src = "static/img/simbolo.png"; // 🔄 Ajuste conforme a moeda escolhida
        coinImage.alt = "Imagem da moeda";

        // 🔗 Redireciona ao clicar na caixa
        campaignBox.addEventListener("click", function () {
            window.location.href = campaign.url;
        });

        campaignBox.appendChild(campaignTitle);
        campaignBox.appendChild(coinImage);
        campaignContainer.appendChild(campaignBox);
    });
});
