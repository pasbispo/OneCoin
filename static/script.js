document.getElementById("site-logo").addEventListener("click", function(event) {
    event.preventDefault(); // Evita comportamento padrão do link
    window.location.href = "index.html"; // Redireciona para a página principal
});



document.getElementById("signup-button").addEventListener("click", function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    window.location.href = "cadastro.html"; // Redireciona para a página de cadastro
});
