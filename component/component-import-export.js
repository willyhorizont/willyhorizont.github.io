class ComponentImportExport {
    constructor({ collectionOrStoreKey, rerenderMainContent, getDataFromMainContent }) {
        this.collectionOrStoreKey = collectionOrStoreKey;
        this.rerenderMainContent = rerenderMainContent;
        this.getDataFromMainContent = getDataFromMainContent;

        document.getElementById("placeholder-import-export").innerHTML = (/*html*/`
            <div id="import-export-container" style="padding: 4px; width: 100%; display: flex; flex-direction: column;">
                <h2 style="margin-top: 8px;">Import & Export:</h2>
                <textarea id="import-export-textarea" style="margin-top: 16px;" rows="4" cols="50"></textarea>
                <div id="placeholder-error" style="margin-top: 8px;"></div>
            </div>`);

        document.getElementById("import-export-textarea").addEventListener("blur", this.handleEventBlurImportExportTextArea);
    }

    handleEventBlurImportExportTextArea = async (event) => {
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
            await localDatabase.setItem(this.collectionOrStoreKey, dataFromImportExportTextAreaContent);
            this.updateImportExportTextAreaValue(dataFromImportExportTextAreaContent);
            await (this.rerenderMainContent(dataFromImportExportTextAreaContent));
        } catch (anyError) {
            document.getElementById("placeholder-error").innerHTML = (/*html*/`<p style="color: red;">Format export-an yang di-import tidak sesuai.</p>`);
        }

        event.preventDefault();
    };

    updateImportExportTextAreaValue = (importExportTextAreaNewValue) => {
        document.getElementById("import-export-textarea").value = ((importExportTextAreaNewValue === null) ? "" : JSON.stringify(importExportTextAreaNewValue));
    };

    syncLocalStorageDataImportExportTextAreaContentWithMainContent = async () => {
        const dataFromMainContent = this.getDataFromMainContent();
        await localDatabase.setItem(this.collectionOrStoreKey, dataFromMainContent);
        this.updateImportExportTextAreaValue(dataFromMainContent);
        document.getElementById("placeholder-error").innerHTML = "";
    };

    syncImportExportTextAreaContentMainContentWithLocalStorageData = async () => {
        const dataFromLocalStorage = await localDatabase.getItem(this.collectionOrStoreKey);
        if (dataFromLocalStorage === null) return;
        this.updateImportExportTextAreaValue(dataFromLocalStorage);
        await (this.rerenderMainContent(dataFromLocalStorage));
    };
}

window.ComponentImportExport = ComponentImportExport;
