document.getElementById("site-logo").addEventListener("click", function(event) {
    event.preventDefault(); // Evita comportamento padrão do link
    window.location.href = "index.html"; // Redireciona para a página principal
});



document.getElementById("signup-button").addEventListener("click", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    window.location.href = "cadastro.html"; // Redireciona para a página de cadastro
});




document.addEventListener("DOMContentLoaded", function() {
    let nextButton = document.getElementById("next-button");

    if (!nextButton) {
        console.error("Erro: O botão Próximo não foi encontrado!");
        return;
    }

    nextButton.addEventListener("click", function() {
        console.log("Botão Próximo clicado!");
    });
});
