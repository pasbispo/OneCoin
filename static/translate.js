function changeLanguage() {
    var select = document.getElementById("language-select");
    var flag = document.getElementById("language-flag");
    var selectedOption = select.options[select.selectedIndex];
    
    var flagSrc = selectedOption.getAttribute("data-flag");
    flag.src = flagSrc;
}
    // Atualiza a bandeira
    var selectedOption = select.options[select.selectedIndex];
    var flagSrc = selectedOption.getAttribute("data-flag");
    flag.src = flagSrc;

    // Carrega o JSON e altera os textos
    fetch("./static/translations.json")

        .then(response => response.json())
        .then(data => {
            document.getElementById("welcome-text").textContent = data[selectedLang].welcome;
            document.getElementById("description-text").textContent = data[selectedLang].description;
            document.getElementById("search-bar").placeholder = data[selectedLang].search_placeholder;
            document.getElementById("login-button").textContent = data[selectedLang].login;
            document.getElementById("signup-button").textContent = data[selectedLang].signup;

            // Atualiza os itens do menu
            document.getElementById("menu-how").textContent = data[selectedLang].menu.how_to_start;
            document.getElementById("menu-what").textContent = data[selectedLang].menu.what_is;
            document.getElementById("menu-open").textContent = data[selectedLang].menu.open_campaigns;
            document.getElementById("menu-my").textContent = data[selectedLang].menu.my_campaigns;
            document.getElementById("menu-partners").textContent = data[selectedLang].menu.partners;
            document.getElementById("menu-more").textContent = data[selectedLang].menu.more;
        });

