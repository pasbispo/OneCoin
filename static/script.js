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
    let finalizeButton = document.getElementById("finalize-button");

    if (!finalizeButton) {
        console.error("Erro: Botão Finalizar não encontrado!");
        return;
    }

    finalizeButton.addEventListener("click", function() {
        let campaignName = document.getElementById("campaign-name").value.trim();
        let campaignGoal = document.getElementById("campaign-goal").value.trim();
        let campaignImage = document.getElementById("campaign-image").value.trim();
        let cryptoInputs = document.querySelectorAll(".crypto-item input");

        if (!campaignName || !campaignGoal || !campaignImage || Array.from(cryptoInputs).some(input => !input.value.trim())) {
            alert("Preencha todos os campos antes de finalizar!");
            return;
        }

        let confirmation = confirm("Você confirma que todos os dados estão corretos?");
        if (confirmation) {
            alert("Campanha finalizada com sucesso!");
            window.location.href = "finalizacao.html"; // ✅ Direciona para uma página final
        }
    });
});
