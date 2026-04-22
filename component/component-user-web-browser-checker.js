(async () => {
    if (!WillyHorizont.UtilsWeb) return;

    const isUserUsingChromiumBasedWebBrowser = WillyHorizont.UtilsWeb.checkIsUserUsingChromiumBasedWebBrowser();
    // console.log({ isUserUsingChromiumBasedWebBrowser });

    if (!isUserUsingChromiumBasedWebBrowser) {
        // window.location.href = "/unsupported-web-browser-detected";
        const { openPopup } = WillyHorizont.UtilsWeb.initializeComponentPopup({
            popupId: "component-user-web-browser-checker-not-chrome",
            popupStackingOrder: 1,
            titleString: "Warning!",
            htmlTemplateStringContentChildren: [
                (/*html*/`
                    <p>This website is better in latest stable Google Chrome.</p>
                `),
                (/*html*/`
                    <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer" style="color:blue;">Download Google Chrome</a>
                `),
            ],
        });
        openPopup();
        return;
    }

    const isUserUsingLatestStableChromiumBasedWebBrowser = await WillyHorizont.UtilsWeb.checkIsUserUsingMinimumStableChromiumBasedWebBrowser();
    // console.log({ isUserUsingLatestStableChromiumBasedWebBrowser });

    if (!isUserUsingLatestStableChromiumBasedWebBrowser) {
        const { openPopup } = WillyHorizont.UtilsWeb.initializeComponentPopup({
            popupId: "component-user-web-browser-checker-chrome-need-update",
            popupStackingOrder: 1,
            titleString: "Warning!",
            htmlTemplateStringContentChildren: [
                (/*html*/`
                    <p>This website is better in latest stable Google Chrome.</p>
                `),
                (/*html*/`
                    <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer" style="color:blue;">Update Google Chrome</a>
                `),
            ],
        });
        openPopup();
        return;
    }
})();
