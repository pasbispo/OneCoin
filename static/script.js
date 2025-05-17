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



