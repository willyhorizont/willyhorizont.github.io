/*
req:
    syncLocalStorageDataImportExportTextAreaContentWithMainContent
*/

function createHtmlElementChipTextContainer(arrayOfEntryProperty) {
    return utilsWeb.createHtmlElement((/*html*/`<span style="white-space: nowrap;"></span>`), { arrayOfEntryProperty });
}

function createHtmlElementChipRemoveButton() {
    return utilsWeb.appendChildrenReturnParent(utilsWeb.createHtmlElement(/*html*/`<div data-id="chip-remove-button-container" style="display: flex; align-items: center; justify-content: center; line-height: 1.2em; background-color: var(--accent-color-4); color: var(--dark-text-color); width: 1.6em; aspect-ratio: 1 / 1; border-radius: 50%;"></div>`),
        utilsWeb.createHtmlElement((/*html*/`<span data-id="chip-remove-button" style="cursor: pointer; font-weight: bold;">×</span>`), { arrayOfElementConfig: ([{ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: handleElementClickChipRemoveButton }]) }));
}

function createHtmlElementChip(chipTextTrimmed) {
    const htmlElementChipContainer = utilsWeb.createHtmlElement((/*html*/`<div data-id="chip-container" style="margin: 8px 4px; padding: 0.2em 0.4em; border-radius: 0.2em; display: flex; align-items: center; gap: 8px; flex: 0 0 auto; border: 1px solid var(--light-border-color); color: var(--light-text-color); background-color: #ffdddd;"></div>`), { arrayOfEntryDataset: [["item", chipTextTrimmed]] });
    htmlElementChipContainer.appendChild(createHtmlElementChipTextContainer([["textContent", chipTextTrimmed]]));
    htmlElementChipContainer.appendChild(createHtmlElementChipRemoveButton());
    return htmlElementChipContainer;
}

function createHtmlElementChipInput(placeholderValue = "") {
    return utilsWeb.createHtmlElement((/*html*/`<input data-id="chip-input" class="chip-input" style="flex: 1 1 auto; margin: 8px 4px 8px 4px; padding: 8px 4px; border: none; outline: none;" name="chip-input" type="text" />`), { arrayOfElementConfig: ([{ handlerRefName: "refEventHandlerKeyDown", eventType: "keydown", eventHandler: handleEventKeyDownChipInput }, { handlerRefName: "refEventHandlerBlur", eventType: "blur", eventHandler: handleEventBlurChipInput }]), arrayOfEntryAttribute: ([["placeholder", placeholderValue]]) });
}

function createHtmlElementChipInputContainer(itemList) {
    const htmlElementChipInputContainer = utilsWeb.createHtmlElement((/*html*/`<div data-id="chip-input-container" class="chip-remove-button-container" style="cursor: text; margin-left: 8px; display: flex; flex-wrap: wrap; flex: 1; padding: 0px 4px; overflow-x: auto; border: 1px solid var(--light-border-color);"></div>`), { arrayOfElementConfig: ([{ handlerRefName: "refElementHandlerClick", eventType: "click", elementHandler: handleElementClickChipInputContainer }]), arrayOfEntryDataset: [["items", JSON.stringify(itemList)]] });
    if (itemList.length) itemList.forEach((chipText) => (htmlElementChipInputContainer.appendChild(createHtmlElementChip(chipText))));
    htmlElementChipInputContainer.appendChild(createHtmlElementChipInput((!itemList.length) ? "item a 2, item b 1, item c 4, ..." : ""));
    return htmlElementChipInputContainer;
}

function handleEventKeyDownChipInput(event) {
    if (event.key === "Enter") {
        if (event.target.value.trim() === "") {
            event.preventDefault();
            return;
        }
        const htmlElementInputChipNew = manageChipInputValue(event);
        htmlElementInputChipNew.focus();
        event.preventDefault();
    }
}

function handleEventBlurChipInput(event) {
    if (event.target.value.trim() === "") {
        event.preventDefault();
        return;
    }
    const htmlElementInputChipNew = manageChipInputValue(event);
    htmlElementInputChipNew.focus();
    event.preventDefault();
}

function handleElementClickChipInputContainer(htmlElementChipInputContainer) {
    return function (event) {
        const htmlElementChipInput = htmlElementChipInputContainer.querySelector("input");
        htmlElementChipInput.focus();
    }
}

function handleElementClickChipRemoveButton(htmlElementChipRemoveButton) {
    return function(event) {
        const htmlElementChipInputContainer = htmlElementChipRemoveButton.parentElement.parentElement.parentElement;
        const htmlElementChipContainer = htmlElementChipRemoveButton.parentElement.parentElement;
        htmlElementChipInputContainer.dataset["items"] = JSON.stringify(JSON.parse(htmlElementChipInputContainer.dataset["items"]).filter((chipText) => (chipText !== htmlElementChipContainer.dataset["item"])));
        htmlElementChipRemoveButton.removeEventListener("click", htmlElementChipRemoveButton.refElementHandlerClick);
        htmlElementChipContainer.remove();
        syncLocalStorageDataImportExportTextAreaContentWithMainContent();
    }
}

function manageChipInputValue(event) {
    const htmlElementChipInput = event.target;
    const htmlElementChipInputContainer = htmlElementChipInput.parentElement;
    const chipInputValueAsList = htmlElementChipInput.value.split(",").filter((chipText) => (chipText.trim() !== ""));
    const chipInputValueAsListMergedWithDataset = ((htmlElementChipInputContainer.dataset["items"] === "") ? chipInputValueAsList : ((() => {
        const datasetItemsJsonParsed = JSON.parse(htmlElementChipInputContainer.dataset["items"]);
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

const componentChipInput = {
    createHtmlElementChipInputContainer,
};
