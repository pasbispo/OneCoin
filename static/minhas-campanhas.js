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
            if (!campanha.finalizada) return; // mostra apenas finalizadas

            const box = document.createElement("div");
            box.classList.add("campaign-box");

            const titulo = document.createElement("h3");
            titulo.textContent = campanha.nome;

            const img = document.createElement("img");
            img.src = campanha.imagens?.[0] || "static/img/simbolo.png"; // mostra a primeira imagem

            const excluir = document.createElement("button");
            excluir.textContent = "Excluir";
            excluir.addEventListener("click", async (e) => {
                e.stopPropagation();
                // ❗Você pode criar um endpoint DELETE se quiser apagar do banco
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
