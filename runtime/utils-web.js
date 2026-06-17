((root, factory) => {
    // UMD (Universal Module Definition)
    if ((typeof window !== "undefined") && (typeof document !== "undefined")) {
        // Web Browser environment non module script (script with no type="module")
        root.WillyHorizont = (root.WillyHorizont || {});
        root.WillyHorizont.UtilsWeb = factory(root);
        return;
    }
    if ((typeof module !== "undefined") && ("exports" in module) && (typeof module.exports !== "undefined")) {
        // Node.js CommonJS environment may also support Web Browser environment module script (script with type="module") and Node.js ES Module (ESM) environment
        return;
    }
    // Unknown / unsupported environment
})(globalThis, (root) => {
    if (!(root.WillyHorizont && root.WillyHorizont.Utils)) {
        throw new Error("WillyHorizont.UtilsWeb requires WillyHorizont.Utils to be loaded first");
    }

    const setupLocalDatabase = (databaseNameInString) => {
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
    const getLeadingWhiteSpaceVersionOne = (anyString) => ((stringMatchList) => (stringMatchList ? stringMatchList[0].length : 0))(anyString.match(new RegExp(`^\s+`, "g")));
    const getLeadingWhiteSpaceVersionTwo = (anyString) => ((stringMatchList) => (stringMatchList ? stringMatchList[0].length : 0))(anyString.match(new RegExp(`^\s*`, "g")));
    const getLeadingWhiteSpaceVersionThree = (anyString) => (anyString.search(new RegExp(`\S`, "g")));
    const getLeadingWhiteSpaceVersionFour = (anyString) => (anyString.length - anyString.trimStart().length);
    const removeTemplateStringIndentation = (htmlTemplateString = "") => (htmlTemplateString.split("\n").filter((htmlTemplateStringLine) => (htmlTemplateStringLine.trim() !== "")).join("\n"));
    const createSetHtmlElementPropertyValues = (htmlElement) => ((arrayOfEntryProperty) => ([(arrayOfEntryProperty.forEach(([htmlElementProperty, htmlElementPropertyValue]) => (Reflect.set(htmlElement, htmlElementProperty, htmlElementPropertyValue)))), htmlElement].at(-1)));
    const createSetHtmlElementEventStuffs = (htmlElement) => ((arrayOfElementEventStuff) => ([(arrayOfElementEventStuff.forEach(({ handlerRefName, eventType, elementHandler, eventHandler }) => (((handlerFunction) => ([(Reflect.set(htmlElement, handlerRefName, handlerFunction)), (htmlElement.addEventListener(eventType, handlerFunction)), undefined].at(-1)))(eventHandler || elementHandler(htmlElement))))), htmlElement].at(-1)));
    const createSetHtmlElementAttributes = (htmlElement) => ((arrayOfEntryAttribute) => ([(arrayOfEntryAttribute.forEach(([htmlElementAttribute, htmlElementAttributeValue]) => (htmlElement.setAttribute(htmlElementAttribute, String(htmlElementAttributeValue))))), htmlElement].at(-1)));
    const attachMethodToHtmlElementRecursively = (htmlElement) => {
        if (!Reflect.has(htmlElement, "setPropertyValues")) Reflect.set(htmlElement, "setPropertyValues", createSetHtmlElementPropertyValues(htmlElement));
        if (!Reflect.has(htmlElement, "setEventStuffs")) Reflect.set(htmlElement, "setEventStuffs", createSetHtmlElementEventStuffs(htmlElement));
        if (!Reflect.has(htmlElement, "setAttributes")) Reflect.set(htmlElement, "setAttributes", createSetHtmlElementAttributes(htmlElement));
        if (!htmlElement.children.length) return;
        WillyHorizont.Utils.forEach(htmlElement.children, (htmlElementInnerChild) => {
            attachMethodToHtmlElementRecursively(htmlElementInnerChild);
        });
    };
    const htmlTemplateStringToHtmlElement = (htmlTemplateString) => {
        const htmlElementNew = (((htmlElementTemplate) => ([(Reflect.set(htmlElementTemplate, "innerHTML", htmlTemplateString.trim())), (htmlElementTemplate.content.firstElementChild)].at(-1)))(document.createElement("template")));
        attachMethodToHtmlElementRecursively(htmlElementNew);
        return htmlElementNew;
    };
    const appendChildrenReturnParent = (htmlElementParent, ...htmlElementChildren) => ([(htmlElementChildren.forEach((htmlElementChild) => (htmlElementParent.appendChild(htmlElementChild)))), htmlElementParent].at(-1));
    const getIsUserUsingChromiumBasedWebBrowser = () => (((typeof window !== "undefined") && ("chrome" in window) && (typeof window.chrome !== "undefined")) && ((typeof navigator !== "undefined") && ("userAgentData" in navigator) && (typeof navigator.userAgentData !== "undefined") && ("getHighEntropyValues" in navigator.userAgentData) && (typeof navigator.userAgentData.getHighEntropyValues === "function")));
    const getUserChromiumBasedWebBrowserData = async () => {
        const isUserUsingChromiumBasedWebBrowser = getIsUserUsingChromiumBasedWebBrowser();
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
        const getChromiumBasedWebBrowserLatestStableVersionResponse = await WillyHorizont.Utils.fetchThrowErrorIfNotOk("https://chromiumdash.appspot.com/fetch_releases?channel=Stable&num=1");
        const getChromiumBasedWebBrowserLatestStableVersionResponseJson = await getChromiumBasedWebBrowserLatestStableVersionResponse.json();
        // console.log({ getChromiumBasedWebBrowserLatestStableVersionResponseJson });
        return getChromiumBasedWebBrowserLatestStableVersionResponseJson;
    };
    const getIsUserUsingMinimumStableChromiumBasedWebBrowser = async () => {
        const userChromiumBasedWebBrowserData = await getUserChromiumBasedWebBrowserData();
        if (!userChromiumBasedWebBrowserData) return false;
        const latestStableChromiumBasedWebBrowserListData = await getLatestStableChromiumBasedWebBrowserLstData();
        const latestStableChromiumBasedWebBrowserMatchUserPlatformData = latestStableChromiumBasedWebBrowserListData?.find?.((latestStableChromiumBasedWebBrowserData) => (latestStableChromiumBasedWebBrowserData?.["platform"] === userChromiumBasedWebBrowserData?.["platform"]));
        const userChromiumBasedWebBrowserVersion = userChromiumBasedWebBrowserData["version"];
        const latestStableChromiumBasedWebBrowserMatchUserPlatformVersion = latestStableChromiumBasedWebBrowserMatchUserPlatformData?.["version"];
        if (!latestStableChromiumBasedWebBrowserMatchUserPlatformVersion) return false;
        const userChromiumBasedWebBrowserMajorVersion = parseInt(userChromiumBasedWebBrowserVersion.split(".").at(0), 10);
        const latestStableChromiumBasedWebBrowserMatchUserPlatformMajorVersion = parseInt(latestStableChromiumBasedWebBrowserMatchUserPlatformVersion.split(".").at(0), 10);
        const minimumStableChromiumBasedWebBrowserMatchUserPlatformMajorVersion = (latestStableChromiumBasedWebBrowserMatchUserPlatformMajorVersion - 2);
        return (userChromiumBasedWebBrowserMajorVersion >= minimumStableChromiumBasedWebBrowserMatchUserPlatformMajorVersion);
    };
    const getWhiteSpaceStringAlignmnt = (targetStringLength, sourceStringLength, stringAligner) => (stringAligner.repeat(targetStringLength - sourceStringLength));

    const getAspectRatio = () => {
        const currentViewportWidth = (WillyHorizont.Utils.safeGetObjectProperty(window, "window.visualViewport.width") || window.innerWidth);
        const currentViewportHeight = (WillyHorizont.Utils.safeGetObjectProperty(window, "window.visualViewport.height") || window.innerHeight);
        const getGreatestCommonFactor = (a, b) => ((b === 0) ? a : getGreatestCommonFactor(b, (a % b)));
        const greatestCommonFactor = getGreatestCommonFactor(currentViewportWidth, currentViewportHeight);
        return [(currentViewportWidth / greatestCommonFactor), (currentViewportHeight / greatestCommonFactor)];
    };

    const getViewportWidthMultiplier = () => (((rw, rh) => (rh / rw))(getAspectRatio()));

    const setupViewportHeightFromViewportWidthListener = () => {
        let requestAnimationFrameId;

        const updateViewportHeightFromViewportWidth = () => {
            cancelAnimationFrame(requestAnimationFrameId);

            requestAnimationFrameId = requestAnimationFrame(() => {
                const [ratioWidth, ratioHeight] = getAspectRatio();
                const viewportWidthMultiplier = getViewportWidthMultiplier();
                const maxHeight = ((ratioWidth > ratioHeight) ? (`calc(100vw * ${viewportWidthMultiplier} * (20 / 100))`) : (`calc(calc(100vw * ${viewportWidthMultiplier}) * calc(${viewportWidthMultiplier} * (40 / 100)))`));
                document.documentElement.style.setProperty("--max-height", maxHeight);
                // console.log({
                //     ratioWidth, ratioHeight,
                //     viewportWidthMultiplier,
                //     maxHeight,
                // });
            });
        };

        updateViewportHeightFromViewportWidth();

        window.addEventListener("resize", updateViewportHeightFromViewportWidth);
        window.addEventListener("orientationchange", updateViewportHeightFromViewportWidth);
        if (WillyHorizont.Utils.getIsMethodAvailable(window, "window.visualViewport.addEventListener")) {
            window.visualViewport.addEventListener("resize", updateViewportHeightFromViewportWidth);
        }
    };

    const setupViewportHeightListener = () => {
        const LOCAL_STORAGE_KEY_VIEWPORT_HEIGHT = "viewport-height";
        let requestAnimationFrameId;

        const overrideStyleVariableRealViewportHeight = (newViewportHeightValue) => {
            document.documentElement.style.setProperty("--real-vh", `${(newViewportHeightValue * 0.01)}px`);
        };

        const updateRealViewportHeight = () => {
            cancelAnimationFrame(requestAnimationFrameId);

            requestAnimationFrameId = requestAnimationFrame(() => {
                const currentViewportHeight = (WillyHorizont.Utils.safeGetObjectProperty(window, "window.visualViewport.height") || window.innerHeight);

                if (localStorage.getItem(LOCAL_STORAGE_KEY_VIEWPORT_HEIGHT) === null) {
                    localStorage.setItem(LOCAL_STORAGE_KEY_VIEWPORT_HEIGHT, currentViewportHeight);
                    overrideStyleVariableRealViewportHeight(currentViewportHeight);
                    return;
                }

                const lockedViewportHeightInLocalStorage = parseFloat(localStorage.getItem(LOCAL_STORAGE_KEY_VIEWPORT_HEIGHT));
                if (currentViewportHeight > lockedViewportHeightInLocalStorage) {
                    localStorage.setItem(LOCAL_STORAGE_KEY_VIEWPORT_HEIGHT, currentViewportHeight);
                    overrideStyleVariableRealViewportHeight(currentViewportHeight);
                    return;
                }

                overrideStyleVariableRealViewportHeight(lockedViewportHeightInLocalStorage);
            });
        };

        updateRealViewportHeight();

        window.addEventListener("resize", updateRealViewportHeight);
        window.addEventListener("orientationchange", () => {
            localStorage.removeItem(LOCAL_STORAGE_KEY_VIEWPORT_HEIGHT);
            updateRealViewportHeight();
        });
        if (WillyHorizont.Utils.getIsMethodAvailable(window, "window.visualViewport.addEventListener")) {
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

    const setupComponentPopup = ({ popupId, popupStackingOrder, titleString, htmlTemplateStringContentChildren }) => {
        document.body.appendChild(htmlTemplateStringToHtmlElement(getHtmlTemplateStringPopupStyle(popupStackingOrder)));
        const htmlElementPopupOverlay = htmlTemplateStringToHtmlElement(/*html*/`
                <div data-id="popup-overlay-${popupId}" class="popup-overlay">
                </div>
            `);
        const htmlElementPopupBox = htmlTemplateStringToHtmlElement(/*html*/`
                <div data-id="popup-box-${popupId}" class="popup-box">
                </div>
            `);
        const htmlElementPopupHeader = htmlTemplateStringToHtmlElement(/*html*/`
                <div data-id="popup-header-${popupId}" class="popup-header">
                </div>
            `);
        htmlElementPopupHeader.appendChild(htmlTemplateStringToHtmlElement(/*html*/`
                <h3 style="flex: 1; line-height: 1; text-align: center;">${titleString}</h3>
            `));
        const popupCloseButton = htmlTemplateStringToHtmlElement(/*html*/`
                <button data-id="popup-close-button-${popupId}" class="popup-close-button">&times;</button>
            `);
        htmlElementPopupHeader.appendChild(popupCloseButton);
        const htmlElementPopupBody = htmlTemplateStringToHtmlElement(/*html*/`
                <div data-id="popup-body-${popupId}" class="popup-body">
                </div>
            `);
        htmlTemplateStringContentChildren.forEach((htmlTemplateStringContent) => {
            htmlElementPopupBody.appendChild(htmlTemplateStringToHtmlElement(htmlTemplateStringContent));
        })
        htmlElementPopupBox.appendChild(htmlElementPopupHeader);
        htmlElementPopupBox.appendChild(htmlElementPopupBody);
        htmlElementPopupOverlay.appendChild(htmlElementPopupBox);
        document.body.appendChild(htmlElementPopupOverlay);

        const openPopup = () => {
            document.querySelector(`[data-id=popup-overlay-${popupId}]`).style.display = "flex";
            // htmlElementPopupOverlay.style.display = "flex";
        };

        const closePopup = () => {
            document.querySelector(`[data-id=popup-overlay-${popupId}]`).style.display = "none";
            // htmlElementPopupOverlay.style.display = "none";
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

    const setupComponentChipInput = ({ chipInputPlaceholder, getDataFromLocalDatabase, syncWithMainContent }) => {
        document.body.appendChild(htmlTemplateStringToHtmlElement(/*html*/`
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
            const htmlElementChipText = htmlTemplateStringToHtmlElement(/*html*/`
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
            const htmlElementChipRemoveButton = htmlTemplateStringToHtmlElement(/*html*/`
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
            const htmlElementChipContainer = htmlTemplateStringToHtmlElement(/*html*/`
                    <div data-id="chip-container" style="cursor: pointer; padding: 4px 6px; border-radius: 0.2em; display: flex; align-items: center; gap: 12px; flex: 0 0 auto; border: 1px solid var(--light-border-color); color: var(--light-text-color); background-color: #ffdddd;">
                    </div>
                `);
            htmlElementChipContainer.setAttributes([["data-item", chipTextTrimmed]]);
            htmlElementChipContainer.appendChild(createHtmlElementChipTextContainer([["textContent", chipTextTrimmed]]));
            htmlElementChipContainer.appendChild(createHtmlElementChipRemoveButton());
            return htmlElementChipContainer;
        }

        function createHtmlElementChipInput(placeholderValue = "") {
            const htmlElementChipInput = htmlTemplateStringToHtmlElement(/*html*/`
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
            const htmlElementChipUpdateInput = htmlTemplateStringToHtmlElement(/*html*/`
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
            const htmlElementChipInputContainer = htmlTemplateStringToHtmlElement(/*html*/`
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
                datasetItemsNewValue.splice((htmlElementChipUpdateInputIndex + chipTextIndex), 0, chipText); // TODO why not use toSpliced?
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

    const setupComponentImportExport = ({ saveDataToLocalDatabase, getDataFromLocalDatabase, renderMainContent, getDataFromMainContent }) => {
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

    const setupDataThemeObserver = (callbackFunction) => {
        const htmlElement = document.documentElement;

        const dataThemeObserver = new MutationObserver((mutationList) => {
            for (const mutation of mutationList) {
                if (mutation.attributeName === "data-theme") {
                    const currentTheme = htmlElement.getAttribute("data-theme");
                    callbackFunction(currentTheme);
                    /*
                    if (currentTheme === "dark") {
                        htmlElementTestDataThemeObserverContainer.style.backgroundColor = "yellow";
                        htmlElementTestDataThemeObserverContainer.style.color = "black";
                    } else {
                        htmlElementTestDataThemeObserverContainer.style.backgroundColor = "blue";
                        htmlElementTestDataThemeObserverContainer.style.color = "white";
                    }
                    */
                    break;
                }
            }
        });

        dataThemeObserver.observe(htmlElement, { attributes: true, attributeFilter: ["data-theme"] });

        // dataThemeObserver.disconnect();
        return dataThemeObserver;
    };

    const setupComponentGithubProgrammingLanguagesCard = (programmingLanguages) => {
        const isInDarkMode = (document.documentElement.getAttribute("data-theme") === "dark");

        const totalProgrammingLanguages = programmingLanguages.length;
        const programmingLanguagePercentage = ((1 / totalProgrammingLanguages) * 100);
        const otherPercentage = parseFloat((programmingLanguagePercentage % 1).toFixed(2)).toString();
        const programmingLanguagePercentageRounded = Math.floor(programmingLanguagePercentage);

        const programmingLanguagesBarChartContainerWidth = ((totalProgrammingLanguages * 20) + "px")
        const styles = window.getComputedStyle(document.documentElement);
        const darkBackgroundColor = styles.getPropertyValue("--dark-background-color").trim();
        const lightBackgroundColor = styles.getPropertyValue("--light-background-color").trim();
        const otherColor = "#ededed";

        const [programmingLanguageBarChartContainerInnerHtml, programmingLanguagesTextContainerInnerHtml] = (programmingLanguages.reduce((([programmingLanguageBarChartContainerInnerHtmlCurrent, programmingLanguagesTextContainerInnerHtmlCurrent], programmingLanguage, programmingLanguageIndex) => {
            const howCloseRgbHexColorPercentageInDarkMode = WillyHorizont.Utils.getHowCloseRgbHexColor(darkBackgroundColor, programmingLanguage["color"]);
            const howCloseRgbHexColorPercentageInLightMode = WillyHorizont.Utils.getHowCloseRgbHexColor(lightBackgroundColor, programmingLanguage["color"]);

            const darkBorderColor = ((howCloseRgbHexColorPercentageInDarkMode > 80) ? "var(--light-border-color)" : programmingLanguage["color"]);
            const lightBorderColor = ((howCloseRgbHexColorPercentageInLightMode > 70) ? "var(--dark-border-color)" : programmingLanguage["color"]);

            let programmingLanguageBarChartContainerInnerHtmlNewItem =  removeTemplateStringIndentation(programmingLanguageBarChartContainerInnerHtmlCurrent.trimStart() + (/*html*/`
                                                <div data-id="programming-language-percentage" data-dark-border-color="${darkBorderColor}" data-light-border-color="${lightBorderColor}" style="border-radius: ${(programmingLanguageIndex === 0) ? '6px 0 0 6px' : 0}; width: ${programmingLanguagePercentageRounded}%; flex: 1; height: 8px; background-color: ${programmingLanguage["color"]}; border: 1px solid ${isInDarkMode ? darkBorderColor : lightBorderColor};">
                                                </div>
            `));
            let programmingLanguagesTextContainerInnerHtmlNewItem = removeTemplateStringIndentation(programmingLanguagesTextContainerInnerHtmlCurrent.trimStart() + (/*html*/`
                                                <a data-id="programming-language-text" href="https://github.com/willyhorizont/cross-language-programming-concepts/tree/main/languages/${programmingLanguage["id"]}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: flex; flex-direction: row; align-items: center; margin-right: 16px;">
                                                    <div data-id="github-programming-language-color-code" data-dark-border-color="${darkBorderColor}" data-light-border-color="${lightBorderColor}" style="width: 0.5em; height: 0.5em; border-radius: 50%; margin-right: 8px; aspect-ratio: 1; background-color: ${programmingLanguage["color"]}; border: 1px solid ${isInDarkMode ? darkBorderColor : lightBorderColor};"></div>
                                                    <p style="font-size: 0.75em; font-weight: 600; margin-right: 8px; word-break: break-word;">${programmingLanguage["stack"].map((programmingLanguageStack) => (programmingLanguageStack["name"])).join(" / ")}</p>
                                                    <p style="font-size: 0.75em;">${programmingLanguagePercentageRounded}%</p>
                                                </a>
            `));

            const isLastProgrammingLanguage = (programmingLanguageIndex === (programmingLanguages.length - 1));

            if (isLastProgrammingLanguage === true) {
                programmingLanguageBarChartContainerInnerHtmlNewItem += (/*html*/`
                                                <div data-id="programming-language-percentage" data-dark-border-color="${otherColor}" data-light-border-color="${darkBackgroundColor}" style="border-radius:0 6px 6px 0; width: ${otherPercentage}%; flex: 1; height: 8px; background-color: ${otherColor}; border: 1px solid ${isInDarkMode ? otherColor : darkBackgroundColor};">
                                                </div>
                `);
                programmingLanguagesTextContainerInnerHtmlNewItem += (/*html*/`
                                                <a data-id="programming-language-text" href="https://github.com/willyhorizont" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit; display: flex; flex-direction: row; align-items: center; margin-right: 16px;">
                                                    <div data-id="github-programming-language-color-code" data-dark-border-color="${otherColor}" data-light-border-color="${darkBackgroundColor}" style="width: 0.5em; height: 0.5em; border-radius: 50%; margin-right: 8px; aspect-ratio: 1; background-color: ${otherColor}; border: 1px solid ${isInDarkMode ? otherColor : darkBackgroundColor};"></div>
                                                    <p style="font-size: 0.75em; font-weight: 600; margin-right: 8px; word-break: break-word;">Other</p>
                                                    <p style="font-size: 0.75em;">${otherPercentage}%</p>
                                                </a>
                `);
            }

            return ([ programmingLanguageBarChartContainerInnerHtmlNewItem, programmingLanguagesTextContainerInnerHtmlNewItem ]);
        }), ["", ""]));

        document.getElementById("placeholder-github-programming-languages-card").innerHTML = removeTemplateStringIndentation(/*html*/`
                            <div data-id="programming-languages-card" class="programming-languages-card" style="display: flex; flex-direction: column; flex-wrap: wrap; row-gap: 8px; border: 1px solid var(--light-border-color); border-radius: 6px; padding: 8px; width: 100%;">
                                <div style="display: flex; justify-content: center; align-items: center;">
                                    <div style="display: flex; flex-direction: column; width: 100%;">
                                        <p style="margin-bottom: 16px; font-weight: 600;">Programming Languages</p>
                                        <div data-id="programming-languages-bar-chart-container" class="programming-languages-bar-chart-container" style="display: flex; flex-direction: row; 100%; width: 100%; border-radius: 6px; column-gap: 1px; background-color: ${isInDarkMode ? 'var(--dark-background-color)' : 'var(--light-background-color)'};">
                                            ${programmingLanguageBarChartContainerInnerHtml}
                                        </div>
                                        <div id="programming-languages-text-container" style="display: flex; flex-direction: row; margin-top: 8px; flex-wrap: wrap; row-gap: 8px; padding: 4px; width: 100%;">
                                            ${programmingLanguagesTextContainerInnerHtml}
                                        </div>
                                    </div>
                                </div>
                            </div>
        `);

        setupDataThemeObserver((currentTheme) => {
            const htmlElementProgrammingLanguagesCard = document.querySelector(`[data-id="programming-languages-card"]`);
            const htmlElementProgrammingLanguagesBarChartContainer = htmlElementProgrammingLanguagesCard.querySelector(`[data-id="programming-languages-bar-chart-container"]`);
            if (currentTheme === "dark") {
                htmlElementProgrammingLanguagesCard.style.border = "1px solid var(--dark-border-color)";
                htmlElementProgrammingLanguagesBarChartContainer.style.backgroundColor = "var(--dark-background-color)";
                document.querySelectorAll(`[data-id="github-programming-language-color-code"]`).forEach((htmlElementGithubProgrammingLanguageColorCode) => {
                    htmlElementGithubProgrammingLanguageColorCode.style.borderColor = htmlElementGithubProgrammingLanguageColorCode.getAttribute("data-dark-border-color");
                });
                document.querySelectorAll(`[data-id="programming-language-percentage"]`).forEach((htmlElementProgrammingLanguagePercentage) => {
                    htmlElementProgrammingLanguagePercentage.style.borderColor = htmlElementProgrammingLanguagePercentage.getAttribute("data-dark-border-color");
                });
                return;
            }
            if (currentTheme === "light") {
                htmlElementProgrammingLanguagesCard.style.border = "1px solid var(--light-border-color)";
                htmlElementProgrammingLanguagesBarChartContainer.style.backgroundColor = "var(--light-background-color)";
                document.querySelectorAll(`[data-id="github-programming-language-color-code"]`).forEach((htmlElementGithubProgrammingLanguageColorCode) => {
                    htmlElementGithubProgrammingLanguageColorCode.style.borderColor = htmlElementGithubProgrammingLanguageColorCode.getAttribute("data-light-border-color");
                });
                document.querySelectorAll(`[data-id="programming-language-percentage"]`).forEach((htmlElementProgrammingLanguagePercentage) => {
                    htmlElementProgrammingLanguagePercentage.style.borderColor = htmlElementProgrammingLanguagePercentage.getAttribute("data-light-border-color");
                });
                return;
            }
        });
    };

    return {
        IS_IN_DEVELOPMENT_MODE,
        removeTemplateStringIndentation,
        htmlTemplateStringToHtmlElement,
        appendChildrenReturnParent,
        getIsUserUsingChromiumBasedWebBrowser,
        getUserChromiumBasedWebBrowserData,
        getLatestStableChromiumBasedWebBrowserLstData,
        getIsUserUsingMinimumStableChromiumBasedWebBrowser,
        getWhiteSpaceStringAlignmnt,
        setupLocalDatabase,
        setupComponentPopup,
        setupComponentChipInput,
        setupComponentImportExport,
        setupViewportHeightListener,
        setupViewportHeightFromViewportWidthListener,
        getAspectRatio,
        getViewportWidthMultiplier,
        setupDataThemeObserver,
        setupComponentGithubProgrammingLanguagesCard,
    };
});
