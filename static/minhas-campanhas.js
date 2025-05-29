document.addEventListener("DOMContentLoaded", function () {
    let campaignContainer = document.getElementById("campaign-buttons-container");
    let campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];

    // Se não houver campanhas finalizadas, não exibe nada
    if (campaigns.length === 0) {
        campaignContainer.innerHTML = "<p>Você ainda não tem campanhas finalizadas.</p>";
        return;
    }

    campaignContainer.innerHTML = ""; // 🔄 Limpa antes de adicionar os botões

    campaigns.forEach(campaign => {
        let button = document.createElement("button");
        button.textContent = campaign.nome;
        button.classList.add("campaign-btn");

        // 🔗 Redireciona para "Meu OneCoin" com o nome da campanha
        button.addEventListener("click", function () {
            window.location.href = campaign.url;
        });

        campaignContainer.appendChild(button);
    });
});
