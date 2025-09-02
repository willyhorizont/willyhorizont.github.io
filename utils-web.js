const setHtmlElementPropertyValue = (htmlElement, arrayOfEntryProperty) => (arrayOfEntryProperty.forEach(([htmlElementProperty, htmlElementPropertyValue]) => (Reflect.set(htmlElement, htmlElementProperty, htmlElementPropertyValue))));
const htmlTemplateStringToHtmlElement = (htmlTemplateString) => (((htmlElementTemplate) => ([Object.assign(htmlElementTemplate, { innerHTML: htmlTemplateString }), htmlElementTemplate.content.firstElementChild].at(-1)))(document.createElement("template")));
const createHtmlElement = (htmlStringTemplate, { arrayOfEntryDataset, arrayOfEntryAttribute, arrayOfElementConfig, arrayOfEntryProperty } = {}) => (((htmlElement) => ([((arrayOfEntryDataset) ? (arrayOfEntryDataset.forEach(([datasetKeyInKebabCase, datasetValue]) => htmlElement.setAttribute(`data-${datasetKeyInKebabCase}`, String(datasetValue)))) : undefined), ((arrayOfElementConfig) ? (arrayOfElementConfig.forEach(({ handlerRefName, eventType, elementHandler, eventHandler }) => (((eventHandlerInner) => ([Object.assign(htmlElement, { [handlerRefName]: eventHandlerInner }), htmlElement.addEventListener(eventType, eventHandlerInner), undefined].at(-1)))(eventHandler || elementHandler(htmlElement))))) : undefined), ((arrayOfEntryAttribute) ? (arrayOfEntryAttribute.forEach(([htmlElementAttribute, htmlElementAttributeValue]) => htmlElement.setAttribute(htmlElementAttribute, String(htmlElementAttributeValue)))) : undefined), ((arrayOfEntryProperty) ? (setHtmlElementPropertyValue(htmlElement, arrayOfEntryProperty)) : undefined), htmlElement].at(-1)))(htmlTemplateStringToHtmlElement(htmlStringTemplate)));
const appendChildrenReturnParent = (htmlElementParent, ...htmlElementChildren) => ([(htmlElementChildren.forEach((htmlElementChild) => (htmlElementParent.appendChild(htmlElementChild)))), htmlElementParent].at(-1));
const fetchThrowErrorIfNotOk = async (anyUrl) => (((anyFetchResponse) => ((!anyFetchResponse.ok) ? utils.throwError(`fetch ${anyUrl} not ok`) : anyFetchResponse))(await fetch(anyUrl)));
const getChromiumBasedBrowserMinimumStableVersion = async () => {
    try {
        const getChromiumBasedBrowserMinimumStableVersionResponse = await fetchThrowErrorIfNotOk("https://chromiumdash.appspot.com/fetch_releases?channel=Stable&num=1");
        const getChromiumBasedBrowserMinimumStableVersionResponseJson = await getChromiumBasedBrowserMinimumStableVersionResponse.json();
        return (getChromiumBasedBrowserMinimumStableVersionResponseJson.reduce((currentChromiumBasedBrowserMinimumStableVersion, anyBrowser) => {
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
        return (getHighEntropyValuesResult?.fullVersionList?.reduce?.((currentUserBiggestChromiumBasedBrowserVersion, anyBrowser) => {
            const currentChromiumBasedBrowserMajorVersion = parseInt(anyBrowser?.["version"]?.split?.(".")?.at?.(0), 10);
            if (Number.isFinite(currentChromiumBasedBrowserMajorVersion) === true) return currentChromiumBasedBrowserMajorVersion;
            return ((currentChromiumBasedBrowserMajorVersion > currentUserBiggestChromiumBasedBrowserVersion) ? currentChromiumBasedBrowserMajorVersion : currentUserBiggestChromiumBasedBrowserVersion);
        }, -Infinity));
    } catch (anyError) {
        return 0;
    }
};
const localDatabase = {
    initiate({ databaseNameInString, collectionOrStoreNameInString }) {
        this.databaseNameInString = databaseNameInString;
        this.collectionOrStoreNameInString = collectionOrStoreNameInString;
    },
    connect() {
        return (new Promise((resolve, reject) => {
            const databaseRequest = indexedDB.open(this.databaseNameInString, 1);
            databaseRequest.onupgradeneeded = (event) => {
                const databaseConnection = event.target.result;
                if (!databaseConnection.objectStoreNames.contains(this.collectionOrStoreNameInString)) databaseConnection.createObjectStore(this.collectionOrStoreNameInString);
            };
            databaseRequest.onsuccess = (event) => {
                resolve(event.target.result);
            };
            databaseRequest.onerror = (event) => {
                reject(event.target.error);
            };
        }));
    },
    async setItem(collectionOrStoreKey, collectionOrStoreValue) {
        const databaseConnection = await (this.connect());
        return (new Promise((resolve, reject) => {
            const databaseTransaction = databaseConnection.transaction(this.collectionOrStoreNameInString, "readwrite");
            const collectionOrStore = databaseTransaction.objectStore(this.collectionOrStoreNameInString);
            collectionOrStore.put(collectionOrStoreValue, collectionOrStoreKey);
            databaseTransaction.oncomplete = () => {
                databaseConnection.close();
                resolve(true);
            };
            databaseTransaction.onerror = (event) => {
                databaseConnection.close();
                reject(event.target.error);
            };
            databaseTransaction.onabort = () => {
                databaseConnection.close();
            };
        }));
    },
    async getItem(collectionOrStoreKey) {
        const databaseConnection = await (this.connect());
        return (new Promise((resolve, reject) => {
            const databaseTransaction = databaseConnection.transaction(this.collectionOrStoreNameInString, "readonly");
            const collectionOrStore = databaseTransaction.objectStore(this.collectionOrStoreNameInString);
            const collectionOrStoreRequest = collectionOrStore.get(collectionOrStoreKey);
            collectionOrStoreRequest.onsuccess = (event) => {
                resolve(event.target.result || null);
            };
            collectionOrStoreRequest.onerror = (event) => {
                reject(event.target.error);
            };
            databaseTransaction.oncomplete = () => {
                databaseConnection.close();
            };
            databaseTransaction.onerror = () => {
                databaseConnection.close();
            };
            databaseTransaction.onabort = () => {
                databaseConnection.close();
            };
        }));
    },
    async removeItem(collectionOrStoreKey) {
        const databaseConnection = await (this.connect());
        return (new Promise((resolve, reject) => {
            const databaseTransaction = databaseConnection.transaction(this.collectionOrStoreNameInString, "readwrite");
            const collectionOrStore = databaseTransaction.objectStore(this.collectionOrStoreNameInString);
            const collectionOrStoreRequest = collectionOrStore.delete(collectionOrStoreKey);
            collectionOrStoreRequest.onsuccess = () => {
                resolve(true);
            };
            collectionOrStoreRequest.onerror = (event) => {
                reject(event.target.error);
            };
            databaseTransaction.oncomplete = () => {
                databaseConnection.close();
            };
            databaseTransaction.onerror = () => {
                databaseConnection.close();
            };
            databaseTransaction.onabort = () => {
                databaseConnection.close();
            };
        }));
    },
};
const utilsWeb = {
    setHtmlElementPropertyValue,
    htmlTemplateStringToHtmlElement,
    createHtmlElement,
    appendChildrenReturnParent,
    fetchThrowErrorIfNotOk,
    getChromiumBasedBrowserMinimumStableVersion,
    getUserChromiumBasedBrowserVersion,
    localDatabase,
};
