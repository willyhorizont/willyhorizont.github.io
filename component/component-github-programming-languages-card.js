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
        const LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA = "programming-languages";
        const localDatabase = WillyHorizont.UtilsWeb.setupLocalDatabase(LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA);

        const LOCAL_STORAGE_KEY_PROGRAMMING_LANGUAGES_SHA = "programming-languages-sha";

        const repoOwner = "willyhorizont";
        const repoName = "cross-language-programming-concepts";
        const filePath = "languages.json";

        const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?path=${filePath}&per_page=1`;
        const rawJsonUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/refs/heads/main/${filePath}`;

        let programmingLanguagesDataJson = null;

        try {
            const apiResponse = await WillyHorizont.Utils.fetchThrowErrorIfNotOk(githubApiUrl);
            const commitData = await apiResponse.json();

            const latestSha = ((commitData.length > 0) ? commitData[0].sha : null); 

            const cachedSha = localStorage.getItem(LOCAL_STORAGE_KEY_PROGRAMMING_LANGUAGES_SHA);
            const cachedData = await localDatabase.getItem(LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA);

            if ((latestSha || false) && (cachedSha === latestSha) && (cachedData || false)) {
                programmingLanguagesDataJson = cachedData;
                // console.log({ programmingLanguagesDataJson });
                console.log("using data from cache.");
            } else {
                const jsonResponse = await WillyHorizont.Utils.fetchThrowErrorIfNotOk(rawJsonUrl);
                programmingLanguagesDataJson = await jsonResponse.json();
                // console.log({ programmingLanguagesDataJson });

                if (latestSha) localStorage.setItem(LOCAL_STORAGE_KEY_PROGRAMMING_LANGUAGES_SHA, latestSha);
                await localDatabase.setItem(LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA, programmingLanguagesDataJson);
                console.log("cache updated from source.");
            }
        } catch (error) {
            // console.error("Failed checking for update:", error);
            const fallbackData = localDatabase.getItem(LOCAL_DATABASE_KEY_PROGRAMMING_LANGUAGES_DATA);
            if (fallbackData) {
                programmingLanguagesDataJson = fallbackData;
                console.log("Menggunakan data cache lama sebagai cadangan.");
            }
        }
        return programmingLanguagesDataJson;
    };
    return {
        getJsonData,
    };
});
