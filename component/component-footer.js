(async () => {
    if (!WillyHorizont.UtilsWeb || !WillyHorizont.UtilsDate) return;

    const repoOwner = "willyhorizont";
    const repoName = "willyhorizont.github.io";
    const LOCAL_STORAGE_KEY_SITE_LAST_CHECKED_UPDATED_DATE = "site-last-checked-updated-date";
    const LOCAL_STORAGE_KEY_SITE_LAST_CHECKED_VERSION = "site-last-checked-version";
    const LOCAL_STORAGE_KEY_LAST_CHECK_VERSION_DATE = "site-last-check-version-date";

    const lastCheckVersionDate = localStorage.getItem(LOCAL_STORAGE_KEY_LAST_CHECK_VERSION_DATE);

    const getSiteUpdatedDate = async () => {
        let getSiteUpdatedDateResult = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_SITE_LAST_CHECKED_UPDATED_DATE));

        if ((lastCheckVersionDate !== null) && (WillyHorizont.Utils.getMinutesDifference(new Date().getTime().toString(), lastCheckVersionDate) <= 5)) return getSiteUpdatedDateResult;

        try {
            const apiResponseCommit = await WillyHorizont.Utils.fetchThrowErrorIfNotOk(`https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=1`);
            const commitData = await apiResponseCommit.json();
            getSiteUpdatedDateResult = ((commitData.length > 0) ? commitData[0].commit.committer.date : null);
            localStorage.setItem(LOCAL_STORAGE_KEY_SITE_LAST_CHECKED_UPDATED_DATE, JSON.stringify(getSiteUpdatedDateResult));
        } catch (error) {
            // console.error("Failed checking for update date:", error);
        }
        return getSiteUpdatedDateResult;
    };
    const siteUpdatedDateIsoString = await getSiteUpdatedDate();
    const { zeroPaddedDay, monthThreeFirstLetter, fullYear, zeroPaddedHourTwelveHourClock, zeroPaddedMinute, twelveHourClockLatinAbbreviation } = WillyHorizont.Utils.extractDate(siteUpdatedDateIsoString);
    const siteUpdatedDatePrettyString = `${zeroPaddedDay} ${monthThreeFirstLetter} ${fullYear} @ ${zeroPaddedHourTwelveHourClock}:${zeroPaddedMinute} ${twelveHourClockLatinAbbreviation}`;

    const siteVersion = "2.0.4";

    const htmlElementFooter = document.body.querySelector("footer");

    htmlElementFooter.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(WillyHorizont.UtilsWeb.removeTemplateStringIndentation(/*html*/`
            <div style="display: flex; flex-direction: column; align-items: center; border-top: 1px solid var(--light-border-color);">
                <p style="margin-top: 8px;">Made with ❤️ by Willy Horizont</p>
                <div style="width: 100%; display: flex; flex-direction: row; justify-content: center; flex-wrap: wrap;">
                    <p style="text-align: center;">${siteVersion} • Last updated: ${siteUpdatedDatePrettyString}</p>
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
