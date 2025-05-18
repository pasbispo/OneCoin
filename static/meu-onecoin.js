document.addEventListener("DOMContentLoaded", function() {
    let continueButton = document.getElementById("continue-button");

    if (!continueButton) {
        console.error("Erro: Botão Continuar não encontrado!");
        return;
    }

    continueButton.addEventListener("click", function() {
        let confirmation = confirm("Você confirma que todos os dados estão corretos?");
        
        if (confirmation) {
            window.location.href = "meu-onecoin.html"; // ✅ Direciona para a página correta
        } else {
            window.location.href = "cadastro.html"; // ✅ Retorna para cadastro da campanha
        }
    });
});



document.addEventListener("DOMContentLoaded", function() {
    let campaignNameInput = document.getElementById("campaign-name");

    // ✅ Recupera o nome da campanha salva no cadastro
    let storedCampaignName = localStorage.getItem("campaignName"); // Usa Local Storage para armazenar temporariamente

    if (storedCampaignName) {
        campaignNameInput.value = storedCampaignName; // ✅ Exibe o nome da campanha no campo
    } else {
        campaignNameInput.placeholder = "Nome não encontrado";
    }
});
