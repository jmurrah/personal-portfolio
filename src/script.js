window.onload = () => {
    const buttons = document.querySelectorAll("#experience button");
    const descriptions = document.querySelectorAll("#experience div[id]");

    document.querySelector("#experience").addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() === 'button') {
            const buttonName = event.target.textContent.trim().toLowerCase();

            buttons.forEach(button => {
                button.classList.remove("bg-red-600");
            });
            descriptions.forEach(description => description.style.display = "none");

            document.getElementById(buttonName).style.display = "block";
            event.target.classList.add("bg-red-600");
        }
    });
}