(async () => {
    if (!WillyHorizont.UtilsWeb || !WillyHorizont.UtilsDate || !WillyHorizont.Utils) return;

    const htmlElementFooter = document.body.querySelector("footer");
    if (!htmlElementFooter) return;

    htmlElementFooter.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(WillyHorizont.UtilsWeb.removeTemplateStringIndentation(/*html*/`
            <div style="display: flex; flex-direction: column; align-items: center; border-top: 1px solid var(--light-border-color);">
                <p style="margin-top: 8px;">Made with ❤️ by Willy Horizont</p>
                <div style="width: 100%; display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap;">
                    <p style="text-align: center;">Version: 2.3.16 • Last updated: 02 Sep 2026 @ 06:15 AM</p>
                </div>
                <div id="footer" style="width: 100%; display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap; background-color: var(--accent-color-2); color: var(--dark-text-color);">
                </div>
            </div>
        `)));

    const footerClockContainer = document.getElementById("footer");

    htmlElementFooter.onclick = function () {
        const asd = WillyHorizont.Utils.getClock({ includeSecond: true, includeMiliSecond: false });
        navigator.clipboard.writeText(asd).then(() => {
            alert("clock copied!");
        }).catch((err) => {
            console.error("Error:", err);
        });
    };

    const renderClock = () => {
        if (!footerClockContainer) return;
        const [clockPartAa, clockPartBb, clockPartCc, clockPartDd, clockPartEe] = WillyHorizont.Utils.getClock({ includeSecond: true, includeMiliSecond: false }).split(" | ");
        footerClockContainer.innerHTML = WillyHorizont.UtilsWeb.removeTemplateStringIndentation(/*html*/`
                <div style="display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap;">
                    <p style="text-align: right;">${clockPartAa} |</p>
                    <p style="text-align: right; padding-left: 8px;">${clockPartBb} |</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap;">
                    <p style="text-align: right; padding-left: 8px;">${clockPartCc} |</p>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap;">
                    <p style="text-align: right; padding-left: 8px;">${clockPartDd} |</p>
                    <p style="text-align: right; padding-left: 8px;">${clockPartEe}</p>
                </div>
            `);
    };

    renderClock();

    setInterval(renderClock, WillyHorizont.UtilsDate.ONE_SECOND_IN_MILLISECOND);
})();
