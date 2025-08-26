/*
req:
    chipInputPlaceholder
    syncLocalStorageDataImportExportTextAreaContentWithMainContent
*/

function createHtmlElementChipTextContainer(arrayOfEntryProperty) {
    return utilsWeb.createHtmlElement((/*html*/`<span data-id="chip-text" style="white-space: nowrap;"></span>`), { arrayOfEntryProperty, arrayOfElementConfig: ([{ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: handleElementClickChipText }]) });
}

function createHtmlElementChipRemoveButton() {
    return utilsWeb.appendChildrenReturnParent(utilsWeb.createHtmlElement((/*html*/`<div data-id="chip-remove-button-container" style="display: flex; align-items: center; justify-content: center; line-height: 1.2em; background-color: var(--accent-color-4); color: var(--dark-text-color); width: 1.6em; aspect-ratio: 1 / 1; border-radius: 50%;"></div>`), { arrayOfElementConfig: ([{ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: handleElementClickChipRemoveButtonContainer }]) }),
        utilsWeb.createHtmlElement((/*html*/`<span data-id="chip-remove-button" style="cursor: pointer; font-weight: bold;">×</span>`)));
}

function createHtmlElementChip(chipTextTrimmed) {
    const htmlElementChipContainer = utilsWeb.createHtmlElement((/*html*/`<div data-id="chip-container" style="cursor: pointer; padding: 4px 6px; border-radius: 0.2em; display: flex; align-items: center; gap: 8px; flex: 0 0 auto; border: 1px solid var(--light-border-color); color: var(--light-text-color); background-color: #ffdddd;"></div>`), { arrayOfEntryDataset: [["item", chipTextTrimmed]] });
    htmlElementChipContainer.appendChild(createHtmlElementChipTextContainer([["textContent", chipTextTrimmed]]));
    htmlElementChipContainer.appendChild(createHtmlElementChipRemoveButton());
    return htmlElementChipContainer;
}

function createHtmlElementChipInput(placeholderValue = "") {
    return utilsWeb.createHtmlElement((/*html*/`<input data-id="chip-input" class="chip-input" style="flex: 1 1 auto; border: none; outline: none;" name="chip-input" type="text" />`), { arrayOfElementConfig: ([{ handlerRefName: "refEventHandlerKeyDown", eventType: "keydown", eventHandler: handleEventKeyDownChipInput }, { handlerRefName: "refEventHandlerBlur", eventType: "blur", eventHandler: handleEventBlurChipInput }]), arrayOfEntryAttribute: ([["placeholder", placeholderValue]]) });
}

function createHtmlElementChipUpdateInput(chipTextTrimmed = "") {
    return utilsWeb.createHtmlElement((/*html*/`<input data-id="chip-update-input" class="chip-input" style="flex: 1 1 auto; margin: 8px 4px 8px 4px; padding: 8px 4px; border: none; outline: none;" name="chip-update-input" type="text" />`), { arrayOfElementConfig: ([{ handlerRefName: "refEventHandlerKeyDown", eventType: "keydown", eventHandler: handleEventKeyDownChipUpdateInput }, { handlerRefName: "refEventHandlerBlur", eventType: "blur", eventHandler: handleEventBlurChipUpdateInput }]), arrayOfEntryAttribute: ([["placeholder", chipTextTrimmed]]), arrayOfEntryDataset: [["item", chipTextTrimmed]] });
}

function createHtmlElementChipInputContainer(itemList) {
    const htmlElementChipInputContainer = utilsWeb.createHtmlElement((/*html*/`<div data-id="chip-input-container" style="cursor: text; display: flex; gap: 8px; padding: 8px; flex-wrap: wrap; flex: 1; overflow-x: auto; border: 1px solid var(--light-border-color);"></div>`), { arrayOfElementConfig: ([{ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: handleElementClickChipInputContainer }]), arrayOfEntryDataset: [["items", JSON.stringify(itemList)]] });
    if (itemList.length) itemList.forEach((chipText) => (htmlElementChipInputContainer.appendChild(createHtmlElementChip(chipText))));
    const dataFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
    const isNeedPlaceholder = ((dataFromLocalStorage === null) || ((dataFromLocalStorage?.length === 1) && !dataFromLocalStorage?.[0]?.items?.length));
    htmlElementChipInputContainer.appendChild(createHtmlElementChipInput(isNeedPlaceholder ? chipInputPlaceholder : ""));
    return htmlElementChipInputContainer;
}

function handleEventKeyDownChipInput(event) {
    if (event.key === "Enter") {
        if (event.target.value.trim() === "") {
            event.preventDefault();
            return;
        }
        const htmlElementInputChipNew = manageChipInputValue(event);
        htmlElementInputChipNew.setAttribute("placeholder", chipInputPlaceholder);
        htmlElementInputChipNew.focus();
        event.preventDefault();
    }
}

function handleEventBlurChipInput(event) {
    if (event.target.value.trim() === "") {
        event.target.setAttribute("placeholder", "");
        event.preventDefault();
        return;
    }
    const htmlElementInputChipNew = manageChipInputValue(event);
    htmlElementInputChipNew.setAttribute("placeholder", "");
    event.preventDefault();
}

function handleEventKeyDownChipUpdateInput(event) {
    if (event.key === "Enter") {
        if (event.target.value.trim() === "") {
            event.preventDefault();
            return;
        }

        manageChipUpdateInputValue(event);
        event.preventDefault();
    }
}

function handleEventBlurChipUpdateInput(event) {
    const htmlElementChipInputContainer = event.target.parentElement;
    if (event.target.value.trim() === "") {
        event.target.setAttribute("placeholder", event.target.dataset?.["item"]);
        event.target.value = (event.target.dataset?.["item"] || "");
        event.target.focus();
        htmlElementChipInputContainer.addEventListener("click", htmlElementChipInputContainer.refElementHandlerClick);
        event.preventDefault();
        return;
    }
    const htmlElementInputChipNew = manageChipUpdateInputValue(event);
    htmlElementInputChipNew.setAttribute("placeholder", "");
    htmlElementChipInputContainer.addEventListener("click", htmlElementChipInputContainer.refElementHandlerClick);
    event.preventDefault();
}

function handleElementClickChipText(htmlElementChipText) {
    return function (event) {
        const htmlElementChipInputContainer = htmlElementChipText.parentElement.parentElement;
        htmlElementChipInputContainer.removeEventListener("click", htmlElementChipInputContainer.refElementHandlerClick);
        const htmlElementChipUpdateInput = createHtmlElementChipUpdateInput(htmlElementChipText.parentElement.dataset?.["item"]);
        htmlElementChipText.parentElement.replaceWith(htmlElementChipUpdateInput);
        htmlElementChipUpdateInput.setAttribute("placeholder", chipInputPlaceholder);
        htmlElementChipUpdateInput.value = (event.target.parentElement.dataset?.["item"] || "");
        htmlElementChipUpdateInput.focus();
    }
}

function handleElementClickChipInputContainer(htmlElementChipInputContainer) {
    return function (event) {
        const htmlElementChipInput = htmlElementChipInputContainer.querySelector('[data-id="chip-input"]');
        htmlElementChipInput.setAttribute("placeholder", chipInputPlaceholder);
        htmlElementChipInput.value = (event.target.parentElement.dataset?.["item"] || "");
        htmlElementChipInput.focus();
    }
}

function handleElementClickChipRemoveButton(htmlElementChipRemoveButton) {
    return function(event) {
        const htmlElementChipInputContainer = htmlElementChipRemoveButton.parentElement.parentElement.parentElement;
        const htmlElementChipContainer = htmlElementChipRemoveButton.parentElement.parentElement;
        htmlElementChipInputContainer.dataset["items"] = JSON.stringify(JSON.parse(htmlElementChipInputContainer.dataset?.["items"] || []).filter((chipText) => (chipText !== htmlElementChipContainer.dataset?.["item"])));
        htmlElementChipRemoveButton.removeEventListener("click", htmlElementChipRemoveButton.refElementHandlerClick);
        htmlElementChipContainer.removeEventListener("click", htmlElementChipContainer.refElementHandlerClick);
        htmlElementChipContainer.remove();
        htmlElementChipInputContainer.querySelector('[data-id="chip-input"]').setAttribute("placeholder", chipInputPlaceholder);
        syncLocalStorageDataImportExportTextAreaContentWithMainContent();
    }
}

function handleElementClickChipRemoveButtonContainer(htmlElementChipRemoveButtonContainer) {
    return function(event) {
        const htmlElementChipInputContainer = htmlElementChipRemoveButtonContainer.parentElement.parentElement;
        const htmlElementChipContainer = htmlElementChipRemoveButtonContainer.parentElement;
        htmlElementChipInputContainer.dataset["items"] = JSON.stringify(JSON.parse(htmlElementChipInputContainer.dataset?.["items"] || []).filter((chipText) => (chipText !== htmlElementChipContainer.dataset?.["item"])));
        htmlElementChipRemoveButtonContainer.removeEventListener("click", htmlElementChipRemoveButtonContainer.refElementHandlerClick);
        htmlElementChipContainer.removeEventListener("click", htmlElementChipContainer.refElementHandlerClick);
        htmlElementChipContainer.remove();
        htmlElementChipInputContainer.querySelector('[data-id="chip-input"]').setAttribute("placeholder", chipInputPlaceholder);
        syncLocalStorageDataImportExportTextAreaContentWithMainContent();
    }
}

function manageChipInputValue(event) {
    const htmlElementChipInput = event.target;
    const htmlElementChipInputContainer = htmlElementChipInput.parentElement;
    const chipInputValueAsList = htmlElementChipInput.value.split(",").filter((chipText) => (chipText.trim() !== ""));
    const chipInputValueAsListMergedWithDataset = ((htmlElementChipInputContainer.dataset?.["items"] === "") ? chipInputValueAsList : ((() => {
        const datasetItemsJsonParsed = JSON.parse(htmlElementChipInputContainer.dataset?.["items"] || []);
        chipInputValueAsList.forEach((chipText) => {
            datasetItemsJsonParsed.push(chipText);
        })
        return datasetItemsJsonParsed;
    })()));
    const chipInputValueAsListNoDuplicate = utils.removeDuplicateListItem(chipInputValueAsListMergedWithDataset);

    htmlElementChipInputContainer.dataset["items"] = JSON.stringify(chipInputValueAsListNoDuplicate);

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

    syncLocalStorageDataImportExportTextAreaContentWithMainContent();

    return htmlElementChipInputNew;
}

function manageChipUpdateInputValue(event) {
    const htmlElementChipUpdateInputIndex = Array.from(event.target.parentElement.children).indexOf(event.target);
    const htmlElementChipUpdateInput = event.target;
    const htmlElementChipInputContainer = htmlElementChipUpdateInput.parentElement;
    const datasetItemsNewValue = JSON.parse(htmlElementChipInputContainer.dataset?.["items"] || []).filter((chipTextInsideDataset, chipTextInsideDatasetIndex) => ((htmlElementChipUpdateInput.value.includes(chipTextInsideDataset) === false) && (chipTextInsideDatasetIndex !== htmlElementChipUpdateInputIndex)));
    const chipUpdateInputValueAsList = htmlElementChipUpdateInput.value.split(",").filter((chipText) => (chipText.trim() !== ""));
    chipUpdateInputValueAsList.forEach((chipText, chipTextIndex) => {
        datasetItemsNewValue.splice((htmlElementChipUpdateInputIndex + chipTextIndex), 0, chipText);
    })

    htmlElementChipInputContainer.dataset["items"] = JSON.stringify(datasetItemsNewValue);

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

    syncLocalStorageDataImportExportTextAreaContentWithMainContent();

    return htmlElementChipInputNew;
}

const componentChipInput = {
    createHtmlElementChipInputContainer,
};
