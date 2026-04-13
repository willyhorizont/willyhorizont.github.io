(() => {
    if (!WillyHorizont.UtilsWeb || !WillyHorizont.UtilsDate) return;

    const htmlElementFooter = document.body.querySelector("footer");

    htmlElementFooter.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
            <div style="display: flex; flex-direction: column; align-items: center; border-top: 1px solid var(--light-border-color); margin-top: 16px;">
                <p>Made with ❤️ by Willy Horizont</p>
                <div id="footer" style="display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap; width: 100%; background-color: var(--accent-color-2); color: var(--dark-text-color);">
                </div>
            </div>
        `));

    setInterval(() => {
        const [clockPartAa, clockPartBb, clockPartCc, clockPartDd] = WillyHorizont.Utils.generateTimestamp({ includeSecond: true, includeMiliSecond: false }).split(" | ");
        document.getElementById("footer").innerHTML = (/*html*/`
                <p>${clockPartAa} | ${clockPartBb}</p>
                <p>${clockPartCc} | ${clockPartDd}</p>
            `);
    }, WillyHorizont.UtilsDate.ONE_SECOND_IN_MILLISECOND);
})();
