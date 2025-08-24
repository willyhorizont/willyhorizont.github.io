/*
req:
    utilsWeb
*/

const arrayOfPathSegment = window.location.pathname.replace(/\/+$/, "").split("/");
const relativePath = arrayOfPathSegment.map((pathSegment) => (pathSegment ? (`../`) : "")).join("");

function toggleNavbarMenu() {
    const htmlElementNavbar = document.getElementById("navbar");
    const htmlElementNavbarMenuList = htmlElementNavbar.querySelector("ul");
    const htmlElementHamburgerMenuButton = htmlElementNavbar.querySelector(".navbar-hamburger-menu-button");
    const isNavbarMenuSmallScreen = htmlElementNavbar.classList.toggle("navbar-menu-small-screen");

    function handleEventClickOutsideHtmlElementNavbarMenuSmallScreen(event) {
        if (htmlElementNavbarMenuList.contains(event.target)) return;
        if (htmlElementHamburgerMenuButton.contains(event.target)) return;

        htmlElementNavbar.classList.remove("navbar-menu-small-screen");
        document.removeEventListener("click", handleEventClickOutsideHtmlElementNavbarMenuSmallScreen);
    }

    if (isNavbarMenuSmallScreen) {
        document.addEventListener("click", handleEventClickOutsideHtmlElementNavbarMenuSmallScreen);
    } else {
        document.removeEventListener("click", handleEventClickOutsideHtmlElementNavbarMenuSmallScreen);
    }
}

function toggleTheme(htmlElementToggleThemeButton) {
    const newTheme = ((document.documentElement.getAttribute("data-theme") === "dark") ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", newTheme);
    htmlElementToggleThemeButton.querySelector("button").textContent = ((newTheme === "dark") ? "🌞" : "🌙");
    localStorage.setItem("theme", newTheme);
}

function syncThemeWithLocalStorageData() {
    const currentTheme = (localStorage.getItem("theme") || "light");
    document.getElementById("toggle-theme-button").textContent = ((currentTheme === "dark") ? "🌞" : "🌙");
    document.documentElement.setAttribute("data-theme", currentTheme);
}

const htmlElementHeader = document.body.querySelector("header");

htmlElementHeader.appendChild(utilsWeb.createHtmlElement(/*html*/
`           <nav id="navbar" class="navbar">
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
                    <li class="navbar-menu-item toggle-theme-button-container" onclick="toggleTheme(this)">
                        <button id="toggle-theme-button" class="toggle-theme-button">🌙</button>
                    </li>
                    <li class="navbar-menu-item navbar-hamburger-menu-close-button" onclick="toggleNavbarMenu()">✖</li>
                </ul>
                <span class="navbar-hamburger-menu-button" onclick="toggleNavbarMenu()">&#9776;</span>
            </nav>`));

htmlElementHeader.querySelectorAll('[data-id="navbar-menu-item"]').forEach((htmlElementNavbarMenuItem) => {
    const htmlElementNavbarMenuItemAnchorTagHref = htmlElementNavbarMenuItem.querySelector("a").getAttribute("href");
    if ((((window.location.pathname === "/") && (htmlElementNavbarMenuItemAnchorTagHref === "/")) === false) && ((htmlElementNavbarMenuItemAnchorTagHref === (`/${arrayOfPathSegment[1] || ""}`)) === false)) return;
    htmlElementNavbarMenuItem.classList.add("navbar-menu-item-selected");
});

syncThemeWithLocalStorageData();
