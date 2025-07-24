function createComponentImportExport({ localStorageKey, rerenderMainContent, getDataFromMainContent}) {
    function handleEventBlurImportExportTextArea(event) {
        document.getElementById("import-export-error-message-container").innerHTML = "";
        if (event.target.value.trim() === "") {
            event.preventDefault();
            return;
        }

        try {
            const htmlElementImportExportTextareaValueJsonParsed = JSON.parse(event.target.value);
            localStorage.setItem(localStorageKey, JSON.stringify(htmlElementImportExportTextareaValueJsonParsed));
            rerenderMainContent(htmlElementImportExportTextareaValueJsonParsed);
        } catch (anyError) {
            document.getElementById("import-export-error-message-container").innerHTML = (/*html*/`<p style="color: red;">Format export-an yang di-import tidak sesuai.</p>`);
        }

        event.preventDefault();
    }

    function updateImportExportTextAreaContentFromLocalStorage(dataFromImportExportTextAreaContent) {
        document.getElementById("import-export-textarea").value = ((dataFromImportExportTextAreaContent === null) ? "" : JSON.stringify(dataFromImportExportTextAreaContent));
    }

    function syncLocalStorageDataImportExportTextAreaContentWithMainContent() {
        const dataFromMainContent = getDataFromMainContent();
        localStorage.setItem(localStorageKey, JSON.stringify(dataFromMainContent));
        updateImportExportTextAreaContentFromLocalStorage(dataFromMainContent);
        document.getElementById("import-export-error-message-container").innerHTML = "";
    }

    function syncImportExportTextAreaContentMainContentWithLocalStorageData() {
        const dataFromLocalStorageData = JSON.parse(localStorage.getItem(localStorageKey));
        if (dataFromLocalStorageData === null) return;
        updateImportExportTextAreaContentFromLocalStorage(dataFromLocalStorageData);
        rerenderMainContent(dataFromLocalStorageData);
    }

    document.getElementById("import-export").innerHTML = (/*html*/
`<div id="import-export-container" style="padding: 4px; width: 100%; display: flex; flex-direction: column;">
    <h2 style="margin-top: 8px;">Import & Export:</h2>
    <textarea id="import-export-textarea" rows="4" cols="50" style="background-color: #000; color: #ccc; margin-top: 16px;"></textarea>
    <div id="import-export-error-message-container" style="margin-top: 8px;"></div>
</div>`);

    document.getElementById("import-export-textarea").addEventListener("blur", handleEventBlurImportExportTextArea);

    return { syncLocalStorageDataImportExportTextAreaContentWithMainContent, syncImportExportTextAreaContentMainContentWithLocalStorageData };
}

const componentImportExport = {
    createComponentImportExport,
};
