document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmarSenha").value;
    let cpf = document.getElementById("cpf").value;
    let mensagemErro = document.getElementById("mensagemErro");
    let campaignName = document.getElementById("campaign-name-input").value.trim(); // ✅ Obtém o nome da campanha

    // Validação do CPF
    let cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        mensagemErro.textContent = "CPF inválido! Use o formato: 000.000.000-00";
        return;
    }

    // Validação da senha
    let senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!senhaRegex.test(senha)) {
        mensagemErro.textContent = "Senha inválida! Deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas e caracteres especiais.";
        return;
    }

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
        mensagemErro.textContent = "As senhas não coincidem!";
        return;
    }

    // ✅ Salvar o nome da campanha no localStorage para recuperação futura
    if (campaignName !== "") {
        localStorage.setItem("campaignName", campaignName);
    } else {
        alert("Por favor, insira um nome válido para sua campanha.");
        return;
    }

    mensagemErro.textContent = "Cadastro realizado com sucesso!";
    window.location.href = "meu-onecoin.html"; // ✅ Redireciona para Meu OneCoin
});



document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let campaignName = document.getElementById("campaign-name-input").value.trim(); // ✅ Obtém o nome da campanha

    if (!campaignName) {
        alert("Por favor, insira um nome válido para sua campanha.");
        return;
    }

    localStorage.setItem("campaignName", campaignName); // ✅ Salva o nome corretamente

    alert("Cadastro realizado com sucesso!");
    window.location.href = "meu-onecoin.html"; // ✅ Redireciona para Meu OneCoin
});
