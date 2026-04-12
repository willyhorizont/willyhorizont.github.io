(() => {
    if (!WillyHorizont.UtilsWeb || !WillyHorizont.UtilsDate) return;

    const htmlElementFooter = document.body.querySelector("footer");

    htmlElementFooter.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
            <div style="display: flex; flex-direction: column; align-items: center; padding: 8px;">
                <p>Made with ❤️ by Willy Horizont</p>
                <p id="clock"></p>
            </div>
        `));

    setInterval(() => {
        document.getElementById("clock").textContent = WillyHorizont.Utils.generateTimestamp({ includeSecond: true, includeMiliSecond: false });
    }, WillyHorizont.UtilsDate.ONE_SECOND_IN_MILLISECOND);
})();
