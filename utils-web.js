const setHtmlElementPropertyValue = (htmlElement, arrayOfEntryProperty) => {
    arrayOfEntryProperty.forEach(([htmlElementProperty, htmlElementPropertyValue]) => {
        htmlElement[htmlElementProperty] = htmlElementPropertyValue;
    });
};
const htmlTemplateStringToHtmlElement = (htmlTemplateString) => (((htmlElementTemplate) => ([Object.assign(htmlElementTemplate, { innerHTML: htmlTemplateString }), htmlElementTemplate.content.firstElementChild].at(-1)))(document.createElement("template")));
const createHtmlElement = (htmlStringTemplate, { arrayOfEntryDataset, arrayOfEntryAttribute, arrayOfElementConfig, arrayOfEntryProperty } = {}) => (((htmlElement) => ([((arrayOfEntryDataset) ? (arrayOfEntryDataset.forEach(([datasetKeyInKebabCase, datasetValue]) => htmlElement.setAttribute(`data-${datasetKeyInKebabCase}`, String(datasetValue)))) : undefined), ((arrayOfElementConfig) ? (arrayOfElementConfig.forEach(({ handlerRefName, eventType, elementHandler, eventHandler }) => (((eventHandlerInner) => ([Object.assign(htmlElement, { [handlerRefName]: eventHandlerInner }), htmlElement.addEventListener(eventType, eventHandlerInner), undefined].at(-1)))(eventHandler || elementHandler(htmlElement))))) : undefined), ((arrayOfEntryAttribute) ? (arrayOfEntryAttribute.forEach(([htmlElementAttribute, htmlElementAttributeValue]) => htmlElement.setAttribute(htmlElementAttribute, String(htmlElementAttributeValue)))) : undefined), ((arrayOfEntryProperty) ? (setHtmlElementPropertyValue(htmlElement, arrayOfEntryProperty)) : undefined), htmlElement].at(-1)))(htmlTemplateStringToHtmlElement(htmlStringTemplate)));
const appendChildrenReturnParent = (htmlElementParent, ...htmlElementChildren) => ([(htmlElementChildren.forEach((htmlElementChild) => (htmlElementParent.appendChild(htmlElementChild)))), htmlElementParent].at(-1));
const utilsWeb = {
    setHtmlElementPropertyValue,
    htmlTemplateStringToHtmlElement,
    createHtmlElement,
    appendChildrenReturnParent,
};
