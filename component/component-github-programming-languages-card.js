((root, factory) => {
    // UMD (Universal Module Definition)
    if ((typeof window !== "undefined") && (typeof document !== "undefined")) {
        // Web Browser environment non module script (script with no type="module")
        root.ComponentGithubProgrammingLanguagesCard = factory(root);
        return;
    }
    if ((typeof module !== "undefined") && ("exports" in module) && (typeof module.exports !== "undefined")) {
        // Node.js CommonJS environment may also support Web Browser environment module script (script with type="module") and Node.js ES Module (ESM) environment
        return;
    }
    // Unknown / unsupported environment
})(globalThis, (root) => {
    if (!(root.WillyHorizont && (root.WillyHorizont.Utils || root.WillyHorizont.UtilsWeb))) {
        throw new Error("WillyHorizont.UtilsWeb requires WillyHorizont.Utils to be loaded first");
    }

    const getJsonData = async () => {
        const repoOwner = "willyhorizont";
        const repoName = "cross-language-programming-concepts";
        const filePath = "languages.json";

        const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?path=${filePath}&per_page=1`;
        let rawJsonUrl;
        rawJsonUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/refs/heads/main/${filePath}`;
        // rawJsonUrl = `http://127.0.0.1:5500/${filePath}`;
        // rawJsonUrl = `${filePath}`;

        let programmingLanguagesDataJson = null;
        const LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA = "programming-languages";

        try {
            const localDatabase = WillyHorizont.UtilsWeb.setupLocalDatabase(LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA);

            const jsonResponse = await WillyHorizont.Utils.fetchThrowErrorIfNotOk(rawJsonUrl);
            programmingLanguagesDataJson = await jsonResponse.json();
            // console.log({ programmingLanguagesDataJson });

            await localDatabase.setItem(LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA, programmingLanguagesDataJson);
            console.log("cache updated from source.");
        } catch (err) {
            console.error("Failed checking for update:", err);
        }

        try {
            if (!programmingLanguagesDataJson) {
                const localDatabase = WillyHorizont.UtilsWeb.setupLocalDatabase(LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA);
    
                const cachedData = await localDatabase.getItem(LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA);
    
                if (cachedData) {
                    programmingLanguagesDataJson = cachedData;
                } else {
                    const jsonResponse = await WillyHorizont.Utils.fetchThrowErrorIfNotOk(filePath);
                    programmingLanguagesDataJson = await jsonResponse.json();
                    // console.log({ programmingLanguagesDataJson });
                }
            }
        } catch (err) {
            console.error("Failed getting cache data:", err);
        }
        return programmingLanguagesDataJson;
    };
    return {
        getJsonData,
    };
});
