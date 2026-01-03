/*
req:
    window.UtilsWeb
*/

(async () => {
    if (!window.UtilsWeb) return;

    const CHROMIUM_BASED_BROWSER_MINIMUM_STABLE_VERSION_PER_2025 = 134;
    let chromiumBasedBrowserMinimumStableVersion = CHROMIUM_BASED_BROWSER_MINIMUM_STABLE_VERSION_PER_2025;
    let userChromiumBasedBrowserVersionCurrent = 0;

    try {
        const userChromiumBasedBrowserVersion = await window.UtilsWeb.getUserChromiumBasedBrowserVersion();
        userChromiumBasedBrowserVersionCurrent = userChromiumBasedBrowserVersion;

        chromiumBasedBrowserMinimumStableVersion = await window.UtilsWeb.getChromiumBasedBrowserMinimumStableVersion();
    } catch (anyError) {
        // fallback to default value
    }

    const isUserUsingChromiumBasedBrowserMinimumStableVersion = (userChromiumBasedBrowserVersionCurrent >= chromiumBasedBrowserMinimumStableVersion);

    if (isUserUsingChromiumBasedBrowserMinimumStableVersion) return;
    // window.location.href = "/unsupported-browser";
})();
