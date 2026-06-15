(async () => {
    if (!WillyHorizont.UtilsWeb || !WillyHorizont.Utils) return;
    
    const getProgrammingLanguagesJsonUrl = "https://raw.githubusercontent.com/willyhorizont/cross-language-programming-concepts/refs/heads/main/languages.json";
    const getProgrammingLanguagesJsonResponse = await WillyHorizont.Utils.fetchThrowErrorIfNotOk(getProgrammingLanguagesJsonUrl);
    const getProgrammingLanguagesJsonResponseJson = await getProgrammingLanguagesJsonResponse.json();

    WillyHorizont.UtilsWeb.setupComponentGithubProgrammingLanguagesCard(getProgrammingLanguagesJsonResponseJson);
})();
