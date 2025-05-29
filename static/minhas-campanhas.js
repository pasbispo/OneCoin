document.addEventListener("DOMContentLoaded", function () {
    let campaignContainer = document.getElementById("userCampaignsBox");
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    if (campaigns.length === 0) {
        campaignContainer.innerHTML = "<p>Você ainda não tem campanhas finalizadas.</p>";
        return;
    }

    campaignContainer.innerHTML = ""; // 🔄 Limpa antes de adicionar os itens


    







        campaignBox.appendChild(campaignTitle);
        campaignBox.appendChild(coinImage);
        campaignBox.appendChild(deleteButton); // ✅ Adiciona o botão dentro do campaignBox
        campaignContainer.appendChild(campaignBox); // ✅ Adiciona campaignBox ao campaignContainer
    });
});

// 🔥 Função para excluir campanha
function excluirCampanha(index) {
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];
    campaigns.splice(index, 1); // ✅ Remove a campanha da lista
    localStorage.setItem("userCampaigns", JSON.stringify(campaigns));
    location.reload(); // 🔄 Atualiza a página para refletir a exclusão
}
