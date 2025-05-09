document.getElementById("crypto-amount").addEventListener("input", function() {
    document.getElementById("extra-box").classList.remove("hidden");
});

// Função para alterar a criptomoeda escolhida
function selectCrypto(crypto) {
    document.getElementById("crypto-image").src = `static/img/${crypto}.png`;
}




function selectCrypto(crypto) {
    let cryptoImage = document.getElementById("crypto-image");
    cryptoImage.src = `static/img/${crypto}.png`;
    cryptoImage.classList.remove("hidden"); // Exibir imagem
}


document.querySelector(".logo-container img").addEventListener("click", function() {
    window.location.href = "index.html";
});



function filterCryptos() {
    let input = document.getElementById("search-bar").value.toLowerCase();
    let images = document.querySelectorAll(".crypto-list img");

    images.forEach(img => {
        let cryptoName = img.getAttribute("alt").toLowerCase();
        if (cryptoName.includes(input)) {
            img.style.display = "inline-block";
        } else {
            img.style.display = "none";
        }
    });
}


function selectCrypto(crypto, name) {
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");

    cryptoImage.src = `static/img/${crypto}.png`;
    cryptoImage.classList.remove("hidden"); // Exibir imagem
    cryptoName.textContent = name; // Atualizar nome da criptomoeda
}


function limitDecimals(input) {
    let value = input.value;
    
    // Permitir apenas números e ponto decimal
    value = value.replace(/[^0-9.]/g, '');

    // Certificar que há apenas um ponto decimal
    let parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limitar para no máximo oito casas decimais
    if (parts.length === 2 && parts[1].length > 8) {
        parts[1] = parts[1].substring(0, 8);
        value = parts.join('.');
    }

    input.value = value;
}


function selectCrypto(crypto, name) {
    let cryptoImage = document.getElementById("crypto-image");
    let cryptoName = document.getElementById("crypto-name");

    cryptoImage.src = `static/img/${crypto}.png`;
    cryptoImage.classList.remove("hidden"); // Exibir imagem
    cryptoName.textContent = name; // Atualizar nome da criptomoeda
}



