function scrollToTop () {
    window.scrollTo(0, 0);
    history.replaceState(null, null, window.location.pathname);
}


function changeDisplayedExperience(event) {
    const buttons = document.querySelectorAll("#exp-btns button");
    const descriptions = document.querySelectorAll("#exp-desc div");
    const clickedButton = event.target.textContent.trim().toLowerCase();
    
    buttons.forEach(button => {
        button.style.backgroundColor = "";
    });
    descriptions.forEach(description => description.style.display = "none");

    document.getElementById(clickedButton).style.display = "block";
    event.target.style.backgroundColor = "#a35bff";
}


window.onload = () => {
    document.querySelector("#initial-click").style.backgroundColor = "#a35bff";
    document.querySelector("#exp-btns").addEventListener("click", (event) => changeDisplayedExperience(event));
    document.querySelector("#logo").addEventListener("click", () => scrollToTop());
}