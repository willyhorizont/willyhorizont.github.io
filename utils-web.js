WillyHorizont.UtilsWeb = ((() => {
    if (!WillyHorizont.Utils) return;

    class LocalDatabase {
        collectionOrStoreNameInString = "data";

        constructor(databaseNameInString) {
            this.databaseNameInString = databaseNameInString;
        }

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
        }

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
        }

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
        }

        async removeItem(collectionOrStoreKey) {
            const databaseConnection = await (this.connect());
            return (new Promise((resolve, reject) => {
                const databaseTransaction = databaseConnection.transaction(this.collectionOrStoreNameInString, "readwrite");
                const collectionOrStore = databaseTransaction.objectStore(this.collectionOrStoreNameInString);
                collectionOrStore.delete(collectionOrStoreKey);

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
        }

        async clear() {
            const databaseConnection = await (this.connect());
            return (new Promise((resolve, reject) => {
                const databaseTransaction = databaseConnection.transaction(this.collectionOrStoreNameInString, "readwrite");
                const collectionOrStore = databaseTransaction.objectStore(this.collectionOrStoreNameInString);
                collectionOrStore.clear();

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
        }
    }

    const IS_IN_DEVELOPMENT_MODE = (window.location.hostname === "127.0.0.1");
    const createSetHtmlElementPropertyValues = (htmlElement) => ((arrayOfEntryProperty) => ([(arrayOfEntryProperty.forEach(([htmlElementProperty, htmlElementPropertyValue]) => (Reflect.set(htmlElement, htmlElementProperty, htmlElementPropertyValue)))), htmlElement].at(-1)));
    const createSetHtmlElementEventStuffs = (htmlElement) => ((arrayOfElementEventStuff) => ([(arrayOfElementEventStuff.forEach(({ handlerRefName, eventType, elementHandler, eventHandler }) => (((handlerFunction) => ([(Reflect.set(htmlElement, handlerRefName, handlerFunction)), (htmlElement.addEventListener(eventType, handlerFunction)), undefined].at(-1)))(eventHandler || elementHandler(htmlElement))))), htmlElement].at(-1)));
    const createSetHtmlElementAttributes = (htmlElement) => ((arrayOfEntryAttribute) => ([(arrayOfEntryAttribute.forEach(([htmlElementAttribute, htmlElementAttributeValue]) => (htmlElement.setAttribute(htmlElementAttribute, String(htmlElementAttributeValue))))), htmlElement].at(-1)));
    const attachMethodToHtmlElementRecursively = (htmlElement) => {
        if (!Reflect.has(htmlElement, "setPropertyValues")) Reflect.set(htmlElement, "setPropertyValues", createSetHtmlElementPropertyValues(htmlElement));
        if (!Reflect.has(htmlElement, "setEventStuffs")) Reflect.set(htmlElement, "setEventStuffs", createSetHtmlElementEventStuffs(htmlElement));
        if (!Reflect.has(htmlElement, "setAttributes")) Reflect.set(htmlElement, "setAttributes", createSetHtmlElementAttributes(htmlElement));
        if (!htmlElement.children.length) return;
        WillyHorizont.Utils.iterateList(htmlElement.children, (htmlElementInnerChild) => {
            attachMethodToHtmlElementRecursively(htmlElementInnerChild);
        });
    };
    const htmlTemplateStringToHtmlElement = (htmlTemplateString) => {
        const htmlElementNew = (((htmlElementTemplate) => ([(Reflect.set(htmlElementTemplate, "innerHTML", htmlTemplateString.trim())), (htmlElementTemplate.content.firstElementChild)].at(-1)))(document.createElement("template")));
        attachMethodToHtmlElementRecursively(htmlElementNew);
        return htmlElementNew;
    };
    const appendChildrenReturnParent = (htmlElementParent, ...htmlElementChildren) => ([(htmlElementChildren.forEach((htmlElementChild) => (htmlElementParent.appendChild(htmlElementChild)))), htmlElementParent].at(-1));
    const fetchThrowErrorIfNotOk = async (anyUrl) => {
        const anyFetchResponse = await fetch(anyUrl);
        if (!anyFetchResponse.ok) {
            throw new Error(`fetch ${anyUrl} not ok`);
        }
        return anyFetchResponse;
    };
    const checkIsUserUsingChromiumBasedWebBrowser = () => ((typeof navigator !== "undefined") && ("userAgentData" in navigator) && (navigator.userAgentData) && (typeof navigator.userAgentData.getHighEntropyValues === "function"));
    const getUserChromiumBasedWebBrowserData = async () => {
        const isUserUsingChromiumBasedWebBrowser = checkIsUserUsingChromiumBasedWebBrowser();
        if (isUserUsingChromiumBasedWebBrowser === false) return null;
        const getHighEntropyValuesResult = await navigator.userAgentData.getHighEntropyValues([
            // "architecture",
            // "bitness",
            // "formFactors",
            // "fullVersionList",
            // "model",
            // "platformVersion",
            // "wow64",
        ]);
        // console.log({ getHighEntropyValuesResult });
        const userChromiumBasedWebBrowserData = getHighEntropyValuesResult?.brands?.find?.((anyWebBrowserData) => ((anyWebBrowserData?.["brand"] === "Google Chrome") || (anyWebBrowserData?.["brand"] === "Chromium")));
        if (!userChromiumBasedWebBrowserData) return null;
        return ({
            version: userChromiumBasedWebBrowserData?.["version"],
            platform: getHighEntropyValuesResult?.["platform"],
        });
    };
    const getLatestStableChromiumBasedWebBrowserLstData = async () => {
        const getChromiumBasedWebBrowserLatestStableVersionResponse = await WillyHorizont.UtilsWeb.fetchThrowErrorIfNotOk("https://chromiumdash.appspot.com/fetch_releases?channel=Stable&num=1");
        const getChromiumBasedWebBrowserLatestStableVersionResponseJson = await getChromiumBasedWebBrowserLatestStableVersionResponse.json();
        // console.log({ getChromiumBasedWebBrowserLatestStableVersionResponseJson });
        return getChromiumBasedWebBrowserLatestStableVersionResponseJson;
    };
    const checkIsUserUsingMinimumStableChromiumBasedWebBrowser = async () => {
        const userChromiumBasedWebBrowserData = await WillyHorizont.UtilsWeb.getUserChromiumBasedWebBrowserData();
        if (!userChromiumBasedWebBrowserData) return false;
        const latestStableChromiumBasedWebBrowserListData = await WillyHorizont.UtilsWeb.getLatestStableChromiumBasedWebBrowserLstData();
        const latestStableChromiumBasedWebBrowserMatchUserPlatformData = latestStableChromiumBasedWebBrowserListData?.find?.((latestStableChromiumBasedWebBrowserData) => (latestStableChromiumBasedWebBrowserData?.["platform"] === userChromiumBasedWebBrowserData?.["platform"]));
        const userChromiumBasedWebBrowserVersion = userChromiumBasedWebBrowserData["version"];
        const latestStableChromiumBasedWebBrowserMatchUserPlatformVersion = latestStableChromiumBasedWebBrowserMatchUserPlatformData?.["version"];
        if (!latestStableChromiumBasedWebBrowserMatchUserPlatformVersion) return false;
        const userChromiumBasedWebBrowserMajorVersion = parseInt(userChromiumBasedWebBrowserVersion.split(".").at(0), 10);
        const latestStableChromiumBasedWebBrowserMatchUserPlatformMajorVersion = parseInt(latestStableChromiumBasedWebBrowserMatchUserPlatformVersion.split(".").at(0), 10);
        const minimumStableChromiumBasedWebBrowserMatchUserPlatformMajorVersion = (latestStableChromiumBasedWebBrowserMatchUserPlatformMajorVersion - 2);
        return (userChromiumBasedWebBrowserMajorVersion >= minimumStableChromiumBasedWebBrowserMatchUserPlatformMajorVersion);
    };

    const getHtmlTemplateStringPopupStyle = (popupStackingOrder) => (/*html*/`
            <style>
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: none;
                    align-items: center;
                    justify-content: center;
                    z-index: ${popupStackingOrder};
                }

                .popup-box {
                    padding: 24px;
                    border-radius: 8px;
                    min-width: 240px;
                    position: relative;

                    background-color: var(--light-background-color); color: var(--light-text-color);
                }

                .popup-close-button {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    cursor: pointer;
                    font-size: 18px;
                    border: 1px solid black;
                    border-radius: 0.2em;
                    width: 1em;
                    aspect-ratio: 1 / 1;
                    line-height: 0px;
                    padding: 0px;
                    margin: auto;
                }

                html[data-theme="dark"] .popup-box {
                    background-color: var(--dark-background-color); color: var(--dark-text-color);
                }
            </style>
        `);

    const createNewPopup = ({ popupId, popupStackingOrder, titleString, htmlTemplateStringContentChildren }) => {
        // if (!WillyHorizont.Utils.checkIsMethodAvailable(document, "document.body.appendChild")) return;
        document.body.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(getHtmlTemplateStringPopupStyle(popupStackingOrder)));
        const htmlElementPopupOverlay = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                <div data-id="popup-overlay-${popupId}" class="popup-overlay">
                </div>
            `);
        const htmlElementPopupBox = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                <div data-id="popup-box-${popupId}" class="popup-box">
                </div>
            `);
        const popupCloseButton = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                <button data-id="popup-close-button-${popupId}" class="popup-close-button">&times;</button>
            `);
        htmlElementPopupBox.appendChild(popupCloseButton);
        htmlElementPopupBox.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                <h3>${titleString}</h3>
            `));
        htmlTemplateStringContentChildren.forEach((htmlTemplateStringContent) => {
            htmlElementPopupBox.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(htmlTemplateStringContent));
        })
        htmlElementPopupOverlay.appendChild(htmlElementPopupBox);
        document.body.appendChild(htmlElementPopupOverlay);

        const openPopup = () => {
            htmlElementPopupOverlay.style.display = "flex";
        };

        const closePopup = () => {
            htmlElementPopupOverlay.style.display = "none";
        };

        popupCloseButton.addEventListener("click", () => {
            closePopup();
        });

        htmlElementPopupOverlay.addEventListener("click", (event) => {
            if (event.target === htmlElementPopupOverlay) {
                closePopup();
            }
        });

        return {
            openPopup,
            closePopup,
        };
    };

    return {
        IS_IN_DEVELOPMENT_MODE,
        htmlTemplateStringToHtmlElement,
        appendChildrenReturnParent,
        fetchThrowErrorIfNotOk,
        checkIsUserUsingChromiumBasedWebBrowser,
        getUserChromiumBasedWebBrowserData,
        getLatestStableChromiumBasedWebBrowserLstData,
        checkIsUserUsingMinimumStableChromiumBasedWebBrowser,
        LocalDatabase,
        createNewPopup,
    };
})());
