const printThenReturn = (anything, { title = "", wrapper = (anythingInner) => anythingInner } = {}) => [console.log(`${title ? `${title}: ` : ""}${wrapper(anything)}`), anything][1];
const AnyType = { "Null": "Null", "Undefined": "Undefined", "Boolean": "Boolean", "String": "String", "Numeric": "Numeric", "Object": "Object", "Array": "Array", "Function": "Function" };
const getIsNull = (anything) => ((Object.prototype.toString.call(anything) === "[object Null]") && (anything === null));
const getIsUndefined = (anything) => ((Object.prototype.toString.call(anything) === "[object Undefined]") && (anything === undefined));
const getIsBoolean = (anything) => ((Object.prototype.toString.call(anything) === "[object Boolean]") && ((anything === true) || (anything === false)));
const getIsString = (anything) => (Object.prototype.toString.call(anything) === "[object String]");
const getIsNumeric = (anything) => ((Object.prototype.toString.call(anything) === "[object Number]") && (Number.isNaN(anything) === false) && (Number.isFinite(anything) === true));
const getIsObject = (anything) => (Object.prototype.toString.call(anything) === "[object Object]");
const getIsArray = (anything) => ((Object.prototype.toString.call(anything) === "[object Array]") && (Array.getIsArray(anything) === true));
const getIsFunction = (anything) => (Object.prototype.toString.call(anything) === "[object Function]");
const getIsError = (anything) => (Object.prototype.toString.call(anything) === "[object Error]");
const getIsDate = (anything) => (Object.prototype.toString.call(anything) === "[object Date]");
const getType = (anything) => ((getIsUndefined(anything) === true) ? AnyType["Undefined"] : ((getIsNull(anything) === true) ? AnyType["Null"] : ((getIsBoolean(anything) === true) ? AnyType["Boolean"] : ((getIsString(anything) === true) ? AnyType["String"] : ((getIsNumeric(anything) === true) ? AnyType["Numeric"] : ((getIsObject(anything) === true) ? AnyType["Object"] : ((getIsArray(anything) === true) ? AnyType["Array"] : ((getIsFunction(anything) === true) ? AnyType["Function"] : Object.prototype.toString.call(anything)))))))));
const jsonStringify = (anything, { pretty = false, indent = " ".repeat(4), indentLevel = 0, argumentType = getType(anything), jsonStringifyInner = jsonStringify } = {}) => ((argumentType === AnyType["Undefined"]) ? "undefined" : (argumentType === AnyType["Null"]) ? "null" : ((argumentType === AnyType["String"]) ? `"${anything}"` : (((argumentType === AnyType["Numeric"]) || (argumentType === AnyType["Boolean"])) ? `${anything}` : ((argumentType === AnyType["Object"]) ? ((Object.keys(anything).length === 0) ? "{}" : (`${((pretty === true) ? (`{\n${indent.repeat(indentLevel + 1)}`) : "{ ")}${Object.entries(anything).reduce((currentResult, [objectKey, objectValue], objectEntryIndex) => (`${currentResult}${(((objectEntryIndex + 1) !== Object.keys(anything).length) ? `"${objectKey}": ${jsonStringifyInner(objectValue, { pretty, indentLevel: (indentLevel + 1) })}${((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ")}` : `"${objectKey}": ${jsonStringifyInner(objectValue, { pretty, indentLevel: (indentLevel + 1) })}`)}`), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}}`) : " }")}`)) : ((argumentType === AnyType["Array"]) ? ((anything.length === 0) ? "[]" : (`${((pretty === true) ? (`[\n${indent.repeat(indentLevel + 1)}`) : "[")}${anything.reduce((currentResult, arrayItem, arrayItemIndex) => ((((arrayItemIndex + 1) !== anything.length) ? `${currentResult}${jsonStringifyInner(arrayItem, { pretty, indentLevel: (indentLevel + 1) })}${((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ")}` : `${currentResult}${jsonStringifyInner(arrayItem, { pretty, indentLevel: (indentLevel + 1) })}`)), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}]`) : "]")}`)) : ((argumentType === AnyType["Function"]) ? anything.toString() : `${anything}`)))))); // custom JSON.jsonStringify() function jsonStringifyV4
const randomIntInclusive = (lowerBound, upperBound) => (Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound);
const rangeInclusive = (startNumber, stopNumber) => Array.from({ length: (Math.abs(stopNumber - startNumber) + 1) }, (_, i) => ((startNumber < stopNumber) ? (startNumber + i) : ((startNumber > stopNumber) ? (startNumber - i) : (startNumber || stopNumber))));
const removeDuplicateItems = (anyArray, callbackFunction = (anyArrayItem) => anyArrayItem) => anyArray.reduce(([uniqueKeyMap, uniqueArray], anyArrayItem) => ((newUniqueKeyString) => ((uniqueKeyMap.get(newUniqueKeyString) !== undefined) ? [uniqueKeyMap, uniqueArray] : [uniqueKeyMap.set(newUniqueKeyString, anyArrayItem), uniqueArray.push(anyArrayItem), [uniqueKeyMap, uniqueArray]][2]))(callbackFunction(anyArrayItem)), [new Map(), []])[1]; // removeDuplicateItemsV2

const stringToRgbHexColor = (theString) => {
    let theHash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; (i < theString.length); i += 1) {
        theHash = theString.charCodeAt(i) + ((theHash << 5) - theHash);
    }

    let rgbHexColor = "#";

    for (i = 0; i < 3; i += 1) {
        rgbHexColor += `00${((theHash >> (i * 8)) & 0xff).toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return rgbHexColor;
};
