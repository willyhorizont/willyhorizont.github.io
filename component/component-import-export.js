/*
req:
    localStorageKey
    rerenderMainContent
    getDataFromMainContent
*/

function updateImportExportTextAreaValue(importExportTextAreaNewValue) {
    document.getElementById("import-export-textarea").value = ((importExportTextAreaNewValue === null) ? "" : JSON.stringify(importExportTextAreaNewValue));
}

function syncLocalStorageDataImportExportTextAreaContentWithMainContent() {
    const dataFromMainContent = getDataFromMainContent();
    localStorage.setItem(localStorageKey, JSON.stringify(dataFromMainContent));
    updateImportExportTextAreaValue(dataFromMainContent);
    document.getElementById("placeholder-error").innerHTML = "";
}

function syncImportExportTextAreaContentMainContentWithLocalStorageData() {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
    if (dataFromLocalStorage === null) return;
    updateImportExportTextAreaValue(dataFromLocalStorage);
    rerenderMainContent(dataFromLocalStorage);
}

document.getElementById("placeholder-import-export").innerHTML = (/*html*/
`                   <div id="import-export-container" style="padding: 4px; width: 100%; display: flex; flex-direction: column;">
                        <h2 style="margin-top: 8px;">Import & Export:</h2>
                        <textarea id="import-export-textarea" style="margin-top: 16px;" rows="4" cols="50"></textarea>
                        <div id="placeholder-error" style="margin-top: 8px;"></div>
                    </div>`);

function handleEventBlurImportExportTextArea(event) {
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
        localStorage.setItem(localStorageKey, JSON.stringify(dataFromImportExportTextAreaContent));
        updateImportExportTextAreaValue(dataFromImportExportTextAreaContent);
        rerenderMainContent(dataFromImportExportTextAreaContent);
    } catch (anyError) {
        document.getElementById("placeholder-error").innerHTML = (/*html*/`<p style="color: red;">Format export-an yang di-import tidak sesuai.</p>`);
    }

    event.preventDefault();
}

document.getElementById("import-export-textarea").addEventListener("blur", handleEventBlurImportExportTextArea);
