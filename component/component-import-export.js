/*
req:
    localStorageKey
    rerenderMainContent
    getDataFromMainContent
*/

function updateImportExportTextAreaContentFromLocalStorage(dataFromImportExportTextAreaContent) {
    document.getElementById("import-export-textarea").value = ((dataFromImportExportTextAreaContent === null) ? "" : JSON.stringify(dataFromImportExportTextAreaContent));
}

function syncLocalStorageDataImportExportTextAreaContentWithMainContent() {
    const dataFromMainContent = getDataFromMainContent();
    localStorage.setItem(localStorageKey, JSON.stringify(dataFromMainContent));
    updateImportExportTextAreaContentFromLocalStorage(dataFromMainContent);
    document.getElementById("placeholder-error").innerHTML = "";
}

function syncImportExportTextAreaContentMainContentWithLocalStorageData() {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem(localStorageKey));
    if (dataFromLocalStorage === null) return;
    updateImportExportTextAreaContentFromLocalStorage(dataFromLocalStorage);
    rerenderMainContent(dataFromLocalStorage);
}

document.getElementById("placeholder-import-export").innerHTML = (/*html*/
`                   <div id="import-export-container" style="padding: 4px; width: 100%; display: flex; flex-direction: column;">
                        <h2 style="margin-top: 8px;">Import & Export:</h2>
                        <textarea id="import-export-textarea" class="import-export-textarea" rows="4" cols="50"></textarea>
                        <div id="placeholder-error" style="margin-top: 8px;"></div>
                    </div>`);

function handleEventBlurImportExportTextArea(event) {
    document.getElementById("placeholder-error").innerHTML = "";
    if (event.target.value.trim() === "") {
        event.preventDefault();
        return;
    }

    try {
        const htmlElementImportExportTextareaValueJsonParsed = JSON.parse(event.target.value);
        localStorage.setItem(localStorageKey, JSON.stringify(htmlElementImportExportTextareaValueJsonParsed));
        rerenderMainContent(htmlElementImportExportTextareaValueJsonParsed);
    } catch (anyError) {
        document.getElementById("placeholder-error").innerHTML = (/*html*/`<p style="color: red;">Format export-an yang di-import tidak sesuai.</p>`);
    }

    event.preventDefault();
}

document.getElementById("import-export-textarea").addEventListener("blur", handleEventBlurImportExportTextArea);
