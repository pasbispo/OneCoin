document.addEventListener("DOMContentLoaded", () => {
    const campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];
    const container = document.getElementById("userCampaignsBox");
    container.innerHTML = ""; // Limpa o texto "Carregando suas campanhas..."

    if (campaigns.length === 0) {
        container.innerHTML = "<p>Você ainda não criou campanhas.</p>";
        return;
    }

    campaigns.forEach((campanha, index) => {
        const div = document.createElement("div");
        div.classList.add("campanha-item");
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.margin = "10px 0";
        div.style.cursor = "pointer";
        div.style.backgroundColor = "#f9f9f9";

        // Nome da campanha
        const nome = document.createElement("h2");
        nome.textContent = campanha.nome || `Campanha ${index + 1}`;
        div.appendChild(nome);

        // Período
        const periodo = document.createElement("p");
        periodo.textContent = "Período: " + (campanha.periodo || "Não informado");
        div.appendChild(periodo);

        // Objetivo
        const objetivo = document.createElement("p");
        objetivo.textContent = "Objetivo: " + (campanha.objetivo || "Não informado");
        div.appendChild(objetivo);

        // Imagem da campanha (primeira imagem dinâmica, se houver)
        if (campanha.imagens && campanha.imagens.length > 0) {
            const img = document.createElement("img");
            img.src = campanha.imagens[0];
            img.alt = "Imagem da campanha";
            img.style.width = "120px";
            img.style.marginTop = "10px";
            div.appendChild(img);
        }

        // Evento de clique: redireciona para a página da campanha
        div.addEventListener("click", () => {
            const dataString = encodeURIComponent(JSON.stringify(campanha));
            window.location.href = `meu-onecoin.html?data=${dataString}`;
        });

        container.appendChild(div);
    });
});
