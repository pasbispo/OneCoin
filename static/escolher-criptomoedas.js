// Definição global para permitir acesso em todas as funções
let selectedCrypto = null; // Inicialmente nenhuma criptomoeda está selecionada
let chosenCryptos = new Set(); // Conjunto para armazenar criptomoedas já escolhidas

// Função para buscar cotação da criptomoeda
async function getCryptoPrice(crypto) {
    try {
        let response = await fetch(`http://localhost:3000/crypto/${crypto.toUpperCase()}`);
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        let data = await response.json();
        return data?.data?.[crypto.toUpperCase()]?.quote?.USD?.price || null;
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        return "Erro na cotação";
    }
}

// Atualizar a criptomoeda selecionada e exibir no retângulo
async function selectCrypto(crypto, name) {
    if (chosenCryptos.has(crypto)) {
        alert("Você já adicionou essa criptomoeda à tabela! Escolha outra.");
        return;
    }

    selectedCrypto = crypto; // Atualiza variável global
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");

    if (cryptoImage && cryptoName) {
        cryptoImage.src = `static/img/${crypto}.png`;
        cryptoImage.classList.remove("hidden");
        cryptoName.textContent = name;
    } else {
        console.error("Erro: Elementos da criptomoeda não encontrados!");
    }

    // Atualiza a cotação automaticamente ao selecionar a criptomoeda
    let price = await getCryptoPrice(selectedCrypto);
    document.getElementById("crypto-value").value = price ? (price).toFixed(2) + " USD" : "Erro na cotação";
}

document.addEventListener("DOMContentLoaded", function() {
    let nextButton = document.getElementById("next-button");
    let cryptoAmountInput = document.getElementById("crypto-amount");

    if (!nextButton || !cryptoAmountInput) {
        console.error("Erro: Elementos não encontrados!");
        return;
    }

    // Evento de clique no botão "Próximo"

    nextButton.addEventListener("click", function() {
        console.log("Botão Próximo clicado!");

        let cryptoName = document.getElementById("crypto-name")?.textContent.trim() || "";
        let cryptoImage = document.getElementById("crypto-image")?.src || "";
        let cryptoAmount = cryptoAmountInput.value.trim() || "";
        let cryptoValue = document.getElementById("crypto-value")?.value.trim() || "";

        if (!cryptoName || cryptoAmount === "" || cryptoValue === "") {
            alert("Preencha todos os campos antes de continuar!");
            return;
        }

        let table = document.getElementById("crypto-table").getElementsByTagName("tbody")[0];

        // Remover linha vazia inicial, se existir
        let emptyRow = document.querySelector(".empty-row");
        if (emptyRow) emptyRow.remove();

        // Adicionar criptomoeda ao conjunto para evitar repetição
        chosenCryptos.add(selectedCrypto);

        // Criando nova linha na tabela
        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="${cryptoImage}" width="30"> ${cryptoName}</td>
            <td>${cryptoAmount}</td>
            <td>${cryptoValue}</td>
            <td><button class="delete-button">Excluir</button></td>
        `;

       newRow.querySelector(".delete-button").addEventListener("click", function() {
    let cryptoImage = newRow.querySelector("td img").src; 
    let cryptoSymbol = cryptoImage.split("/").pop().split(".")[0]; // ✅ Obtém o nome da criptomoeda pelo caminho da imagem

    chosenCryptos.delete(cryptoSymbol); // ✅ Agora a criptomoeda pode ser escolhida novamente
    newRow.remove();

    if (table.rows.length === 0) {
        table.innerHTML = `<tr class="empty-row"><td colspan="4" style="text-align: center; color: gray;">Nenhum dado cadastrado ainda.</td></tr>`;
    }
});


        // ❗ Limpar os dados do retângulo para nova escolha
        document.getElementById("crypto-name").textContent = "";
        document.getElementById("crypto-image").src = "static/img/default-crypto.png";
        document.getElementById("crypto-image").classList.add("hidden");
        cryptoAmountInput.value = "";
        document.getElementById("crypto-value").value = "";
        selectedCrypto = null;
    });
});





document.addEventListener("DOMContentLoaded", function() {
    let cryptoAmountInput = document.getElementById("crypto-amount");

    if (!cryptoAmountInput) {
        console.error("Erro: Campo de quantidade não encontrado!");
        return;
    }

    // ✅ Atualiza o valor estimado sempre que a quantidade mudar
    cryptoAmountInput.addEventListener("input", async function() {
        let amount = parseFloat(this.value);
        if (isNaN(amount) || amount <= 0) {
            document.getElementById("crypto-value").value = "Valor inválido";
            return;
        }

        // ✅ Recalcula com base na criptomoeda escolhida
        if (selectedCrypto) {
            let price = await getCryptoPrice(selectedCrypto);
            if (price) {
                document.getElementById("crypto-value").value = (amount * price).toFixed(2) + " USD";
            } else {
                document.getElementById("crypto-value").value = "Erro na cotação";
            }
        }
    });
});





document.getElementById("continue-button").addEventListener("click", function () {
    let cryptoTableRows = document.querySelectorAll("#crypto-table tbody tr");

    if (cryptoTableRows.length === 0) {
        alert("Adicione pelo menos uma criptomoeda antes de continuar!");
        return;
    }

    let selectedCryptos = [];

    cryptoTableRows.forEach(row => {
        let cells = row.querySelectorAll("td");

        if (cells.length < 3) return;

        let cryptoData = {
            simbolo: cells[0]?.textContent.trim(),
            quantidade: cells[1]?.textContent.trim(),
            valorEstimado: cells[2]?.textContent.trim(),
            imagem: cells[0]?.querySelector("img")?.src
        };

        selectedCryptos.push(cryptoData);
    });

    // ✅ Salva as criptomoedas no localStorage
    localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));

    console.log("✅ Criptomoedas salvas:", selectedCryptos);

    // ✅ Redireciona para a página de campanha
    window.location.href = "meu-onecoin.html";
});





document.addEventListener("DOMContentLoaded", function() {
    let campaignNameInput = document.getElementById("campaign-name");

    // ✅ Recupera o nome salvo no cadastro
    let storedCampaignName = localStorage.getItem("campaignName");

    if (storedCampaignName && campaignNameInput) {
        campaignNameInput.value = storedCampaignName; // ✅ Exibe o nome da campanha
    } else {
        campaignNameInput.placeholder = "Nome não encontrado"; // ✅ Se não houver nome salvo
    }
});






document.addEventListener("DOMContentLoaded", function () {
    let cryptoSearch = document.getElementById("crypto-search");

    if (!cryptoSearch) {
        console.warn("Aviso: Elemento com ID 'crypto-search' não encontrado. A pesquisa será ignorada.");
        return; // ✅ Previne erro sem afetar o restante do código
    }

    cryptoSearch.addEventListener("input", function () {
        console.log("Pesquisa de criptomoeda iniciada:", cryptoSearch.value);
    });
});





document.addEventListener("DOMContentLoaded", function() {
    let cryptoTableBody = document.querySelector(".crypto-panel-table tbody");
    let cryptoData = JSON.parse(localStorage.getItem("cryptoList"));

    if (cryptoData && cryptoData.length > 0) {
        cryptoTableBody.innerHTML = ""; // ✅ Limpa a tabela antes de preencher

        cryptoData.forEach(crypto => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td><img src="${crypto.imageSrc}" alt="${crypto.name}"></td>
                <td><button>Selecionar Rede</button></td>
                <td>${crypto.quantity}</td>
                <td>${crypto.value}</td>
            `;

            cryptoTableBody.appendChild(row);
        });
    } else {
        console.error("Erro: Dados da criptomoeda não encontrados. Verifique se a página 'Escolher Criptomoedas' salvou corretamente os valores.");
    }
});







document.getElementById("next-button").addEventListener("click", function() {
    let cryptoName = document.getElementById("crypto-name").textContent;
    let cryptoImage = document.getElementById("crypto-image").src;
    let cryptoAmount = document.getElementById("crypto-amount").value;
    let cryptoValue = document.getElementById("crypto-value").value;

    if (cryptoName && cryptoAmount && cryptoValue) {
        let selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

        let newCrypto = {
            name: cryptoName,
            image: cryptoImage,
            quantity: cryptoAmount,
            estimatedValue: cryptoValue
        };

        selectedCryptos.push(newCrypto);
        localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
        console.log("Criptomoedas salvas no localStorage!");
    } else {
        alert("Preencha todos os campos antes de continuar!");
    }
});



document.addEventListener("DOMContentLoaded", function() {
    let elemento = document.getElementById("update-button");

    if (elemento) { // ✅ Garante que o elemento existe antes de adicionar o evento
        elemento.addEventListener("click", function() {
            console.log("Botão clicado!");
        });
    } else {
        console.error("Erro: O elemento 'update-button' não foi encontrado!");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let cryptoTableRows = document.querySelectorAll("#crypto-table tbody tr");

    cryptoTableRows.forEach(row => {
        let quantityCell = row.querySelector("td:nth-child(2)"); // ✅ Busca a segunda coluna (Quantidade)

        if (!quantityCell) {
            console.warn("Aviso: Campo de quantidade não encontrado! Verifique se a tabela está correta.");
            return; // ✅ Previne erro sem afetar o restante do código
        }

        console.log("Quantidade encontrada:", quantityCell.textContent);
    });
});



window.atualizarTabelaDireita = atualizarTabelaDireita;