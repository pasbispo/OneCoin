document.addEventListener("DOMContentLoaded", function() {
    let campaignsContainer = document.getElementById("campaigns-container");
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
            <img src="${campaign.image}" alt="Imagem da Campanha" class="campaign-img">
            <p>Objetivo: <textarea class="edit-objective">${campaign.objective}</textarea></p>
            <input type="file" class="edit-image" accept="image/*">
            <input type="file" class="edit-video" accept="video/*">
            <button class="save-campaign" data-index="${index}">Salvar Alterações</button>
        `;

        campaignsContainer.appendChild(campaignDiv);
    });

    document.querySelectorAll(".save-campaign").forEach(button => {
        button.addEventListener("click", function() {
            let index = this.getAttribute("data-index");
            let updatedObjective = document.querySelectorAll(".edit-objective")[index].value;
            let updatedImage = document.querySelectorAll(".edit-image")[index].files[0]?.name || campaigns[index].image;
            let updatedVideo = document.querySelectorAll(".edit-video")[index].files[0]?.name || campaigns[index].video;

            campaigns[index].objective = updatedObjective;
            campaigns[index].image = updatedImage;
            campaigns[index].video = updatedVideo;

            localStorage.setItem("userCampaigns", JSON.stringify(campaigns));
            alert("Alterações salvas!");
        });
    });
});
