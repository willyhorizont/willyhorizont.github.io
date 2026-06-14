(async () => {
    if (!WillyHorizont.UtilsWeb || !WillyHorizont.Utils) return;

    const isInDarkMode = (document.documentElement.getAttribute("data-theme") === "dark");

    const getProgrammingLanguagesJsonUrl = "https://raw.githubusercontent.com/willyhorizont/cross-language-programming-concepts/refs/heads/main/languages.json";
    const getProgrammingLanguagesJsonResponse = await WillyHorizont.Utils.fetchThrowErrorIfNotOk(getProgrammingLanguagesJsonUrl);
    const getProgrammingLanguagesJsonResponseJson = await getProgrammingLanguagesJsonResponse.json();

    const [programmingLanguageBarChartContainerInnerHtml, programmingLanguagesTextContainerInnerHtml] = (getProgrammingLanguagesJsonResponseJson.reduce((([programmingLanguageBarChartContainerInnerHtmlCurrent, programmingLanguagesTextContainerInnerHtmlCurrent], programmingLanguage, programmingLanguageIndex) => {
        const styles = window.getComputedStyle(document.documentElement);
        const darkBackgroundColor = styles.getPropertyValue('--dark-background-color').trim();
        const lightBackgroundColor = styles.getPropertyValue('--light-background-color').trim();

        const howCloseRgbHexColorPercentageInDarkMode = WillyHorizont.Utils.getHowCloseRgbHexColor(darkBackgroundColor, programmingLanguage["color"]);
        const howCloseRgbHexColorPercentageInLightMode = WillyHorizont.Utils.getHowCloseRgbHexColor(lightBackgroundColor, programmingLanguage["color"]);

        const darkBorderColor = ((howCloseRgbHexColorPercentageInDarkMode > 80) ? "var(--light-border-color)" : programmingLanguage["color"]);
        const lightBorderColor = ((howCloseRgbHexColorPercentageInLightMode > 70) ? "var(--dark-border-color)" : programmingLanguage["color"]);

        return ([
            WillyHorizont.UtilsWeb.removeTemplateStringIndentation(programmingLanguageBarChartContainerInnerHtmlCurrent.trimStart() + /*html*/`
                                            <div data-id="programming-language-percentage" data-dark-border-color="${darkBorderColor}" data-light-border-color="${lightBorderColor}" style="border-radius: ${(programmingLanguageIndex === 0) ? '6px 0 0 6px' : (programmingLanguageIndex === (getProgrammingLanguagesJsonResponseJson.length - 1)) ? '0 6px 6px 0' : 0}; min-width: 28px; flex: 1; height: 8px; background-color: ${programmingLanguage["color"]}; border: 1px solid ${isInDarkMode ? darkBorderColor : lightBorderColor};">
                                            </div>
            `),
            WillyHorizont.UtilsWeb.removeTemplateStringIndentation(programmingLanguagesTextContainerInnerHtmlCurrent.trimStart() + /*html*/`
                                            <a data-id="programming-language-text" href="https://github.com/willyhorizont/cross-language-programming-concepts/tree/main/languages/${programmingLanguage["id"]}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: flex; flex-direction: row; align-items: center; margin-right: 16px;">
                                                <div data-id="github-programming-language-color-code" data-dark-border-color="${darkBorderColor}" data-light-border-color="${lightBorderColor}" style="width: 0.5em; height: 0.5em; border-radius: 50%; margin-right: 8px; aspect-ratio: 1; background-color: ${programmingLanguage["color"]}; border: 1px solid ${isInDarkMode ? darkBorderColor : lightBorderColor};"></div>
                                                <p style="font-size: 0.75em; font-weight: 600; margin-right: 8px; word-break: break-word;">${programmingLanguage["stack"].map((programmingLanguageStack) => (programmingLanguageStack["name"])).join(" / ")}</p>
                                                <p style="font-size: 0.75em;">${(100 / getProgrammingLanguagesJsonResponseJson.length).toFixed(2)}%</p>
                                            </a>
            `),
        ]);
    }), ["", ""]));

    document.getElementById("placeholder-github-programming-languages-card").innerHTML = WillyHorizont.UtilsWeb.removeTemplateStringIndentation(/*html*/`
                        <div data-id="programming-languages-card" class="programming-languages-card" style="display: flex; flex-direction: column; flex-wrap: wrap; row-gap: 8px; border: 1px solid var(--light-border-color); border-radius: 6px; padding: 8px; width: calc(100vw - 48px);">
                            <div style="display: flex; justify-content: center; align-items: center;">
                                <div style="display: flex; flex-direction: column; width: calc(100vw - 68px);">
                                    <p style="margin-bottom: 16px; font-weight: 600;">Programming Languages</p>
                                    <div data-id="programming-languages-bar-chart-container" class="programming-languages-bar-chart-container" style="display: flex; min-width: calc(100vw - 68px); width: max-content; border-radius: 6px; column-gap: 4px; background-color: ${isInDarkMode ? 'var(--dark-background-color)' : 'var(--light-background-color)'};">
                                        ${programmingLanguageBarChartContainerInnerHtml}
                                    </div>
                                    <div id="programming-languages-text-container" style="display: flex; flex-direction: row; margin-top: 8px; flex-wrap: wrap; row-gap: 8px; padding: 4px; width: calc(100vw - 48px);">
                                        ${programmingLanguagesTextContainerInnerHtml}
                                    </div>
                                </div>
                            </div>
                        </div>
    `);

    WillyHorizont.UtilsWeb.setupDataThemeObserver((currentTheme) => {
        const htmlElementProgrammingLanguagesCard = document.querySelector(`[data-id="programming-languages-card"]`);
        const htmlElementProgrammingLanguagesBarChartContainer = htmlElementProgrammingLanguagesCard.querySelector(`[data-id="programming-languages-bar-chart-container"]`);
        if (currentTheme === "dark") {
            htmlElementProgrammingLanguagesCard.style.border = "1px solid var(--dark-border-color)";
            htmlElementProgrammingLanguagesBarChartContainer.style.backgroundColor = "var(--dark-background-color)";
            document.querySelectorAll(`[data-id="github-programming-language-color-code"]`).forEach((htmlElementGithubProgrammingLanguageColorCode) => {
                htmlElementGithubProgrammingLanguageColorCode.style.borderColor = htmlElementGithubProgrammingLanguageColorCode.getAttribute("data-dark-border-color");
            });
            document.querySelectorAll(`[data-id="programming-language-percentage"]`).forEach((htmlElementProgrammingLanguagePercentage) => {
                htmlElementProgrammingLanguagePercentage.style.borderColor = htmlElementProgrammingLanguagePercentage.getAttribute("data-dark-border-color");
            });
            return;
        }
        if (currentTheme === "light") {
            htmlElementProgrammingLanguagesCard.style.border = "1px solid var(--light-border-color)";
            htmlElementProgrammingLanguagesBarChartContainer.style.backgroundColor = "var(--light-background-color)";
            document.querySelectorAll(`[data-id="github-programming-language-color-code"]`).forEach((htmlElementGithubProgrammingLanguageColorCode) => {
                htmlElementGithubProgrammingLanguageColorCode.style.borderColor = htmlElementGithubProgrammingLanguageColorCode.getAttribute("data-light-border-color");
            });
            document.querySelectorAll(`[data-id="programming-language-percentage"]`).forEach((htmlElementProgrammingLanguagePercentage) => {
                htmlElementProgrammingLanguagePercentage.style.borderColor = htmlElementProgrammingLanguagePercentage.getAttribute("data-light-border-color");
            });
            return;
        }
    });
})();
