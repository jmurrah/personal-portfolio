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

function openMenu() {
    document.getElementById("menu").style.display = "flex";
    document.getElementById("menu-btn").style.display = "none";
    document.getElementById("content").classList.add("blur-effect");
    document.getElementById("footer").classList.add("blur-effect");
    document.body.style.overflow = "hidden";
}

function closeMenu() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("menu-btn").style.display = "block";
    document.getElementById("content").classList.remove("blur-effect");
    document.getElementById("footer").classList.remove("blur-effect");
    document.body.style.overflow = "";
}

function handleResize() {
    if (window.innerWidth >= 686) {
        closeMenu();
        document.body.classList.remove("blur-effect");
        document.getElementById("menu").style.display = "none";
    } else {
        document.getElementById("menu-btn").style.display = "block";
    }
}

window.onload = () => {
    document.querySelector("#initial-click").style.backgroundColor = "#a35bff";
    document.querySelector("#exp-btns").addEventListener("click", (event) => changeDisplayedExperience(event));
    document.querySelector("#logo").addEventListener("click", () => scrollToTop());
    document.querySelector("#menu-btn").addEventListener("click", () => openMenu());
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", (event) => {
        const menu = document.getElementById("menu");
        const menuBtn = document.getElementById("menu-btn");
        if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
            closeMenu();
        }
    });
    document.querySelectorAll("#menu a:not(:last-child)").forEach(button => {
        button.addEventListener("click", () => closeMenu());
    });
}