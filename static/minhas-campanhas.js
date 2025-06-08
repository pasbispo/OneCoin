document.addEventListener("DOMContentLoaded", async function () {
    const campaignContainer = document.getElementById("userCampaignsBox");

    try {
        const response = await fetch("http://localhost:3000/campanhas");
        const campanhas = await response.json();

        if (!campanhas.length) {
            campaignContainer.innerHTML = "<p>Você ainda não tem campanhas finalizadas.</p>";
            return;
        }

        campaignContainer.innerHTML = "";

        campanhas.forEach(campanha => {
            if (!campanha.finalizada) return;

            const box = document.createElement("div");
            box.classList.add("campaign-box");

            const titulo = document.createElement("h3");
            titulo.textContent = campanha.nome;

            const img = document.createElement("img");
            img.src = campanha.imagens?.[0] || "static/img/simbolo.png";

            const excluir = document.createElement("button");
            excluir.textContent = "Excluir";
            excluir.addEventListener("click", async (e) => {
                e.stopPropagation();
                // Se quiser, crie endpoint DELETE no backend
            });

            box.appendChild(titulo);
            box.appendChild(img);
            box.appendChild(excluir);

            box.addEventListener("click", () => {
                window.location.href = `meu-onecoin.html?campanhaId=${campanha._id}`;
            });

            campaignContainer.appendChild(box);
        });

    } catch (err) {
        console.error("Erro ao carregar campanhas:", err);
        campaignContainer.innerHTML = "<p>Erro ao carregar campanhas.</p>";
    }
});



        // 🔴 Criar botão "Excluir" dentro do campaignBox
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("campaign-delete-btn");
        deleteButton.addEventListener("click", function (event) {
            event.stopPropagation(); // ✅ Impede que o clique afete o redirecionamento
            excluirCampanha(index);
        });







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
