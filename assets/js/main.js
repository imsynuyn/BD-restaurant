document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".nav-toggle");
    const overlay = document.querySelector(".nav-overlay");
    const nav = document.querySelector(".nav");
    const isMobile = window.matchMedia("(max-width: 991.98px)");

    if (!toggleBtn || !nav) {
        console.error("Thiếu .nav-toggle hoặc .nav");
        return;
    }

    function setMenu(open) {
        document.body.classList.toggle("menu-open", open);
        toggleBtn.setAttribute("aria-expanded", open);
        toggleBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        if (!open) {
            nav.querySelectorAll(".navbar-item--sub.open").forEach((el) => el.classList.remove("open"));
        }
    }

    toggleBtn.addEventListener("click", () => {
        setMenu(!document.body.classList.contains("menu-open"));
    });

    if (overlay) overlay.addEventListener("click", () => setMenu(false));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
    });

    const parentLink = nav.querySelector(".hasSubnav");
    if (parentLink) {
        parentLink.addEventListener("click", (e) => {
            if (!isMobile.matches) return;
            e.preventDefault();
            e.stopPropagation();
            parentLink.parentElement.classList.toggle("open");
        });
    }

    nav.querySelectorAll("a").forEach((link) => {
        if (link === parentLink) return;
        link.addEventListener("click", () => {
            if (isMobile.matches) setMenu(false);
        });
    });

    isMobile.addEventListener("change", (e) => {
        if (!e.matches) setMenu(false);
    });
});
