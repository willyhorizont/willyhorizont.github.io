/*
req:
    UtilsWeb
*/

(async () => {
    const CHROMIUM_BASED_BROWSER_MINIMUM_STABLE_VERSION_PER_2025 = 134;
    let chromiumBasedBrowserMinimumStableVersion = CHROMIUM_BASED_BROWSER_MINIMUM_STABLE_VERSION_PER_2025;
    let userChromiumBasedBrowserVersion = 0;

    try {
        userChromiumBasedBrowserVersion = await UtilsWeb.getUserChromiumBasedBrowserVersion();
        console.log({ userChromiumBasedBrowserVersion });

        chromiumBasedBrowserMinimumStableVersion = await UtilsWeb.getChromiumBasedBrowserMinimumStableVersion();
        console.log({ chromiumBasedBrowserMinimumStableVersion });
    } catch (anyError) {
        // fallback to default value
    }

    const isUserUsingChromiumBasedBrowserMinimumStableVersion = (userChromiumBasedBrowserVersion >= chromiumBasedBrowserMinimumStableVersion);
    console.log({ isUserUsingChromiumBasedBrowserMinimumStableVersion });

    if (isUserUsingChromiumBasedBrowserMinimumStableVersion) return;
    window.location.href = "/unsupported-browser";
})();
