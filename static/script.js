


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



function limitDecimals(input) {
    let value = input.value;
    input.value = value.match(/^\d*(\.\d{0,8})?/)[0]; // Limita a 8 casas decimais
}



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
