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
            const collectionOrStoreRequest = collectionOrStore.delete(collectionOrStoreKey);

            collectionOrStoreRequest.onsuccess = () => {
                resolve(true);
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
}

window.LocalDatabase = LocalDatabase;
