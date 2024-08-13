function scrollToTop () {
    window.scrollTo(0, 0);
    history.replaceState(null, null, window.location.pathname);
}


function changeDisplayedExperience(event) {
    const buttons = document.querySelectorAll("#experience button");
    const descriptions = document.querySelectorAll("#experience div[id]");

    if (event.target.tagName.toLowerCase() === 'button') {
        const buttonName = event.target.textContent.trim().toLowerCase();
        console.log(`Button clicked: ${buttonName}`);
        buttons.forEach(button => {
            button.style.backgroundColor = "";
        });
        descriptions.forEach(description => description.style.display = "none");

        document.getElementById(buttonName).style.display = "block";
        event.target.style.backgroundColor = "#a35bff";
    }
}


window.onload = () => {
    document.querySelector("#initial-click").style.backgroundColor = "#a35bff";
    document.querySelector("#experience").addEventListener("click", (event) => changeDisplayedExperience(event));
    document.querySelector("#logo").addEventListener("click", () => scrollToTop());
}