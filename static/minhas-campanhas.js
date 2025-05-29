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

        // ✅ Adiciona evento de clique para redirecionar
        campaignBox.addEventListener("click", function () {
            window.location.href = campaign.url;
        });

        // 🔴 Criar botão "Excluir" abaixo do retângulo
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("campaign-delete-btn");
        deleteButton.addEventListener("click", function (event) {
            event.stopPropagation(); // ✅ Impede que o clique afete o redirecionamento
            excluirCampanha(index);
        });

        campaignBox.appendChild(campaignTitle);
        campaignBox.appendChild(coinImage);
        campaignContainer.appendChild(campaignBox);
        campaignContainer.appendChild(deleteButton); // ✅ Adiciona o botão abaixo da campanha
    });
});

// 🔥 Função para excluir campanha
function excluirCampanha(index) {
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];
    campaigns.splice(index, 1); // ✅ Remove a campanha da lista
    localStorage.setItem("userCampaigns", JSON.stringify(campaigns));
    location.reload(); // 🔄 Atualiza a página para refletir a exclusão
}
