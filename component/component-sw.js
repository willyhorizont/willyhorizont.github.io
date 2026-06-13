(() => {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js").then((reg) => {
                console.log("Service Worker registration success:", reg.scope);

                reg.addEventListener("updatefound", () => {
                    const newWorker = reg.installing;
                    if (!newWorker) return;

                    newWorker.addEventListener("statechange", () => {
                        if ((newWorker.state === "installed") && navigator.serviceWorker.controller) {
                            const IS_IN_DEVELOPMENT_MODE = ((window.location.hostname === "localhost") || (window.location.hostname === "127.0.0.1"));
                            
                            if (!IS_IN_DEVELOPMENT_MODE) {
                                alert("Website has been updated! The page will be reloaded to the newest version.");
                            }
                            window.location.reload();
                        }
                    });
                });
            }).catch((err) => {
                console.log("Service Worker registration failed:", err);
            });
        });
    }
})();
