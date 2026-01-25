/*
req:
    window.WillyHorizont.Utils
*/

window.UtilsWeb = ((() => {
    if (!window.WillyHorizont.Utils) return;

    const IS_IN_DEVELOPMENT_MODE = (window.location.hostname === "127.0.0.1");
    const createSetHtmlElementPropertyValues = (htmlElement) => ((arrayOfEntryProperty) => ([(arrayOfEntryProperty.forEach(([htmlElementProperty, htmlElementPropertyValue]) => (Reflect.set(htmlElement, htmlElementProperty, htmlElementPropertyValue)))), htmlElement].at(-1)));
    const createSetHtmlElementEventStuffs = (htmlElement) => ((arrayOfElementEventStuff) => ([(arrayOfElementEventStuff.forEach(({ handlerRefName, eventType, elementHandler, eventHandler }) => (((handlerFunction) => ([(Reflect.set(htmlElement, handlerRefName, handlerFunction)), (htmlElement.addEventListener(eventType, handlerFunction)), undefined].at(-1)))(eventHandler || elementHandler(htmlElement))))), htmlElement].at(-1)));
    const createSetHtmlElementAttributes = (htmlElement) => ((arrayOfEntryAttribute) => ([(arrayOfEntryAttribute.forEach(([htmlElementAttribute, htmlElementAttributeValue]) => (htmlElement.setAttribute(htmlElementAttribute, String(htmlElementAttributeValue))))), htmlElement].at(-1)));
    const attachMethodToHtmlElementRecursively = (htmlElement) => {
        if (!Reflect.has(htmlElement, "setPropertyValues")) Reflect.set(htmlElement, "setPropertyValues", createSetHtmlElementPropertyValues(htmlElement));
        if (!Reflect.has(htmlElement, "setEventStuffs")) Reflect.set(htmlElement, "setEventStuffs", createSetHtmlElementEventStuffs(htmlElement));
        if (!Reflect.has(htmlElement, "setAttributes")) Reflect.set(htmlElement, "setAttributes", createSetHtmlElementAttributes(htmlElement));
        if (!htmlElement.children.length) return;
        window.WillyHorizont.Utils.iterateList(htmlElement.children, (htmlElementInnerChild) => {
            attachMethodToHtmlElementRecursively(htmlElementInnerChild);
        });
    };
    const htmlTemplateStringToHtmlElement = (htmlTemplateString) => {
        const htmlElementNew = (((htmlElementTemplate) => ([(Reflect.set(htmlElementTemplate, "innerHTML", htmlTemplateString)), (htmlElementTemplate.content.firstElementChild)].at(-1)))(document.createElement("template")));
        attachMethodToHtmlElementRecursively(htmlElementNew);
        return htmlElementNew;
    };
    const appendChildrenReturnParent = (htmlElementParent, ...htmlElementChildren) => ([(htmlElementChildren.forEach((htmlElementChild) => (htmlElementParent.appendChild(htmlElementChild)))), htmlElementParent].at(-1));
    const fetchThrowErrorIfNotOk = async (anyUrl) => (((anyFetchResponse) => ((!anyFetchResponse.ok) ? window.WillyHorizont.Utils.throwError(`fetch ${anyUrl} not ok`) : anyFetchResponse))(await fetch(anyUrl)));
    const getChromiumBasedBrowserMinimumStableVersion = async () => {
        try {
            const getChromiumBasedBrowserMinimumStableVersionResponse = await fetchThrowErrorIfNotOk("https://chromiumdash.appspot.com/fetch_releases?channel=Stable&num=1");
            const getChromiumBasedBrowserMinimumStableVersionResponseJson = await getChromiumBasedBrowserMinimumStableVersionResponse.json();
            return (getChromiumBasedBrowserMinimumStableVersionResponseJson.reduce(((currentChromiumBasedBrowserMinimumStableVersion, anyBrowser) => {
                const currentChromiumBasedBrowserMajorVersion = parseInt(anyBrowser?.["version"]?.split?.(".")?.at?.(0), 10);
                if (Number.isFinite(currentChromiumBasedBrowserMajorVersion) === true) return currentChromiumBasedBrowserMajorVersion;
                return ((currentChromiumBasedBrowserMajorVersion < currentChromiumBasedBrowserMinimumStableVersion) ? currentChromiumBasedBrowserMajorVersion : currentChromiumBasedBrowserMinimumStableVersion);
            }), Infinity));
        } catch (anyError) {
            return Infinity;
        }
    };
    const checkUserUsingChromiumBasedBrowser = () => ((navigator?.userAgentData !== undefined) || (navigator?.userAgentData?.getHighEntropyValues !== undefined));
    const getUserChromiumBasedBrowserVersion = async () => {
        try {
            const isUserUsingChromiumBasedBrowser = checkUserUsingChromiumBasedBrowser();
            if (isUserUsingChromiumBasedBrowser === false) return 0;
            const getHighEntropyValuesResult = await navigator.userAgentData.getHighEntropyValues(["fullVersionList"]);
            return (getHighEntropyValuesResult?.fullVersionList?.reduce?.((currentUserBiggestChromiumBasedBrowserVersion, anyBrowser) => {
                if (["Google Chrome", "Chromium"]?.every?.((anyArrayItem) => (anyArrayItem !== anyBrowser?.["brand"]))) return currentUserBiggestChromiumBasedBrowserVersion;
                const currentChromiumBasedBrowserMajorVersion = parseInt(anyBrowser?.["version"]?.split?.(".")?.at?.(0), 10);
                return ((currentChromiumBasedBrowserMajorVersion > currentUserBiggestChromiumBasedBrowserVersion) ? currentChromiumBasedBrowserMajorVersion : currentUserBiggestChromiumBasedBrowserVersion);
            }, 0));
        } catch (anyError) {
            return 0;
        }
    };

    return {
        IS_IN_DEVELOPMENT_MODE,
        htmlTemplateStringToHtmlElement,
        appendChildrenReturnParent,
        fetchThrowErrorIfNotOk,
        getChromiumBasedBrowserMinimumStableVersion,
        getUserChromiumBasedBrowserVersion,
        checkUserUsingChromiumBasedBrowser,
    };
})());
