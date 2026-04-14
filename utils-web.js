WillyHorizont.UtilsWeb = ((() => {
    if (!WillyHorizont.Utils) return;

    const initializeLocalDatabase = (databaseNameInString) => {
        const COLLECTION_OR_STORE_NAME_IN_STRING = "data";

        function connect() {
            return (new Promise((resolve, reject) => {
                const databaseRequest = indexedDB.open(databaseNameInString, 1);

                databaseRequest.onupgradeneeded = (event) => {
                    const databaseConnection = event.target.result;
                    if (!databaseConnection.objectStoreNames.contains(COLLECTION_OR_STORE_NAME_IN_STRING)) databaseConnection.createObjectStore(COLLECTION_OR_STORE_NAME_IN_STRING);
                };

                databaseRequest.onsuccess = (event) => {
                    resolve(event.target.result);
                };

                databaseRequest.onerror = (event) => {
                    reject(event.target.error);
                };
            }));
        }

        async function setItem(collectionOrStoreKey, collectionOrStoreValue) {
            const databaseConnection = await connect();
            return (new Promise((resolve, reject) => {
                const databaseTransaction = databaseConnection.transaction(COLLECTION_OR_STORE_NAME_IN_STRING, "readwrite");
                const collectionOrStore = databaseTransaction.objectStore(COLLECTION_OR_STORE_NAME_IN_STRING);
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

        async function getItem(collectionOrStoreKey) {
            const databaseConnection = await connect();
            return (new Promise((resolve, reject) => {
                const databaseTransaction = databaseConnection.transaction(COLLECTION_OR_STORE_NAME_IN_STRING, "readonly");
                const collectionOrStore = databaseTransaction.objectStore(COLLECTION_OR_STORE_NAME_IN_STRING);
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

        async function removeItem(collectionOrStoreKey) {
            const databaseConnection = await connect();
            return (new Promise((resolve, reject) => {
                const databaseTransaction = databaseConnection.transaction(COLLECTION_OR_STORE_NAME_IN_STRING, "readwrite");
                const collectionOrStore = databaseTransaction.objectStore(COLLECTION_OR_STORE_NAME_IN_STRING);
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

        async function clear() {
            const databaseConnection = await connect();
            return (new Promise((resolve, reject) => {
                const databaseTransaction = databaseConnection.transaction(COLLECTION_OR_STORE_NAME_IN_STRING, "readwrite");
                const collectionOrStore = databaseTransaction.objectStore(COLLECTION_OR_STORE_NAME_IN_STRING);
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

        return {
            setItem,
            getItem,
            clear,
        }
    };

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

    const getAspectRatio = () => {
        const currentViewportWidth = (WillyHorizont.Utils.safeGetObjectProperty(window, "window.visualViewport.width") || window.innerWidth);
        const currentViewportHeight = (WillyHorizont.Utils.safeGetObjectProperty(window, "window.visualViewport.height") || window.innerHeight);
        const getGreatestCommonFactor = (a, b) => ((b === 0) ? a : getGreatestCommonFactor(b, (a % b)));
        const greatestCommonFactor = getGreatestCommonFactor(currentViewportWidth, currentViewportHeight);
        return [(currentViewportWidth / greatestCommonFactor), (currentViewportHeight / greatestCommonFactor)];
    };

    const getViewportHeightFromViewportWidth = () => {
        const [rw, rh] = getAspectRatio();
        return (rh / rw);
    };

    const setupViewportHeightFromViewportWidthListener = () => {
        let requestAnimationFrameId;

        const updateViewportHeightFromViewportWidth = () => {
            cancelAnimationFrame(requestAnimationFrameId);

            requestAnimationFrameId = requestAnimationFrame(() => {
                const [ratioWidth, ratioHeight] = WillyHorizont.UtilsWeb.getAspectRatio();
                const newViewportHeight = WillyHorizont.UtilsWeb.getViewportHeightFromViewportWidth();
                document.documentElement.style.setProperty("--viewport-width-multiplier", newViewportHeight);
                const maxHeight = ((ratioWidth > ratioHeight) ? "var(--max-height-landscape)" : "var(--max-height-portrait)");
                document.documentElement.style.setProperty("--max-height", maxHeight);
                // console.log({
                //     ratioWidth, ratioHeight,
                //     newViewportHeight,
                //     maxHeight,
                // });
            });
        };

        updateViewportHeightFromViewportWidth();

        window.addEventListener("resize", updateViewportHeightFromViewportWidth);
        window.addEventListener("orientationchange", updateViewportHeightFromViewportWidth);
        if (WillyHorizont.Utils.checkIsMethodAvailable(window, "window.visualViewport.addEventListener")) {
            window.visualViewport.addEventListener("resize", updateViewportHeightFromViewportWidth);
        }
    };

    const setupViewportHeightListener = () => {
        const localStorageKeyViewportHeight = "viewport-height";
        let requestAnimationFrameId;

        const overrideStyleVariableRealViewportHeight = (newViewportHeightValue) => {
            document.documentElement.style.setProperty("--real-vh", `${(newViewportHeightValue * 0.01)}px`);
        };

        const updateRealViewportHeight = () => {
            cancelAnimationFrame(requestAnimationFrameId);

            requestAnimationFrameId = requestAnimationFrame(() => {
                const currentViewportHeight = (WillyHorizont.Utils.safeGetObjectProperty(window, "window.visualViewport.height") || window.innerHeight);

                if (!localStorage.getItem(localStorageKeyViewportHeight)) {
                    localStorage.setItem(localStorageKeyViewportHeight, currentViewportHeight);
                    overrideStyleVariableRealViewportHeight(currentViewportHeight);
                    return;
                }

                const lockedViewportHeightInLocalStorage = parseFloat(localStorage.getItem(localStorageKeyViewportHeight));
                if (currentViewportHeight > lockedViewportHeightInLocalStorage) {
                    localStorage.setItem(localStorageKeyViewportHeight, currentViewportHeight);
                    overrideStyleVariableRealViewportHeight(currentViewportHeight);
                    return;
                }

                overrideStyleVariableRealViewportHeight(lockedViewportHeightInLocalStorage);
            });
        };

        updateRealViewportHeight();

        window.addEventListener("resize", updateRealViewportHeight);
        window.addEventListener("orientationchange", () => {
            localStorage.removeItem(localStorageKeyViewportHeight);
            updateRealViewportHeight();
        });
        if (WillyHorizont.Utils.checkIsMethodAvailable(window, "window.visualViewport.addEventListener")) {
            window.visualViewport.addEventListener("resize", updateRealViewportHeight);
        }
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
                    border-radius: 8px;
                    min-width: 240px;
                    max-width: 480px;
                    position: relative;
                    
                    background-color: var(--light-background-color); color: var(--light-text-color);
                    overflow: hidden;
                }

                .popup-header {
                    display: flex;
                    flex-direction: row;
                    padding: 8px;
                    background-color: #999;
                }

                .popup-body {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 8px;
                }

                .popup-close-button {
                    cursor: pointer;
                    font-size: 1.2em;
                    border: 1px solid black;
                    border-radius: 0.2em;
                    background-color: #ff0000;
                    color: var(--dark-text-color);
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

    const initializeComponentPopup = ({ popupId, popupStackingOrder, titleString, htmlTemplateStringContentChildren }) => {
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
        const htmlElementPopupHeader = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                <div data-id="popup-header-${popupId}" class="popup-header">
                </div>
            `);
        htmlElementPopupHeader.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                <h3 style="flex: 1; line-height: 1; text-align: center;">${titleString}</h3>
            `));
        const popupCloseButton = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                <button data-id="popup-close-button-${popupId}" class="popup-close-button">&times;</button>
            `);
        htmlElementPopupHeader.appendChild(popupCloseButton);
        const htmlElementPopupBody = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                <div data-id="popup-body-${popupId}" class="popup-body">
                </div>
            `);
        htmlTemplateStringContentChildren.forEach((htmlTemplateStringContent) => {
            htmlElementPopupBody.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(htmlTemplateStringContent));
        })
        htmlElementPopupBox.appendChild(htmlElementPopupHeader);
        htmlElementPopupBox.appendChild(htmlElementPopupBody);
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

    const initializeComponentChipInput = ({ chipInputPlaceholder, getDataFromLocalDatabase, syncWithMainContent }) => {
        document.body.appendChild(WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                <style>
                    .chip-input {
                        background-color: var(--light-background-color); color: var(--light-text-color);
                    }

                    .chip-remove-button {
                        background-color: var(--light-background-color);
                    }

                    html[data-theme="dark"] .chip-input {
                        background-color: var(--dark-background-color); color: var(--dark-text-color);
                    }

                    html[data-theme="dark"] .chip-remove-button {
                        background-color: var(--dark-background-color);
                    }
                </style>
            `));
        
        function createHtmlElementChipTextContainer(arrayOfEntryProperty) {
            const htmlElementChipText = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                    <span data-id="chip-text" style="white-space: nowrap;">
                    </span>
                `);
            htmlElementChipText.setPropertyValues(arrayOfEntryProperty);
            htmlElementChipText.setEventStuffs([
                ({ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: handleElementClickChipText }),
            ]);
            return htmlElementChipText;
        }

        function createHtmlElementChipRemoveButton() {
            const htmlElementChipRemoveButton = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                    <div data-id="chip-remove-button" style="display: flex; align-items: center; justify-content: center; line-height: 1.2em; background-color: var(--accent-color-4); color: var(--dark-text-color); width: 1.6em; aspect-ratio: 1 / 1; border-radius: 50%;">
                        <span data-id="chip-remove-button-content" style="cursor: pointer; font-weight: bold;">×</span>
                    </div>
                `);
            htmlElementChipRemoveButton.setEventStuffs([
                ({ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: handleElementClickChipRemoveButton }),
            ]);
            return htmlElementChipRemoveButton;
        }

        function createHtmlElementChip(chipTextTrimmed) {
            const htmlElementChipContainer = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                    <div data-id="chip-container" style="cursor: pointer; padding: 4px 6px; border-radius: 0.2em; display: flex; align-items: center; gap: 12px; flex: 0 0 auto; border: 1px solid var(--light-border-color); color: var(--light-text-color); background-color: #ffdddd;">
                    </div>
                `);
            htmlElementChipContainer.setAttributes([["data-item", chipTextTrimmed]]);
            htmlElementChipContainer.appendChild(createHtmlElementChipTextContainer([["textContent", chipTextTrimmed]]));
            htmlElementChipContainer.appendChild(createHtmlElementChipRemoveButton());
            return htmlElementChipContainer;
        }

        function createHtmlElementChipInput(placeholderValue = "") {
            const htmlElementChipInput = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                    <input autocomplete="off" data-id="chip-input" class="chip-input" style="flex: 1 1 auto; padding: 8px 8px 8px 0px; border: none; outline: none;" name="chip-input" type="text" />
                `);
            htmlElementChipInput.setEventStuffs([
                ({ handlerRefName: "refEventHandlerKeyDown", eventType: "keydown", eventHandler: handleEventKeyDownChipInput }),
                ({ handlerRefName: "refEventHandlerBlur", eventType: "blur", eventHandler: handleEventBlurChipInput }),
            ]);
            htmlElementChipInput.setAttributes([["placeholder", placeholderValue]]);
            return htmlElementChipInput;
        }

        function createHtmlElementChipUpdateInput(chipTextTrimmed = "") {
            const htmlElementChipUpdateInput = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                    <input autocomplete="off" data-id="chip-update-input" class="chip-input" style="flex: 1 1 auto; padding: 8px; border: 1px solid var(--light-border-color); outline: none;" name="chip-update-input" type="text" />
                `);
            htmlElementChipUpdateInput.setEventStuffs([
                ({ handlerRefName: "refEventHandlerKeyDown", eventType: "keydown", eventHandler: handleEventKeyDownChipUpdateInput }),
                ({ handlerRefName: "refEventHandlerBlur", eventType: "blur", eventHandler: handleEventBlurChipUpdateInput }),
            ]);
            htmlElementChipUpdateInput.setAttributes([["placeholder", chipTextTrimmed], ["data-item", chipTextTrimmed]]);
            return htmlElementChipUpdateInput;
        }

        async function createHtmlElementChipInputContainer(itemList) {
            const htmlElementChipInputContainer = WillyHorizont.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
                    <div data-id="chip-input-container" style="cursor: text; display: flex; gap: 8px; padding: 8px; flex-wrap: wrap; flex: 1; overflow-x: auto; border: 1px solid var(--light-border-color);">
                    </div>
                `);
            htmlElementChipInputContainer.setEventStuffs([
                ({ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: handleElementClickChipInputContainer }),
            ]);
            htmlElementChipInputContainer.setAttributes([["data-items", JSON.stringify(itemList)]]);
            if (itemList.length) {
                itemList.forEach((chipText) => {
                    htmlElementChipInputContainer.appendChild(createHtmlElementChip(chipText));
                });
            }
            const dataFromLocalDatabase = await getDataFromLocalDatabase();
            const isNeedPlaceholder = ((dataFromLocalDatabase === null) || ((dataFromLocalDatabase?.length === 1) && !dataFromLocalDatabase?.[0]?.items?.length));
            htmlElementChipInputContainer.appendChild(createHtmlElementChipInput(isNeedPlaceholder ? chipInputPlaceholder : ""));
            return htmlElementChipInputContainer;
        }

        async function manageChipInputValue(event) {
            const htmlElementChipInput = event.target;
            const htmlElementChipInputContainer = htmlElementChipInput.parentElement;
            const chipInputValueAsList = htmlElementChipInput.value.split(",").filter((chipText) => (chipText.trim() !== ""));
            const chipInputValueAsListMergedWithDataset = ((htmlElementChipInputContainer.getAttribute("data-items") === "") ? chipInputValueAsList : ((() => {
                const datasetItemsJsonParsed = JSON.parse(htmlElementChipInputContainer.getAttribute("data-items") || []);
                chipInputValueAsList.forEach((chipText) => {
                    datasetItemsJsonParsed.push(chipText);
                })
                return datasetItemsJsonParsed;
            })()));
            const chipInputValueAsListNoDuplicate = WillyHorizont.Utils.removeDuplicateListItem(chipInputValueAsListMergedWithDataset);

            htmlElementChipInputContainer.setAttribute("data-items", JSON.stringify(chipInputValueAsListNoDuplicate));

            htmlElementChipInputContainer.innerHTML = "";

            chipInputValueAsListNoDuplicate.forEach((chipText) => {
                htmlElementChipInputContainer.appendChild(createHtmlElementChip(chipText));
            });

            htmlElementChipInput.value = "";
            htmlElementChipInput.removeEventListener("keydown", htmlElementChipInput.refEventHandlerKeyDown);
            htmlElementChipInput.removeEventListener("blur", htmlElementChipInput.refEventHandlerBlur);
            htmlElementChipInput.remove();

            const htmlElementChipInputNew = createHtmlElementChipInput();

            htmlElementChipInputContainer.appendChild(htmlElementChipInputNew);

            await syncWithMainContent();

            return htmlElementChipInputNew;
        }

        async function manageChipUpdateInputValue(event) {
            const htmlElementChipUpdateInputIndex = Array.from(event.target.parentElement.children).indexOf(event.target);
            const htmlElementChipUpdateInput = event.target;
            const htmlElementChipInputContainer = htmlElementChipUpdateInput.parentElement;
            const datasetItemsNewValue = JSON.parse(htmlElementChipInputContainer.getAttribute("data-items") || []).filter((chipTextInsideDataset, chipTextInsideDatasetIndex) => ((htmlElementChipUpdateInput.value.includes(chipTextInsideDataset) === false) && (chipTextInsideDatasetIndex !== htmlElementChipUpdateInputIndex)));
            const chipUpdateInputValueAsList = htmlElementChipUpdateInput.value.split(",").filter((chipText) => (chipText.trim() !== ""));
            chipUpdateInputValueAsList.forEach((chipText, chipTextIndex) => {
                datasetItemsNewValue.splice((htmlElementChipUpdateInputIndex + chipTextIndex), 0, chipText);
            })

            htmlElementChipInputContainer.setAttribute("data-items", JSON.stringify(datasetItemsNewValue));

            htmlElementChipInputContainer.innerHTML = "";

            datasetItemsNewValue.forEach((chipText) => {
                htmlElementChipInputContainer.appendChild(createHtmlElementChip(chipText));
            });

            htmlElementChipUpdateInput.value = "";
            htmlElementChipUpdateInput.removeEventListener("keydown", htmlElementChipUpdateInput.refEventHandlerKeyDown);
            htmlElementChipUpdateInput.removeEventListener("blur", htmlElementChipUpdateInput.refEventHandlerBlur);
            htmlElementChipUpdateInput.remove();

            const htmlElementChipInputNew = createHtmlElementChipInput();

            htmlElementChipInputContainer.appendChild(htmlElementChipInputNew);

            await syncWithMainContent();

            return htmlElementChipInputNew;
        }

        async function handleEventKeyDownChipInput(event) {
            if ((event.key === "Enter") || (event.keyCode === 13)) {
                if (event.target.value.trim() === "") {
                    event.preventDefault();
                    event.target.blur();
                    return;
                }
                const htmlElementChipInputNew = await manageChipInputValue(event);
                htmlElementChipInputNew.setAttribute("placeholder", chipInputPlaceholder);
                htmlElementChipInputNew.focus();
                event.preventDefault();
                event.target.blur();
                return;
            }
        }

        async function handleEventBlurChipInput(event) {
            if (event.target.value.trim() === "") {
                event.target.setAttribute("placeholder", "");
                event.preventDefault();
                return;
            }
            const htmlElementChipInputNew = await manageChipInputValue(event);
            htmlElementChipInputNew.setAttribute("placeholder", "");
            event.preventDefault();
        }

        async function handleEventKeyDownChipUpdateInput(event) {
            if ((event.key === "Enter") || (event.keyCode === 13)) {
                if (event.target.value.trim() === "") {
                    event.preventDefault();
                    return;
                }

                await manageChipUpdateInputValue(event);
                event.preventDefault();
                return;
            }
        }

        async function handleEventBlurChipUpdateInput(event) {
            const htmlElementChipInputContainer = event.target.parentElement;
            if (event.target.value.trim() === "") {
                event.target.setAttribute("placeholder", event.target.getAttribute("data-item"));
                event.target.value = (event.target.getAttribute("data-item") || "");
                event.target.focus();
                htmlElementChipInputContainer.addEventListener("click", htmlElementChipInputContainer.refElementHandlerClick);
                event.preventDefault();
                return;
            }
            const htmlElementChipInputNew = await manageChipUpdateInputValue(event);
            htmlElementChipInputNew.setAttribute("placeholder", "");
            htmlElementChipInputContainer.addEventListener("click", htmlElementChipInputContainer.refElementHandlerClick);
            event.preventDefault();
        }

        function handleElementClickChipText(htmlElementChipText) {
            return ((event) => {
                htmlElementChipText.removeEventListener("click", htmlElementChipText.refElementHandlerClick);
                const htmlElementChipInputContainer = htmlElementChipText.parentElement.parentElement;
                htmlElementChipInputContainer.removeEventListener("click", htmlElementChipInputContainer.refElementHandlerClick);
                const htmlElementChipUpdateInput = createHtmlElementChipUpdateInput(htmlElementChipText.parentElement.getAttribute("data-item"));
                htmlElementChipUpdateInput.setAttribute("placeholder", chipInputPlaceholder);
                htmlElementChipUpdateInput.value = (event.target.parentElement.getAttribute("data-item") || "");
                htmlElementChipText.parentElement.replaceWith(htmlElementChipUpdateInput);
                htmlElementChipUpdateInput.focus();
                htmlElementChipInputContainer.scrollLeft = 0;
            });
        }

        function handleElementClickChipInputContainer(htmlElementChipInputContainer) {
            return ((event) => {
                const htmlElementChipInput = htmlElementChipInputContainer.querySelector('[data-id="chip-input"]');
                htmlElementChipInput.setAttribute("placeholder", chipInputPlaceholder);
                htmlElementChipInput.value = (event.target.parentElement.getAttribute("data-item") || "");
                htmlElementChipInput.focus();
            });
        }

        function handleElementClickChipRemoveButton(htmlElementChipRemoveButton) {
            return (async (event) => {
                const htmlElementChipInputContainer = htmlElementChipRemoveButton.parentElement.parentElement;
                const htmlElementChipContainer = htmlElementChipRemoveButton.parentElement;
                htmlElementChipInputContainer.setAttribute("data-items", JSON.stringify(JSON.parse(htmlElementChipInputContainer.getAttribute("data-items") || []).filter((chipText) => (chipText !== htmlElementChipContainer.getAttribute("data-item")))));
                htmlElementChipRemoveButton.removeEventListener("click", htmlElementChipRemoveButton.refElementHandlerClick);
                htmlElementChipContainer.removeEventListener("click", htmlElementChipContainer.refElementHandlerClick);
                htmlElementChipContainer.setAttribute("data-item", "");
                htmlElementChipContainer.remove();
                htmlElementChipInputContainer.querySelector('[data-id="chip-input"]').setAttribute("placeholder", chipInputPlaceholder);
                await syncWithMainContent();
            })
        }

        return {
            createHtmlElementChipInputContainer,
        };
    };

    const initializeComponentImportExport = ({ saveDataToLocalDatabase, getDataFromLocalDatabase, renderMainContent, getDataFromMainContent }) => {
        document.getElementById("placeholder-import-export").innerHTML = (/*html*/`
            <div id="import-export-container" style="padding: 4px; width: 100%; display: flex; flex-direction: column;">
                <h2 style="margin-top: 8px;">Import & Export:</h2>
                <textarea id="import-export-textarea" style="margin-top: 16px;" rows="4" cols="50"></textarea>
                <div id="placeholder-error" style="margin-top: 8px;"></div>
            </div>`);

        document.getElementById("import-export-textarea").addEventListener("blur", handleEventBlurImportExportTextArea);

        async function handleEventBlurImportExportTextArea(event) {
            document.getElementById("placeholder-error").innerHTML = "";
            if (event.target.value.trim() === "") {
                event.preventDefault();
                return;
            }

            try {
                let dataFromImportExportTextAreaContent = JSON.parse(event.target.value);
                dataFromImportExportTextAreaContent = dataFromImportExportTextAreaContent?.map?.((anyListItem) => {
                    if (anyListItem?.["uuid"]) return anyListItem;
                    anyListItem["uuid"] = crypto.randomUUID();
                    return anyListItem;
                });
                await saveDataToLocalDatabase(dataFromImportExportTextAreaContent);
                updateImportExportTextAreaValue(dataFromImportExportTextAreaContent);
                await (renderMainContent(dataFromImportExportTextAreaContent));
            } catch (anyError) {
                document.getElementById("placeholder-error").innerHTML = (/*html*/`<p style="color: red;">Format export-an yang di-import tidak sesuai.</p>`);
            }

            event.preventDefault();
        }

        function updateImportExportTextAreaValue(importExportTextAreaNewValue) {
            document.getElementById("import-export-textarea").value = ((importExportTextAreaNewValue === null) ? "" : JSON.stringify(importExportTextAreaNewValue));
        }

        async function syncWithMainContent() {
            const dataFromMainContent = getDataFromMainContent();
            await saveDataToLocalDatabase(dataFromMainContent);
            updateImportExportTextAreaValue(dataFromMainContent);
            document.getElementById("placeholder-error").innerHTML = "";
        }

        async function syncWithLocalDatabase() {
            const dataFromLocalDatabase = await getDataFromLocalDatabase();
            if (dataFromLocalDatabase === null) return;
            updateImportExportTextAreaValue(dataFromLocalDatabase);
            await (renderMainContent(dataFromLocalDatabase));
        }

        return {
            updateImportExportTextAreaValue,
            syncWithMainContent,
            syncWithLocalDatabase,
        }
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
        initializeLocalDatabase,
        initializeComponentPopup,
        initializeComponentChipInput,
        initializeComponentImportExport,
        setupViewportHeightListener,
        setupViewportHeightFromViewportWidthListener,
        getAspectRatio,
        getViewportHeightFromViewportWidth,
    };
})());
