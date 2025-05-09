document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmarSenha").value;
    let cpf = document.getElementById("cpf").value;
    let mensagemErro = document.getElementById("mensagemErro");

    // Validação do CPF (formato correto)
    let cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
        mensagemErro.textContent = "CPF inválido! Use o formato: 000.000.000-00";
        return;
    }

    // Validação da senha (mínimo 8 caracteres, letras maiúsculas, minúsculas e caracteres especiais)
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

    // Se tudo estiver certo
    mensagemErro.textContent = "Cadastro realizado com sucesso!";
});
