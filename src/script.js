window.onload = () => {
    document.querySelectorAll("#experience button").forEach(button => {
        button.addEventListener("click", () => {
            const buttonName = button.textContent.trim().toLowerCase();
            const descriptions = document.querySelectorAll("#experience div[id]");
            console.log(buttonName)
            console.log(descriptions);
            
            descriptions.forEach(description => {
                if (description.id !== buttonName) {
                    description.style.display = "none";
                } else {
                    description.style.display = "block";
                }
            });
        });
    });
}