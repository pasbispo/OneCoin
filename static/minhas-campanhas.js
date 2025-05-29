document.addEventListener("DOMContentLoaded", function () {
    let campaignContainer = document.getElementById("userCampaignsBox");
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    if (campaigns.length === 0) {
        campaignContainer.innerHTML = "<p>Você ainda não tem campanhas finalizadas.</p>";
        return;
    }

    campaignContainer.innerHTML = ""; // 🔄 Limpa antes de adicionar os itens

    campaigns.forEach((campaign, index) => {
        let campaignBox = document.createElement("div");
        campaignBox.classList.add("campaign-box");

        let closeButton = document.createElement("button");
        closeButton.textContent = "✖";
        closeButton.classList.add("campaign-remove-btn");
        closeButton.addEventListener("click", function (event) {
            event.stopPropagation(); // ✅ Impede que o clique no "X" redirecione para outra página
            excluirCampanha(index);
        });

        let campaignTitle = document.createElement("h3");
        campaignTitle.textContent = campaign.nome;

        let coinImage = document.createElement("img");
        coinImage.src = "static/img/simbolo.png";
        coinImage.alt = "Imagem da moeda";

        // ✅ Redirecionar ao clicar na campanha (exceto no "X")
        campaignBox.addEventListener("click", function () {
            window.location.href = campaign.url;
        });

        campaignBox.appendChild(closeButton);
        campaignBox.appendChild(campaignTitle);
        campaignBox.appendChild(coinImage);
        campaignContainer.appendChild(campaignBox);
    });
});
