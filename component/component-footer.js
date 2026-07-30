(async () => {
    if (!WillyHorizont.UtilsWeb || !WillyHorizont.UtilsDate) return;

    const htmlElementFooter = document.body.querySelector("footer");

    htmlElementFooter.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(WillyHorizont.UtilsWeb.removeTemplateStringIndentation(/*html*/`
            <div style="display: flex; flex-direction: column; align-items: center; border-top: 1px solid var(--light-border-color);">
                <p style="margin-top: 8px;">Made with ❤️ by Willy Horizont</p>
                <div style="width: 100%; display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap;">
                    <p style="text-align: center;">Version: 2.3.3 • Last updated: 30 Jul 2026 @ 06:43 PM</p>
                </div>
                <div id="footer" style="width: 100%; display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap; background-color: var(--accent-color-2); color: var(--dark-text-color);">
                </div>
            </div>
        `)));

    const renderClock = () => {
        const [clockPartAa, clockPartBb, clockPartCc, clockPartDd] = WillyHorizont.Utils.getClock({ includeSecond: true, includeMiliSecond: false }).split(" | ");
        document.getElementById("footer").innerHTML = WillyHorizont.UtilsWeb.removeTemplateStringIndentation(/*html*/`
                <div style="display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap;">
                    <p style="text-align: right; padding-right: 2px;">${clockPartAa} |</p>
                    <p style="text-align: right; padding-left: 2px; padding-right: 2px;">${clockPartBb} |</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap;">
                    <p style="text-align: right; padding-right: 2px;">${clockPartCc} |</p>
                    <p style="text-align: right; padding-left: 2px;">${clockPartDd}</p>
                </div>
            `);
    };

    // renderClock();

    setInterval(renderClock, WillyHorizont.UtilsDate.ONE_SECOND_IN_MILLISECOND);
})();
