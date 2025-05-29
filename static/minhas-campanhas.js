document.addEventListener("DOMContentLoaded", function () {
    let campaignContainer = document.getElementById("userCampaignsBox");
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    if (campaigns.length === 0) {
        campaignContainer.innerHTML = "<p>Você ainda não tem campanhas finalizadas.</p>";
        return;
    }

    campaignContainer.innerHTML = ""; // 🔄 Limpa antes de adicionar os itens

    campaigns.forEach((campaign, index) => {
        let campaignWrapper = document.createElement("div"); // ✅ Container para campanha + botão
        campaignWrapper.classList.add("campaign-wrapper");

        let campaignBox = document.createElement("div");
        campaignBox.classList.add("campaign-box");

        let campaignTitle = document.createElement("h3");
        campaignTitle.textContent = campaign.nome;

        let coinImage = document.createElement("img");
        coinImage.src = "static/img/simbolo.png";
        coinImage.alt = "Imagem da moeda";

        campaignBox.appendChild(campaignTitle);
        campaignBox.appendChild(coinImage);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#10006;"; // ✅ Ícone "X"
        deleteButton.classList.add("campaign-delete-btn");
        deleteButton.addEventListener("click", function (event) {
            event.stopPropagation();
            excluirCampanha(index);
        });

        campaignWrapper.appendChild(campaignBox); // ✅ Campanha dentro do wrapper
        campaignWrapper.appendChild(deleteButton); // ✅ Botão fora da campanha
        campaignContainer.appendChild(campaignWrapper); // ✅ Adiciona ao container principal
    });
});

// 🔥 Função para excluir campanha
function excluirCampanha(index) {
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];
    campaigns.splice(index, 1); // ✅ Remove a campanha da lista
    localStorage.setItem("userCampaigns", JSON.stringify(campaigns));
    location.reload(); // 🔄 Atualiza a página para refletir a exclusão
}
