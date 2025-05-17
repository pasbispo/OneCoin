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
