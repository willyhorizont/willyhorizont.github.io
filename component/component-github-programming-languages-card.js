(() => {
    if (!WillyHorizont.UtilsWeb) return;

    // github languages color source: https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml
    const programmingLanguages = [
        [
            "JavaScript",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/javascript/src",
            "#f1e05a",
            5.56,
        ],
        [
            "Python",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/python",
            "#3572A5",
            5.56,
        ],
        [
            "PHP",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/php",
            "#4F5D95",
            5.56,
        ],
        [
            "Go",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/go",
            "#00ADD8",
            5.56,
        ],
        [
            "Perl",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/perl",
            "#0298c3",
            5.56,
        ],
        [
            "Julia",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/julia",
            "#a270ba",
            5.56,
        ],
        [
            "Lua",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/lua",
            "#000080",
            5.56,
        ],
        [
            "Ruby",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/ruby",
            "#701516",
            5.56,
        ],
        [
            "R",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/r",
            "#198CE7",
            5.56,
        ],
        [
            "Kotlin",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/kotlin",
            "#A97BFF",
            5.56,
        ],
        [
            "Swift",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/swift",
            "#f15c44",
            5.56,
        ],
        [
            "Dart",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/dart",
            "#009089",
            5.56,
        ],
        [
            "Visual Basic .NET",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/visual_basic_dotnet",
            "#945db7",
            5.56,
        ],
        [
            "C#",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/csharp",
            "#178600",
            5.56,
        ],
        [
            "Matlab",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/matlab",
            "#e16737",
            5.56,
        ],
        [
            "GNU Octave",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/gnu_octave",
            "#e16737",
            5.56,
        ],
        [
            "Wolfram",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/wolfram",
            "#ff4131",
            5.56,
        ],
        [
            "Raku",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/raku",
            "#357fff",
            5.56,
        ],
        [
            "Scala",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/scala",
            "#c22d40",
            5.56,
        ],
        /*
        [
            "Groovy",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/groovy",
            "#4298b8",
            5.56,
        ],
        [
            "F#",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/fsharp",
            "#b845fc",
            5.56,
        ],
        [
            "Erlang",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/erlang",
            "#B83998",
            5.56,
        ],
        [
            "Elixir",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/elixir",
            "#6e4a7e",
            5.56,
        ],
        [
            "Gleam",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/gleam",
            "#ffaff3",
            5.56,
        ],
        [
            "Clojure",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/clojure",
            "#db5855",
            5.56,
        ],
        [
            "Java",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/java",
            "#b07219",
            5.56,
        ],
        [
            "Mojo",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/mojo",
            "#ff4c1f",
            5.56,
        ],
        [
            "Crystal",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/crystal",
            "#000100",
            5.56,
        ],
        [
            "Rust",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/rust",
            "#dea584",
            5.56,
        ],
        [
            "Zig",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/zig",
            "#ec915c",
            5.56,
        ],
        [
            "C",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/c",
            "#555555",
            5.56,
        ],
        [
            "C++",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes/cpp",
            "#f34b7d",
            5.56,
        ],
        */
        [
            "Other",
            "https://github.com/willyhorizont/learn_programming_languages_with_javascript/tree/main/codes_trial",
            "#ededed",
            5.56,
        ],
    ];

    const [programmingLanguageBarChartContainerInnerHtml, programmingLanguagesTextContainerInnerHtml] = (programmingLanguages.reduce((([programmingLanguageBarChartContainerInnerHtmlCurrent, programmingLanguagesTextContainerInnerHtmlCurrent], [programmingLanguageName, programmingLanguageRepositoryUrl, programmingLanguageGithubColor, programmingLanguagePercentageCustom]) => ([
        WillyHorizont.UtilsWeb.removeTemplateStringIndentation((programmingLanguageBarChartContainerInnerHtmlCurrent.trimStart() + /*html*/`
                                        <div data-id="programming-language-percentage" style="width: ${(100 / programmingLanguages.length)}%; height: 100%; background-color: ${programmingLanguageGithubColor};">
                                        </div>
        `)),
        WillyHorizont.UtilsWeb.removeTemplateStringIndentation((programmingLanguagesTextContainerInnerHtmlCurrent.trimStart() + /*html*/`
                                        <a data-id="programming-language-text" href="${programmingLanguageRepositoryUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: flex; flex-direction: row; align-items: center; margin-right: 16px;">
                                            <div style="width: 0.5em; height: 0.5em; border-radius: 50%; margin-right: 8px; background-color: ${programmingLanguageGithubColor};"></div>
                                            <p style="font-size: 0.75em; margin-right: 8px;">${programmingLanguageName}</p>
                                            <p style="font-size: 0.75em;">${(100 / programmingLanguages.length).toFixed(2)}%</p>
                                        </a>
        `)),
    ])), ["", ""]));

    document.getElementById("placeholder-github-programming-languages-card").innerHTML = WillyHorizont.UtilsWeb.removeTemplateStringIndentation((/*html*/`
                        <div data-id="programming-languages-card" class="programming-languages-card" style="display: flex; flex-direction: column; flex-wrap: wrap; row-gap: 8px; border: 1px solid var(--light-border-color); border-radius: 6px; padding: 8px;">
                            <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
                                <div style="display: flex; flex-direction: column;">
                                    <p style="margin-bottom: 16px;">Programming Languages</p>
                                    <div data-id="programming-languages-bar-chart-container" class="programming-languages-bar-chart-container" style="display: flex; width: 100%; height: 8px; border-radius: 6px; column-gap: 2px; overflow: hidden;">
                                        ${programmingLanguageBarChartContainerInnerHtml}
                                    </div>
                                    <div id="programming-languages-text-container" style="display: flex; flex-direction: row; margin-top: 8px; flex-wrap: wrap; row-gap: 8px; padding: 4px;">
                                        ${programmingLanguagesTextContainerInnerHtml}
                                    </div>
                                </div>
                            </div>
                        </div>
    `));

    WillyHorizont.UtilsWeb.setupDataThemeObserver((currentTheme) => {
        const htmlElementProgrammingLanguagesCard = document.querySelector('[data-id="programming-languages-card"]');
        const htmlElementProgrammingLanguagesBarChartContainer = htmlElementProgrammingLanguagesCard.querySelector('[data-id="programming-languages-bar-chart-container"]');
        if (currentTheme === "dark") {
            htmlElementProgrammingLanguagesCard.style.border = "1px solid var(--dark-border-color)";
            htmlElementProgrammingLanguagesBarChartContainer.style.backgroundColor = "var(--dark-background-color)";
            return;
        }
        if (currentTheme === "light") {
            htmlElementProgrammingLanguagesCard.style.border = "1px solid var(--light-border-color)";
            htmlElementProgrammingLanguagesBarChartContainer.style.backgroundColor = "var(--light-background-color)";
            return;
        }
    });
})();
