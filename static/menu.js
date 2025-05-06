

   document.getElementById("menu-more").addEventListener("click", function (event) {
    event.preventDefault();
    let menu = this.parentElement.querySelector(".menu-container"); // Apenas o menu correto

    if (menu.style.visibility === "visible") {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
    } else {
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
    }
});






