// === BOTÃO FINALIZAR ===
document.getElementById("end-campaign-button").addEventListener("click", function () {
    const nome = document.getElementById("campaign-name").value;
    const periodo = document.getElementById("campaign-period").value;
    const objetivo = document.getElementById("campaign-goal").value;

    // Imagens
    const imagensInput = document.getElementById("campaign-images");
    const imagens = Array.from(imagensInput.files).map(file => URL.createObjectURL(file));

    // Vídeo
    const videoFile = document.getElementById("video-file").files[0];
    const video = videoFile ? URL.createObjectURL(videoFile) : null;

    // Tabela ESQUERDA
    const selectedCryptos = JSON.parse(localStorage.getItem("selectedCryptos")) || [];

    // Tabela DIREITA (única versão!)
    const tabelaDireita = document.querySelectorAll(".crypto-panel-table tbody tr");
    const criptomoedas = Array.from(tabelaDireita).map(row => {
        const simbolo = row.querySelector("img")?.alt || "";
        const imagem = row.querySelector("img")?.src || "";
        const endereco = row.children[2]?.textContent || "";

        const redes = Array.from(row.children[1]?.querySelectorAll("div button") || []).map(btn => {
            return {
                nome: btn.textContent,
                endereco: btn.getAttribute("data-endereco") || ""
            };
        });

        return { simbolo, imagem, enderecoSelecionado: endereco, redes };
    });

    // Montar objeto final
    const campaignData = {
        nome,
        periodo,
        objetivo,
        imagens,
        video,
        selectedCryptos,
        criptomoedas, // Apenas esse
        bloqueado: true
    };

    // Salvar
    const campaigns = JSON.parse(localStorage.getItem("userCampaigns")) || [];
    campaigns.push(campaignData);
    localStorage.setItem("userCampaigns", JSON.stringify(campaigns));

    // Redirecionar
    window.location.href = "minhas-campanhas.html";
});

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("data");

    if (data) {
        const campanha = JSON.parse(decodeURIComponent(data));

        // Preencher os campos
        document.getElementById("campaign-name").value = campanha.nome || "";
        document.getElementById("campaign-period").value = campanha.periodo || "";
        document.getElementById("campaign-goal").value = campanha.objetivo || "";

        // Imagens
        const container = document.getElementById("campaign-images-container");
        campanha.imagens?.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.style.width = "100px";
            img.style.margin = "5px";
            container.appendChild(img);
        });

        // Vídeo
        if (campanha.video) {
            const video = document.getElementById("video-player");
            video.src = campanha.video;
            video.style.display = "block";
        }

        // Tabela ESQUERDA
        if (campanha.selectedCryptos) {
            localStorage.setItem("selectedCryptos", JSON.stringify(campanha.selectedCryptos));
        }

        // Tabela DIREITA
        if (campanha.criptomoedas) {
            preencherTabelaDireitaSalva(campanha.criptomoedas);
        }

        // Bloqueios
        if (campanha.bloqueado) {
            document.getElementById("campaign-name").disabled = true;
            document.getElementById("campaign-period").disabled = true;
            document.getElementById("crypto-table").classList.add("disabled-table");
        }
    }
});
