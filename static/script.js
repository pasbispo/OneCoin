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
    let continueButton = document.getElementById("continue-button");

    if (!continueButton) {
        console.error("Erro: Botão Continuar não encontrado!");
        return;
    }

    continueButton.addEventListener("click", function() {
        let confirmation = confirm("Você confirma que todos os dados estão corretos?");
        
        if (confirmation) {
            window.location.href = "meu-onecoin.html"; // ✅ Direciona para a página Meu OneCoin
        } else {
            window.location.href = "cadastro.html"; // ✅ Retorna para cadastro de campanha
        }
    });
});
