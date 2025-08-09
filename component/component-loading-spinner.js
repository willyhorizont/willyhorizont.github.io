document.getElementById("loading-spinner").innerHTML = (/*html*/
`                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 80vh;">
                        <div style="border: 4px solid var(--light-border-color); border-top: 4px solid var(--dark-border-color); border-radius: 50%; width: 40px; height: 40px; animation: loading-spinner 1s linear infinite; margin: 0 auto;"></div>
                        <p style="font-size: 2em; text-align: center;">Loading...</p>
                    </div>`);

function toggleLoadingSpinner(isLoading, arrayOfHtmlElement) {
    const htmlElementLoadingSpinner = document.getElementById("loading-spinner");

    if (isLoading === true) {
        htmlElementLoadingSpinner.style.display = "block";
        arrayOfHtmlElement.forEach((htmlElement) => {
            htmlElement.style.display = "none";
        });
        return;
    }
    htmlElementLoadingSpinner.style.display = "none";
    arrayOfHtmlElement.forEach((htmlElement) => {
        htmlElement.style.display = htmlElement.dataset["display"];
    });
}

const componentLoadingSpinner = {
    toggleLoadingSpinner,
};
