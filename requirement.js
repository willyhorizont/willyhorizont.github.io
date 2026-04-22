function checkIsUserUsingInternetExplorerWebBrowser() {
    return !!document.documentMode;
}
function checkIsUserUsingGeckoWebBrowser() {
    return (
        (typeof InstallTrigger !== "undefined") &&
        ((typeof CSS !== "undefined") && ("supports" in CSS) && (typeof CSS.supports === "function") && (CSS.supports("-moz-appearance", "none"))) &&
        true
    );
}
function checkIsUserUsingWebKitWebBrowser() {
    return (
        ((typeof document !== "undefined") && ("documentElement" in document) && (typeof document.documentElement !== "undefined") && ("style" in document.documentElement) && (typeof document.documentElement.style !== "undefined") && ("WebkitAppearance" in document.documentElement.style)) &&
        ((typeof CSS !== "undefined") && ("supports" in CSS) && (typeof CSS.supports === "function") && (CSS.supports("-webkit-touch-callout", "none"))) &&
        true
    )
}
function checkIsUserUsingChromiumBasedWebBrowser() {
    return (
        ((typeof window !== "undefined") && ("chrome" in window) && (typeof window.chrome !== "undefined")) &&
        // ((typeof navigator !== "undefined") && ("userAgentData" in navigator) && (typeof navigator.userAgentData !== "undefined") && ("getHighEntropyValues" in navigator.userAgentData) && (typeof navigator.userAgentData.getHighEntropyValues === "function")) &&
        true
    );
}
function checkIsUserWebBrowserHasRequiredFeatures() {
    return (

        (typeof Worker !== "undefined") &&

        (!!document.createElement("canvas").getContext) &&

        (!!document.createElement("video").canPlayType) &&

        (!!document.querySelector) &&

        (
            ("content" in document.createElement("template")) &&

            (typeof document.createElement("template").content !== "undefined") &&

            true

        ) &&

        (
            ((function () {
                const input = document.createElement("input");
                input.type = "date";
                return (input.type === "date");
            })()) &&

            true

        ) &&

        (typeof Promise !== "undefined") &&

        (typeof Set !== "undefined") &&

        (typeof Symbol !== "undefined") &&

        (typeof BigInt !== "undefined") &&

        (typeof fetch === "function") &&

        (typeof requestAnimationFrame === "function") &&

        (typeof cancelAnimationFrame === "function") &&

        ("querySelector" in document) &&

        ("localStorage" in window) &&

        (
            (typeof String !== "undefined") &&
            (

                ("prototype" in String) &&
                (typeof String.prototype !== "undefined") &&
                (

                    ("trim" in String.prototype) &&
                    (typeof String.prototype.trim === "function") &&

                    ("includes" in String.prototype) &&
                    (typeof String.prototype.includes === "function") &&

                    ("padStart" in String.prototype) &&
                    (typeof String.prototype.padStart === "function") &&

                    ("startsWith" in String.prototype) &&
                    (typeof String.prototype.startsWith === "function") &&

                    ("repeat" in String.prototype) &&
                    (typeof String.prototype.repeat === "function") &&

                    true

                ) &&

                true

            ) &&

            true

        ) &&

        (
            (typeof Number !== "undefined") &&
            (

                ("isNaN" in Number) &&
                (typeof Number.isNaN === "function") &&

                ("isFinite" in Number) &&
                (typeof Number.isFinite === "function") &&

                true

            ) &&

            true

        ) &&

        (
            (typeof Map !== "undefined") &&
            (

                ("prototype" in Map) &&
                (typeof Map.prototype !== "undefined") &&
                (

                    ("get" in Map.prototype) &&
                    (typeof Map.prototype.get === "function") &&

                    ("set" in Map.prototype) &&
                    (typeof Map.prototype.set === "function") &&

                    true

                ) &&

                true

            ) &&

            true

        ) &&

        (
            (typeof Intl !== "undefined") &&
            (

                ("DateTimeFormat" in Intl) &&
                (typeof Intl.DateTimeFormat !== "undefined") &&

                true

            ) &&

            true

        ) &&

        (
            (typeof Object !== "undefined") &&
            (

                ("keys" in Object) &&
                (typeof Object.keys === "function") &&

                ("values" in Object) &&
                (typeof Object.values === "function") &&

                ("entries" in Object) &&
                (typeof Object.entries === "function") &&

                true

            ) &&

            true

        ) &&

        (
            (typeof Array !== "undefined") &&
            (

                ("from" in Array) &&
                (typeof Array.from === "function") &&

                ("prototype" in Array) &&
                (typeof Array.prototype !== "undefined") &&
                (

                    ("at" in Array.prototype) &&
                    (typeof Array.prototype.at === "function") &&

                    ("includes" in Array.prototype) &&
                    (typeof Array.prototype.includes === "function") &&

                    ("reduce" in Array.prototype) &&
                    (typeof Array.prototype.reduce === "function") &&

                    ("filter" in Array.prototype) &&
                    (typeof Array.prototype.filter === "function") &&

                    ("find" in Array.prototype) &&
                    (typeof Array.prototype.find === "function") &&

                    ("findIndex" in Array.prototype) &&
                    (typeof Array.prototype.findIndex === "function") &&

                    true

                ) &&

                true

            ) &&

            true

        ) &&

        (

            (typeof Reflect !== "undefined") &&
            (

                ("has" in Reflect) &&
                (typeof Reflect.has === "function") &&

                ("set" in Reflect) &&
                (typeof Reflect.set === "function") &&

                true

            ) &&

            true

        ) &&

        (

            (typeof crypto !== "undefined") &&
            (

                ("randomUUID" in crypto) &&
                (typeof crypto.randomUUID === "function") &&

                true

            ) &&

            true

        ) &&

        (

            (typeof CSS !== "undefined") &&
            (

                ("supports" in CSS) &&
                (typeof CSS.supports === "function") &&
                (
                    CSS.supports("display", "flex") &&
                    CSS.supports("position", "sticky") &&
                    true
                ) &&

                true

            ) &&

            true

        ) &&

        true
    );
}
function blockUser() {
    const unsupportedWebBrowserUrl = "unsupported-web-browser-detected";
    if (window.location.pathname.includes(unsupportedWebBrowserUrl)) return;
    window.location.href = `/${unsupportedWebBrowserUrl}`;
}
function detectBrowser() {
    if (checkIsUserUsingInternetExplorerWebBrowser()) return "InternetExplorer";
    if (checkIsUserUsingGeckoWebBrowser()) return "Gecko";
    if (checkIsUserUsingWebKitWebBrowser()) return "WebKit";
    if (checkIsUserUsingChromiumBasedWebBrowser()) return "ChromiumBased";
    return "Unknown";
}
function checkIsUserWebBrowserSupported() {
    if (window.location.pathname.includes("web-browser-detector")) return;
    if (checkIsUserUsingInternetExplorerWebBrowser()) {
        blockUser();
        return;
    }
    const isRenderingEngineSupported = (checkIsUserUsingGeckoWebBrowser() || checkIsUserUsingWebKitWebBrowser() || checkIsUserUsingChromiumBasedWebBrowser());
    const isUserWebBrowserHasRequiredFeatures = checkIsUserWebBrowserHasRequiredFeatures();
    if (isRenderingEngineSupported && isUserWebBrowserHasRequiredFeatures) return;
    blockUser();
}
checkIsUserWebBrowserSupported();
