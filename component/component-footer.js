(() => {
    if (!WillyHorizont.UtilsWeb || !WillyHorizont.UtilsDate) return;

    const htmlElementFooter = document.body.querySelector("footer");

    htmlElementFooter.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
            <div style="display: flex; flex-direction: column; align-items: center; border-top: 1px solid var(--light-border-color); margin-top: 16px;">
                <p>Made with ❤️ by Willy Horizont</p>
                <div id="footer" style="width: 100%; display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap; background-color: var(--accent-color-2); color: var(--dark-text-color);">
                </div>
            </div>
        `));
    
    const renderClock = () => {
        const [clockPartAa, clockPartBb, clockPartCc, clockPartDd] = WillyHorizont.Utils.getClock({ includeSecond: true, includeMiliSecond: false }).split(" | ");
        document.getElementById("footer").innerHTML = (/*html*/`
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
