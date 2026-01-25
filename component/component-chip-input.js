/*
req:
    window.WillyHorizont.Utils
    window.UtilsWeb
*/

class ComponentChipInput {
    constructor({ chipInputPlaceholder, collectionOrStoreKey, localDatabase, syncLocalStorageDataImportExportTextAreaContentWithMainContent }) {
        this.chipInputPlaceholder = chipInputPlaceholder;
        this.collectionOrStoreKey = collectionOrStoreKey;
        this.localDatabase = localDatabase;
        this.syncLocalStorageDataImportExportTextAreaContentWithMainContent = syncLocalStorageDataImportExportTextAreaContentWithMainContent;
    }

    createHtmlElementChipTextContainer = (arrayOfEntryProperty) => {
        const htmlElementChipText = window.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
            <span data-id="chip-text" style="white-space: nowrap;">
            </span>`
        );
        htmlElementChipText.setPropertyValues(arrayOfEntryProperty);
        htmlElementChipText.setEventStuffs([
            ({ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: this.handleElementClickChipText }),
        ]);
        return htmlElementChipText;
    };

    createHtmlElementChipRemoveButton = () => {
        const htmlElementChipRemoveButton = window.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
            <div data-id="chip-remove-button" style="display: flex; align-items: center; justify-content: center; line-height: 1.2em; background-color: var(--accent-color-4); color: var(--dark-text-color); width: 1.6em; aspect-ratio: 1 / 1; border-radius: 50%;">
                <span data-id="chip-remove-button-content" style="cursor: pointer; font-weight: bold;">×</span>
            </div>`
        );
        htmlElementChipRemoveButton.setEventStuffs([
            ({ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: this.handleElementClickChipRemoveButton }),
        ]);
        return htmlElementChipRemoveButton;
    };

    createHtmlElementChip = (chipTextTrimmed) => {
        const htmlElementChipContainer = window.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
            <div data-id="chip-container" style="cursor: pointer; padding: 4px 6px; border-radius: 0.2em; display: flex; align-items: center; gap: 12px; flex: 0 0 auto; border: 1px solid var(--light-border-color); color: var(--light-text-color); background-color: #ffdddd;">
            </div>`
        );
        htmlElementChipContainer.setAttributes([["data-item", chipTextTrimmed]]);
        htmlElementChipContainer.appendChild(this.createHtmlElementChipTextContainer([["textContent", chipTextTrimmed]]));
        htmlElementChipContainer.appendChild(this.createHtmlElementChipRemoveButton());
        return htmlElementChipContainer;
    };

    createHtmlElementChipInput = (placeholderValue = "") => {
        const htmlElementChipInput = window.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`<input data-id="chip-input" class="chip-input" style="flex: 1 1 auto; padding: 8px 8px 8px 0px; border: none; outline: none;" name="chip-input" type="text" />`);
        htmlElementChipInput.setEventStuffs([
            ({ handlerRefName: "refEventHandlerKeyDown", eventType: "keydown", eventHandler: this.handleEventKeyDownChipInput }),
            ({ handlerRefName: "refEventHandlerBlur", eventType: "blur", eventHandler: this.handleEventBlurChipInput }),
        ]);
        htmlElementChipInput.setAttributes([["placeholder", placeholderValue]]);
        return htmlElementChipInput;
    };

    createHtmlElementChipUpdateInput = (chipTextTrimmed = "") => {
        const htmlElementChipUpdateInput = window.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`<input data-id="chip-update-input" class="chip-input" style="flex: 1 1 auto; padding: 8px; border: 1px solid var(--light-border-color); outline: none;" name="chip-update-input" type="text" />`);
        htmlElementChipUpdateInput.setEventStuffs([
            ({ handlerRefName: "refEventHandlerKeyDown", eventType: "keydown", eventHandler: this.handleEventKeyDownChipUpdateInput }),
            ({ handlerRefName: "refEventHandlerBlur", eventType: "blur", eventHandler: this.handleEventBlurChipUpdateInput }),
        ]);
        htmlElementChipUpdateInput.setAttributes([["placeholder", chipTextTrimmed], ["data-item", chipTextTrimmed]]);
        return htmlElementChipUpdateInput;
    };

    createHtmlElementChipInputContainer = async (itemList) => {
        const htmlElementChipInputContainer = window.UtilsWeb.htmlTemplateStringToHtmlElement(/*html*/`
            <div data-id="chip-input-container" style="cursor: text; display: flex; gap: 8px; padding: 8px; flex-wrap: wrap; flex: 1; overflow-x: auto; border: 1px solid var(--light-border-color);">
            </div>`
        );
        htmlElementChipInputContainer.setEventStuffs([
            ({ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: this.handleElementClickChipInputContainer }),
        ]);
        htmlElementChipInputContainer.setAttributes([["data-items", JSON.stringify(itemList)]]);
        if (itemList.length) {
            itemList.forEach((chipText) => {
                htmlElementChipInputContainer.appendChild(this.createHtmlElementChip(chipText));
            });
        }
        const dataFromLocalStorage = await (this.localDatabase.getItem(collectionOrStoreKey));
        const isNeedPlaceholder = ((dataFromLocalStorage === null) || ((dataFromLocalStorage?.length === 1) && !dataFromLocalStorage?.[0]?.items?.length));
        htmlElementChipInputContainer.appendChild(this.createHtmlElementChipInput(isNeedPlaceholder ? this.chipInputPlaceholder : ""));
        return htmlElementChipInputContainer;
    };

    manageChipInputValue = async (event) => {
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
        const chipInputValueAsListNoDuplicate = window.WillyHorizont.Utils.removeDuplicateListItem(chipInputValueAsListMergedWithDataset);

        htmlElementChipInputContainer.setAttribute("data-items", JSON.stringify(chipInputValueAsListNoDuplicate));

        htmlElementChipInputContainer.innerHTML = "";

        chipInputValueAsListNoDuplicate.forEach((chipText) => {
            htmlElementChipInputContainer.appendChild(this.createHtmlElementChip(chipText));
        });

        htmlElementChipInput.value = "";
        htmlElementChipInput.removeEventListener("keydown", htmlElementChipInput.refEventHandlerKeyDown);
        htmlElementChipInput.removeEventListener("blur", htmlElementChipInput.refEventHandlerBlur);
        htmlElementChipInput.remove();

        const htmlElementChipInputNew = this.createHtmlElementChipInput();

        htmlElementChipInputContainer.appendChild(htmlElementChipInputNew);

        await (this.syncLocalStorageDataImportExportTextAreaContentWithMainContent());

        return htmlElementChipInputNew;
    };

    manageChipUpdateInputValue = async (event) => {
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
            htmlElementChipInputContainer.appendChild(this.createHtmlElementChip(chipText));
        });

        htmlElementChipUpdateInput.value = "";
        htmlElementChipUpdateInput.removeEventListener("keydown", htmlElementChipUpdateInput.refEventHandlerKeyDown);
        htmlElementChipUpdateInput.removeEventListener("blur", htmlElementChipUpdateInput.refEventHandlerBlur);
        htmlElementChipUpdateInput.remove();

        const htmlElementChipInputNew = this.createHtmlElementChipInput();

        htmlElementChipInputContainer.appendChild(htmlElementChipInputNew);

        await (this.syncLocalStorageDataImportExportTextAreaContentWithMainContent());

        return htmlElementChipInputNew;
    };

    handleEventKeyDownChipInput = async (event) => {
        if ((event.key === "Enter") || (event.keyCode === 13)) {
            if (event.target.value.trim() === "") {
                event.preventDefault();
                event.target.blur();
                return;
            }
            const htmlElementChipInputNew = await (this.manageChipInputValue(event));
            htmlElementChipInputNew.setAttribute("placeholder", this.chipInputPlaceholder);
            htmlElementChipInputNew.focus();
            event.preventDefault();
            event.target.blur();
            return;
        }
    };

    handleEventBlurChipInput = async (event) => {
        if (event.target.value.trim() === "") {
            event.target.setAttribute("placeholder", "");
            event.preventDefault();
            return;
        }
        const htmlElementChipInputNew = await (this.manageChipInputValue(event));
        htmlElementChipInputNew.setAttribute("placeholder", "");
        event.preventDefault();
    };

    handleEventKeyDownChipUpdateInput = async (event) => {
        if ((event.key === "Enter") || (event.keyCode === 13)) {
            if (event.target.value.trim() === "") {
                event.preventDefault();
                return;
            }

            await (this.manageChipUpdateInputValue(event));
            event.preventDefault();
            return;
        }
    };

    handleEventBlurChipUpdateInput = async (event) => {
        const htmlElementChipInputContainer = event.target.parentElement;
        if (event.target.value.trim() === "") {
            event.target.setAttribute("placeholder", event.target.getAttribute("data-item"));
            event.target.value = (event.target.getAttribute("data-item") || "");
            event.target.focus();
            htmlElementChipInputContainer.addEventListener("click", htmlElementChipInputContainer.refElementHandlerClick);
            event.preventDefault();
            return;
        }
        const htmlElementChipInputNew = await (this.manageChipUpdateInputValue(event));
        htmlElementChipInputNew.setAttribute("placeholder", "");
        htmlElementChipInputContainer.addEventListener("click", htmlElementChipInputContainer.refElementHandlerClick);
        event.preventDefault();
    };

    handleElementClickChipText = (htmlElementChipText) => {
        return ((event) => {
            htmlElementChipText.removeEventListener("click", htmlElementChipText.refElementHandlerClick);
            const htmlElementChipInputContainer = htmlElementChipText.parentElement.parentElement;
            htmlElementChipInputContainer.removeEventListener("click", htmlElementChipInputContainer.refElementHandlerClick);
            const htmlElementChipUpdateInput = this.createHtmlElementChipUpdateInput(htmlElementChipText.parentElement.getAttribute("data-item"));
            htmlElementChipUpdateInput.setAttribute("placeholder", this.chipInputPlaceholder);
            htmlElementChipUpdateInput.value = (event.target.parentElement.getAttribute("data-item") || "");
            htmlElementChipText.parentElement.replaceWith(htmlElementChipUpdateInput);
            htmlElementChipUpdateInput.focus();
            htmlElementChipInputContainer.scrollLeft = 0;
        });
    };

    handleElementClickChipInputContainer = (htmlElementChipInputContainer) => {
        return ((event) => {
            const htmlElementChipInput = htmlElementChipInputContainer.querySelector('[data-id="chip-input"]');
            htmlElementChipInput.setAttribute("placeholder", this.chipInputPlaceholder);
            htmlElementChipInput.value = (event.target.parentElement.getAttribute("data-item") || "");
            htmlElementChipInput.focus();
        });
    };

    handleElementClickChipRemoveButton = (htmlElementChipRemoveButton) => {
        return (async (event) => {
            const htmlElementChipInputContainer = htmlElementChipRemoveButton.parentElement.parentElement;
            const htmlElementChipContainer = htmlElementChipRemoveButton.parentElement;
            htmlElementChipInputContainer.setAttribute("data-items", JSON.stringify(JSON.parse(htmlElementChipInputContainer.getAttribute("data-items") || []).filter((chipText) => (chipText !== htmlElementChipContainer.getAttribute("data-item")))));
            htmlElementChipRemoveButton.removeEventListener("click", htmlElementChipRemoveButton.refElementHandlerClick);
            htmlElementChipContainer.removeEventListener("click", htmlElementChipContainer.refElementHandlerClick);
            htmlElementChipContainer.setAttribute("data-item", "");
            htmlElementChipContainer.remove();
            htmlElementChipInputContainer.querySelector('[data-id="chip-input"]').setAttribute("placeholder", this.chipInputPlaceholder);
            await (this.syncLocalStorageDataImportExportTextAreaContentWithMainContent());
        })
    };
}

window.ComponentChipInput = ((!window.WillyHorizont.Utils || !window.UtilsWeb) ? undefined : ComponentChipInput);
