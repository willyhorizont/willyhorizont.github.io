/*
req:
    UtilsWeb
*/

(() => {
    const arrayOfPathSegment = window.location.pathname.replace(/\/+$/, "").split("/");
    const relativePath = arrayOfPathSegment.map((pathSegment) => (pathSegment ? (`../`) : "")).join("");

    function toggleNavbarMenu() {
        const htmlElementNavbar = document.getElementById("navbar");
        const isNavbarMenuSmallScreen = htmlElementNavbar.classList.toggle("navbar-menu-small-screen");

        function handleEventClickOutsideHtmlElementNavbarMenuSmallScreen(event) {
            if (htmlElementNavbar.contains(event.target)) return;
            htmlElementNavbar.classList.remove("navbar-menu-small-screen");
            document.removeEventListener("click", handleEventClickOutsideHtmlElementNavbarMenuSmallScreen);
        }

        if (isNavbarMenuSmallScreen) {
            document.addEventListener("click", handleEventClickOutsideHtmlElementNavbarMenuSmallScreen);
        } else {
            document.removeEventListener("click", handleEventClickOutsideHtmlElementNavbarMenuSmallScreen);
        }
    }

    function toggleTheme(event) {
        const newTheme = ((document.documentElement.getAttribute("data-theme") === "dark") ? "light" : "dark");
        document.documentElement.setAttribute("data-theme", newTheme);
        const htmlElementToggleThemeButton = event.target;
        htmlElementToggleThemeButton.textContent = ((newTheme === "dark") ? "🌞" : "🌙");
        localStorage.setItem("theme", newTheme);
    }

    function syncThemeWithLocalStorageData() {
        const currentTheme = (localStorage.getItem("theme") || "light");
        document.getElementById("toggle-theme-button").textContent = ((currentTheme === "dark") ? "🌞" : "🌙");
        document.documentElement.setAttribute("data-theme", currentTheme);
    }

    const htmlElementHeader = document.body.querySelector("header");

    const htmlElementNavbar = UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
        <nav id="navbar" class="navbar">
            <a href="/" class="app-logo">
                <img src="${relativePath}android-chrome-192x192.png" alt="Willy Horizont's logo" width="48px" height="48px" />
                <!-- <span>Willy Horizont</span> -->
            </a>
            <ul>
                <li data-id="navbar-menu-item" class="navbar-menu-item"><a href="/">Home</a></li>
                <li data-id="navbar-menu-item" class="navbar-menu-item"><a href="/portfolio">Portfolio</a></li>
                <li data-id="navbar-menu-item" class="navbar-menu-item"><a href="/cv">CV</a></li>
                <li data-id="navbar-menu-item" class="navbar-menu-item"><a href="/links">Links</a></li>
                <li data-id="navbar-menu-item" class="navbar-menu-item"><a href="/about">About</a></li>
                <li data-id="navbar-menu-item" class="navbar-menu-item"><a href="/support">Support</a></li>
                <li data-id="navbar-menu-item" class="navbar-menu-item"><a href="/contact">Contact</a></li>
                <li class="navbar-menu-item toggle-theme-button-container" id="toggle-theme-button-container">
                    <button id="toggle-theme-button" class="toggle-theme-button">🌙</button>
                </li>
                <li class="navbar-menu-item navbar-hamburger-menu-close-button" id="close-hamburger-menu-button">✖</li>
            </ul>
            <span class="navbar-hamburger-menu-button" id="open-hamburger-menu-button">&#9776;</span>
        </nav>`);
    
    htmlElementNavbar.querySelector('[id="toggle-theme-button-container"]').addEventListener("click", toggleTheme);
    htmlElementNavbar.querySelector('[id="close-hamburger-menu-button"]').addEventListener("click", toggleNavbarMenu);
    htmlElementNavbar.querySelector('[id="open-hamburger-menu-button"]').addEventListener("click", toggleNavbarMenu);

    htmlElementHeader.appendChild(htmlElementNavbar);

    htmlElementHeader.querySelectorAll('[data-id="navbar-menu-item"]').forEach((htmlElementNavbarMenuItem) => {
        const htmlElementNavbarMenuItemAnchorTagHref = htmlElementNavbarMenuItem.querySelector("a").getAttribute("href");
        if ((((window.location.pathname === "/") && (htmlElementNavbarMenuItemAnchorTagHref === "/")) === false) && ((htmlElementNavbarMenuItemAnchorTagHref === (`/${arrayOfPathSegment[1] || ""}`)) === false)) return;
        htmlElementNavbarMenuItem.classList.add("navbar-menu-item-selected");
    });

    syncThemeWithLocalStorageData();
})();
