const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  
    const btn = document.getElementById("theme-toggle");
    if (!btn) return; 

    btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
});