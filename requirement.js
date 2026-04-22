function checkIsUserWebBrowserHasRequiredFeatures() {
    return (
        (typeof Promise !== "undefined") &&
        (typeof Set !== "undefined") &&
        (typeof Symbol !== "undefined") &&
        (typeof BigInt !== "undefined") &&
        (typeof fetch === "function") &&
        (typeof requestAnimationFrame === "function") &&
        (typeof cancelAnimationFrame === "function") &&
        ("localStorage" in window) &&

        (typeof document !== "undefined") &&
        ("querySelector" in document) &&
        ("createElement" in document) &&
        (typeof document.createElement === "function") &&
        (typeof document.createElement("template") !== "undefined") &&
        ("content" in document.createElement("template")) &&   
        (typeof document.createElement("template").content !== "undefined") &&

        (typeof String !== "undefined") &&
        ("prototype" in String) &&
        (typeof String.prototype !== "undefined") &&
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

        (typeof Number !== "undefined") &&
        ("isNaN" in Number) &&
        (typeof Number.isNaN === "function") &&
        ("isFinite" in Number) &&
        (typeof Number.isFinite === "function") &&

        (typeof Map !== "undefined") &&
        ("prototype" in Map) &&
        (typeof Map.prototype !== "undefined") &&
        ("get" in Map.prototype) &&
        (typeof Map.prototype.get === "function") &&
        ("set" in Map.prototype) &&
        (typeof Map.prototype.set === "function") &&

        (typeof Intl !== "undefined") &&
        ("DateTimeFormat" in Intl) &&
        (typeof Intl.DateTimeFormat !== "undefined") &&

        (typeof Object !== "undefined") &&
        ("keys" in Object) &&
        (typeof Object.keys === "function") &&
        ("values" in Object) &&
        (typeof Object.values === "function") &&
        ("entries" in Object) &&
        (typeof Object.entries === "function") &&

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
    const url = new URL(`${window.location.origin}/${unsupportedWebBrowserUrl}/`);
    url.searchParams.set("ref", encodeURIComponent(window.location.pathname));
    window.location.href = url.toString();
}

function checkIsUserWebBrowserUnderstandRequiredSyntax() {
    try {
        eval(`(function (k, v) { return ({ [k]: v }); })("asd", 123)`);
        eval(`(async function () { await ((async function () { return 0; })()); })()`);
        eval(`(async function () { await (new Promise(function (resolve, reject) { resolve(0); })) })()`);
        eval(`(async function () { await Promise.resolve(0); })()`);
        eval(`(async function () { await 0; })()`);
    } catch (anyError) {
        blockUser();
    }
}

function checkIsUserUsingInternetExplorerWebBrowser() {
    return !!document.documentMode;
}
function checkIsUserUsingWebKitWebBrowser() {
    return (
        ((typeof navigator !== "undefined") && ("vendor" in navigator) && (navigator.vendor === "Apple Computer, Inc.")) &&
        true
    )
}
function checkIsUserUsingGeckoWebBrowser() {
    return (
        (typeof InstallTrigger !== "undefined") &&
        true
    );
}
function checkIsUserUsingChromiumBasedWebBrowser() {
    return (
        ((typeof window !== "undefined") && ("chrome" in window) && (typeof window.chrome !== "undefined")) &&
        true
    );
}
function detectBrowser() {
    if (checkIsUserUsingInternetExplorerWebBrowser()) return "InternetExplorer";
    if (checkIsUserUsingWebKitWebBrowser()) return "WebKit";
    if (checkIsUserUsingGeckoWebBrowser()) return "Gecko";
    if (checkIsUserUsingChromiumBasedWebBrowser()) return "ChromiumBased";
    return "Unknown";
}
function checkIsUserWebBrowserSupported() {
    if (window.location.pathname.includes("web-browser-detector")) return;
    if (checkIsUserWebBrowserHasRequiredFeatures()) {
        const ref = new URLSearchParams(window.location.search).get("ref");
        if (!ref) return;
        window.location.href = decodeURIComponent(ref);
        return;
    }
    blockUser();
}
checkIsUserWebBrowserSupported();
