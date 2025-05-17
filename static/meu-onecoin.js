document.addEventListener("DOMContentLoaded", function() {
    let finalizeButton = document.getElementById("finalize-button");

    if (!finalizeButton) {
        console.error("Erro: Botão Finalizar não encontrado!");
        return;
    }

    finalizeButton.addEventListener("click", function() {
        let campaignName = document.getElementById("campaign-name").value.trim();
        let campaignGoal = document.getElementById("campaign-goal").value.trim();
        let campaignImage = document.getElementById("campaign-image"); // ✅ Corrigido para verificar arquivos
        let cryptoInputs = document.querySelectorAll(".crypto-item input");

        if (!campaignName || !campaignGoal || campaignImage.files.length === 0 || Array.from(cryptoInputs).some(input => !input.value.trim())) {
            alert("Preencha todos os campos antes de finalizar!");
            return;
        }

        let confirmation = confirm("Você confirma que todos os dados estão corretos?");
        if (confirmation) {
            alert("Campanha finalizada com sucesso!");

            // ✅ Certifique-se de que `finalizacao.html` está na pasta correta antes do redirecionamento
            window.location.href = "finalizacao.html"; 
        }
    });
});
