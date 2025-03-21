export const jsType = { "Null": "Null", "Boolean": "Boolean", "String": "String", "Numeric": "Numeric", "Object": "Object", "Array": "Array", "Function": "Function" };

export const isNull = (anything) => (((Object.prototype.toString.call(anything) === "[object Null]") && (anything === null)) || ((Object.prototype.toString.call(anything) === "[object Undefined]") && (anything === undefined)));

export const isBoolean = (anything) => ((Object.prototype.toString.call(anything) === "[object Boolean]") && ((anything === true) || (anything === false)));

export const isString = (anything) => (Object.prototype.toString.call(anything) === "[object String]");

export const isNumeric = (anything) => ((Object.prototype.toString.call(anything) === "[object Number]") && (Number.isNaN(anything) === false) && (Number.isFinite(anything) === true));

export const isObject = (anything) => (Object.prototype.toString.call(anything) === "[object Object]");

export const isArray = (anything) => ((Object.prototype.toString.call(anything) === "[object Array]") && (Array.isArray(anything) === true));

export const isFunction = (anything) => (Object.prototype.toString.call(anything) === "[object Function]");

export const getType = (anything) => ((isNull(anything) === true) ? jsType.Null : ((isBoolean(anything) === true) ? jsType.Boolean : ((isString(anything) === true) ? jsType.String : ((isNumeric(anything) === true) ? jsType.Numeric : ((isObject(anything) === true) ? jsType.Object : ((isArray(anything) === true) ? jsType.Array : ((isFunction(anything) === true) ? jsType.Function : Object.prototype.toString.call(anything))))))));

export const jsonStringify = (anything, { pretty = false, indent = " ".repeat(4), indentLevel = 0, argumentType = getType(anything) } = {}) => ((argumentType === jsType.Null) ? "null" : ((argumentType === jsType.String) ? `"${anything}"` : (((argumentType === jsType.Numeric) || (argumentType === jsType.Boolean)) ? `${anything}` : ((argumentType === jsType.Object) ? ((Object.keys(anything).length === 0) ? "{}" : (`${((pretty === true) ? (`{\n${indent.repeat(indentLevel + 1)}`) : "{ ")}${Object.entries(anything).reduce((currentResult, [objectKey, objectValue], objectEntryIndex) => (`${currentResult}${(((objectEntryIndex + 1) !== Object.keys(anything).length) ? `"${objectKey}": ${jsonStringify(objectValue, { pretty, indentLevel: (indentLevel + 1) })}${((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ")}` : `"${objectKey}": ${jsonStringify(objectValue, { pretty, indentLevel: (indentLevel + 1) })}`)}`), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}}`) : " }")}`)) : ((argumentType === jsType.Array) ? ((anything.length === 0) ? "[]" : (`${((pretty === true) ? (`[\n${indent.repeat(indentLevel + 1)}`) : "[")}${anything.reduce((currentResult, arrayItem, arrayItemIndex) => ((((arrayItemIndex + 1) !== anything.length) ? `${currentResult}${jsonStringify(arrayItem, { pretty, indentLevel: (indentLevel + 1) })}${((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ")}` : `${currentResult}${jsonStringify(arrayItem, { pretty, indentLevel: (indentLevel + 1) })}`)), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}]`) : "]")}`)) : ((argumentType === jsType.Function) ? "[object Function]" : argumentType)))))); // custom JSON.stringify() function jsonStringifyV4
