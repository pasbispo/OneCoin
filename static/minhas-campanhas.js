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

        let campaignTitle = document.createElement("h3");
        campaignTitle.textContent = campaign.nome;

        let coinImage = document.createElement("img");
        coinImage.src = "static/img/simbolo.png";
        coinImage.alt = "Imagem da moeda";

        // 🔴 Criar botão "X" para excluir campanha
        let closeButton = document.createElement("button");
        closeButton.textContent = "✖";
        closeButton.classList.add("delete-btn");
        closeButton.addEventListener("click", function () {
            excluirCampanha(index);
        });

        campaignBox.appendChild(closeButton);
        campaignBox.appendChild(campaignTitle);
        campaignBox.appendChild(coinImage);
        campaignContainer.appendChild(campaignBox);
    });
});

// 🔥 Função para excluir campanha
function excluirCampanha(index) {
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];
    campaigns.splice(index, 1); // Remove a campanha da lista
    localStorage.setItem("userCampaigns", JSON.stringify(campaigns));
    location.reload(); // 🔄 Atualiza a página para refletir a exclusão
}
