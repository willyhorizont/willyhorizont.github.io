const setHtmlElementPropertyValue = (htmlElement, arrayOfEntryProperty) => (arrayOfEntryProperty.forEach(([htmlElementProperty, htmlElementPropertyValue]) => (Reflect.set(htmlElement, htmlElementProperty, htmlElementPropertyValue))));
const htmlTemplateStringToHtmlElement = (htmlTemplateString) => (((htmlElementTemplate) => ([Object.assign(htmlElementTemplate, { innerHTML: htmlTemplateString }), htmlElementTemplate.content.firstElementChild].at(-1)))(document.createElement("template")));
const createHtmlElement = (htmlStringTemplate, { arrayOfEntryDataset, arrayOfEntryAttribute, arrayOfElementConfig, arrayOfEntryProperty } = {}) => (((htmlElement) => ([((arrayOfEntryDataset) ? (arrayOfEntryDataset.forEach(([datasetKeyInKebabCase, datasetValue]) => htmlElement.setAttribute(`data-${datasetKeyInKebabCase}`, String(datasetValue)))) : undefined), ((arrayOfElementConfig) ? (arrayOfElementConfig.forEach(({ handlerRefName, eventType, elementHandler, eventHandler }) => (((eventHandlerInner) => ([Object.assign(htmlElement, { [handlerRefName]: eventHandlerInner }), htmlElement.addEventListener(eventType, eventHandlerInner), undefined].at(-1)))(eventHandler || elementHandler(htmlElement))))) : undefined), ((arrayOfEntryAttribute) ? (arrayOfEntryAttribute.forEach(([htmlElementAttribute, htmlElementAttributeValue]) => htmlElement.setAttribute(htmlElementAttribute, String(htmlElementAttributeValue)))) : undefined), ((arrayOfEntryProperty) ? (setHtmlElementPropertyValue(htmlElement, arrayOfEntryProperty)) : undefined), htmlElement].at(-1)))(htmlTemplateStringToHtmlElement(htmlStringTemplate)));
const appendChildrenReturnParent = (htmlElementParent, ...htmlElementChildren) => ([(htmlElementChildren.forEach((htmlElementChild) => (htmlElementParent.appendChild(htmlElementChild)))), htmlElementParent].at(-1));
const fetchReturnJsonIfOkayElseThrowError = async (anyUrl) => (await (async (anyResponse) => (anyResponse.ok ? anyResponse.json() : utils.throwError("not ok")))(await fetch(anyUrl)));
const getChromiumBasedBrowserMinimumStableVersion = async () => {
    try {
        const getChromiumBasedBrowserStableVersionResponse = await fetch("https://chromiumdash.appspot.com/fetch_releases?channel=Stable&num=1");
        if (!getChromiumBasedBrowserStableVersionResponse.ok) return Infinity;
        const getChromiumBasedBrowserStableVersionResponseJson = await getChromiumBasedBrowserStableVersionResponse.json();
        return (getChromiumBasedBrowserStableVersionResponseJson.reduce((currentChromiumBasedBrowserMinimumStableVersion, anyBrowser) => {
            const currentChromiumBasedBrowserMajorVersion = parseInt(anyBrowser?.["version"]?.split?.(".")?.at?.(0), 10);
            if (Number.isFinite(currentChromiumBasedBrowserMajorVersion) === true) return currentChromiumBasedBrowserMajorVersion;
            return ((currentChromiumBasedBrowserMajorVersion < currentChromiumBasedBrowserMinimumStableVersion) ? currentChromiumBasedBrowserMajorVersion : currentChromiumBasedBrowserMinimumStableVersion);
        }, Infinity));
    } catch (anyError) {
        return Infinity;
    }
};
const getUserChromiumBasedBrowserVersion = async () => {
    try {
        if (!navigator.userAgentData || !navigator.userAgentData.getHighEntropyValues) return 0;
        const getHighEntropyValuesResult = await navigator.userAgentData.getHighEntropyValues(["fullVersionList"]);
        return getHighEntropyValuesResult?.fullVersionList?.reduce?.((currentUserBiggestChromiumBasedBrowserVersion, anyBrowser) => {
            const currentChromiumBasedBrowserMajorVersion = parseInt(anyBrowser?.["version"]?.split?.(".")?.at?.(0), 10);
            if (Number.isFinite(currentChromiumBasedBrowserMajorVersion) === true) return currentChromiumBasedBrowserMajorVersion;
            return ((currentChromiumBasedBrowserMajorVersion > currentUserBiggestChromiumBasedBrowserVersion) ? currentChromiumBasedBrowserMajorVersion : currentUserBiggestChromiumBasedBrowserVersion);
        }, -Infinity);
    } catch (anyError) {
        return 0;
    }
};
const utilsWeb = {
    setHtmlElementPropertyValue,
    htmlTemplateStringToHtmlElement,
    createHtmlElement,
    appendChildrenReturnParent,
    fetchReturnJsonIfOkayElseThrowError,
    getChromiumBasedBrowserMinimumStableVersion,
    getUserChromiumBasedBrowserVersion,
};
