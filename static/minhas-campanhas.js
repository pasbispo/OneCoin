document.addEventListener("DOMContentLoaded", function() {
    let searchInput = document.getElementById("search-bar");
    let cryptoImages = document.querySelectorAll(".crypto-list img"); // ✅ Seleciona todas as imagens de criptomoedas disponíveis

    searchInput.addEventListener("input", function() {
        let query = searchInput.value.trim().toLowerCase();

        if (query === "") {
            // ✅ Se o campo estiver vazio, todas as imagens aparecem novamente
            cryptoImages.forEach(img => img.style.display = "inline-block");
            return;
        }

        cryptoImages.forEach(img => {
            let cryptoName = img.alt.toLowerCase();
            if (cryptoName.includes(query)) {
                img.style.display = "inline-block"; // ✅ Exibe apenas a imagem correspondente
            } else {
                img.style.display = "none"; // ✅ Esconde todas as outras imagens
            }
        });
    });
});




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
            <p>Período: ${campaign.period} dias</p>
            <p>Objetivo: <textarea class="edit-objective">${campaign.goal}</textarea></p>
            <input type="file" class="edit-image" accept="image/*">
            <input type="file" class="edit-video" accept="video/*">
            <h3>Criptomoedas Selecionadas</h3>
            <table class="crypto-panel-table">
                <thead>
                    <tr>
                        <th>Criptomoeda</th>
                        <th>Rede</th>
                        <th>Endereço</th>
                        <th>Copiar</th>
                    </tr>
                </thead>
                <tbody>
                    ${campaign.cryptos.map(crypto => `
                        <tr>
                            <td>${crypto.name}</td>
                            <td>${crypto.networks}</td>
                            <td>Endereço</td>
                            <td><button class="copy-btn">Copiar</button></td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            <button class="save-campaign" data-index="${index}">Atualizar</button>
            <button class="delete-campaign" data-index="${index}">Excluir</button>
        `;

        campaignsContainer.appendChild(campaignDiv);
    });

    document.querySelectorAll(".save-campaign").forEach(button => {
        button.addEventListener("click", function() {
            let index = this.getAttribute("data-index");
            let updatedObjective = document.querySelectorAll(".edit-objective")[index].value;
            let updatedImage = document.querySelectorAll(".edit-image")[index].files[0]?.name || campaigns[index].image;
            let updatedVideo = document.querySelectorAll(".edit-video")[index].files[0]?.name || campaigns[index].video;

            campaigns[index].goal = updatedObjective;
            campaigns[index].image = updatedImage;
            campaigns[index].video = updatedVideo;

            localStorage.setItem("userCampaigns", JSON.stringify(campaigns));
            alert("Alterações salvas!");
        });
    });

    document.querySelectorAll(".delete-campaign").forEach(button => {
        button.addEventListener("click", function() {
            let index = this.getAttribute("data-index");
            campaigns.splice(index, 1);
            localStorage.setItem("userCampaigns", JSON.stringify(campaigns));
            location.reload();
        });
    });
});
