(function (root, factory) {
    if ((typeof module === "object") && module.exports) {
        // Node.js
        module.exports = factory(root);
    } else {
        // Browser
        root.WillyHorizont = (root.WillyHorizont || {});
        root.WillyHorizont.Utils = factory(root);
    }
})(((typeof globalThis !== "undefined") ? globalThis : this), function (root) {
    const regexPattern = {
        "three_digit_grouping": (/\B(?=(\d{3})+(?!\d))/g),
    };
    const getNumberDifferenceInNumeric = (a, b) => ((a === b) ? 0 : ((a > b) ? (a - b) : (b - a)));
    const getMostFrequent = (anyArray, callbackFunction = (anyArrayItem) => (anyArrayItem)) => {
        const frequencyMap = new Map();
        let maxCount = 0;
        let mostFrequentResult = null;
        for (const anyArrayItem of anyArray) {
            const currentCount = ((frequencyMap.get(callbackFunction(anyArrayItem)) || 0) + 1);
            frequencyMap.set(callbackFunction(anyArrayItem), currentCount);
            if (currentCount > maxCount) {
                maxCount = currentCount;
                mostFrequentResult = callbackFunction(anyArrayItem);
            }
        }
        return mostFrequentResult;
    };
    const pickArrayItemRandomly = (anyArray) => (anyArray.at(WillyHorizont.Utils.randomIntInclusive(0, (anyArray.length - 1))));
    const parseEscapeSequence = (anyString) => JSON.parse(`"${anyString}"`);
    const pythonLikeSleep = (anySeconds) => new Promise((anyResolveFunction) => setTimeout(anyResolveFunction, (anySeconds * 1 * (({ secondInMiliseconds }) => secondInMiliseconds)({ secondInMiliseconds: 1_000 }))));
    const runOnce = ((keySet) => (anyStringKey = "something", callbackFunction = (() => (undefined))) => (keySet.has(anyStringKey) ? undefined : ([(keySet.add(anyStringKey)), (callbackFunction())].at(-1))))(new Set()); /* runOnceV2 */
    const runNthTime = ((keyCountMap) => (({ keyString = "something", runTime = 1 } = {}, callbackFunction = ((totalRunTime, currentRunTime) => (undefined))) => (((keyCountMap.get(keyString) ?? 0) >= runTime) ? undefined : ([(keyCountMap.set(keyString, ((keyCountMap.get(keyString) ?? 0) + 1))), (callbackFunction(runTime, keyCountMap.get(keyString)))].at(-1)))))(new Map()); /* runNthTimeV2 */
    const printOnce = ((keySet) => (anything, { key, title, formatter = ((anythingInner) => anythingInner) } = {}) => (((anyStringKey) => (keySet.has(anyStringKey) ? anything : ([(keySet.add(anyStringKey)), (console.log(`${title ? `${title}: ` : ""}${formatter(anything)}`)), anything].at(-1))))(key || title || "first")))(new Set()); /* printOnceV2 */
    const printAndReturn = (anything, { title, formatter = ((anythingInner) => anythingInner) } = {}) => ([(console.log(`${title ? `${title}: ` : ""}${formatter(anything)}`)), anything].at(-1));
    const generateTimestamp = ({ precise = true } = {}) => ((({ fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, twelveHourClockLatinAbbreviation, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit }) => (WillyHorizont.UtilsDate.prettyFormatDate({ includeSecond: precise, includeMiliSecond: precise, fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, twelveHourClockLatinAbbreviation, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit })))(WillyHorizont.UtilsDate.extractDate(new Date().toISOString()))); /* generateTimestampV2 */
    const AnyType = { "Null": "Null", "Undefined": "Undefined", "Boolean": "Boolean", "String": "String", "Numeric": "Numeric", "Object": "Object", "Array": "Array", "Function": "Function", "Error": "Error", "Date": "Date" };
    const checkIsNull = (anything) => ((Object.prototype.toString.call(anything) === "[object Null]") && (anything === null));
    const checkIsUndefined = (anything) => ((Object.prototype.toString.call(anything) === "[object Undefined]") && (anything === undefined));
    const checkIsBoolean = (anything) => ((Object.prototype.toString.call(anything) === "[object Boolean]") && ((anything === true) || (anything === false)));
    const checkIsString = (anything) => (Object.prototype.toString.call(anything) === "[object String]");
    const checkIsNumeric = (anything) => ((Object.prototype.toString.call(anything) === "[object Number]") && (Number.isNaN(anything) === false) && (Number.isFinite(anything) === true));
    const checkIsObject = (anything) => (Object.prototype.toString.call(anything) === "[object Object]");
    const checkIsArray = (anything) => ((Object.prototype.toString.call(anything) === "[object Array]") && (Array.isArray(anything) === true));
    const checkIsFunction = (anything) => (Object.prototype.toString.call(anything) === "[object Function]");
    const checkIsError = (anything) => (Object.prototype.toString.call(anything) === "[object Error]");
    const checkIsStringIso8601 = (anything) => ((checkIsString(anything) === false) ? false : ((/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(anything) === false) ? false : ((dateParsedFromString) => ((checkIsNumeric(dateParsedFromString.getTime()) === false) ? false : (dateParsedFromString.toISOString().replace(/\.000Z$/, "Z") === anything)))(new Date(anything))));
    const checkIsDate = (anything) => (Object.prototype.toString.call(anything) === "[object Date]");
    const getType = (anything) => ((checkIsUndefined(anything) === true) ? AnyType["Undefined"] : ((checkIsNull(anything) === true) ? AnyType["Null"] : ((checkIsBoolean(anything) === true) ? AnyType["Boolean"] : ((checkIsString(anything) === true) ? AnyType["String"] : ((checkIsNumeric(anything) === true) ? AnyType["Numeric"] : ((checkIsObject(anything) === true) ? AnyType["Object"] : ((checkIsArray(anything) === true) ? AnyType["Array"] : ((checkIsFunction(anything) === true) ? AnyType["Function"] : ((checkIsDate(anything) === true) ? AnyType["Date"] : ((checkIsError(anything) === true) ? AnyType["Error"] : Object.prototype.toString.call(anything)))))))))));
    const pipe = (...restArguments) => {
        const pipeLastResultMap = new Map();
        const pipeResult = restArguments.reduce((currentResult, currentArgument) => {
            pipeLastResultMap.set("result", currentResult);
            if (getType(currentResult) === AnyType["Undefined"]) return currentArgument;
            if (getType(currentArgument) === AnyType["Function"]) return currentArgument?.(currentResult);
            return undefined;
        }, undefined);
        if (getType(pipeResult) === AnyType["Function"]) return pipeResult?.(pipeLastResultMap.get("result"));
        return pipeResult;
    };
    const jsonStringify = (anything, { pretty = false } = {}) => ((temporaryMap) => ([(temporaryMap.set("f", ((anythingInner, { indent = " ".repeat(4), indentLevel = 0, argumentType = getType(anythingInner) } = {}) => ((checkIsStringIso8601(anythingInner) === true) ? (temporaryMap.get("f")({ "pretty": generateTimestamp(anythingInner), "ISO8601": anythingInner }, { indentLevel })) : ((argumentType === AnyType["Undefined"]) ? ('"undefined"') : ((argumentType === AnyType["Null"]) ? ("null") : ((argumentType === AnyType["Error"]) ? (`"${anythingInner.toString()}"`) : ((argumentType === AnyType["Date"]) ? (temporaryMap.get("f")({ "pretty": generateTimestamp(anythingInner), "ISO8601": anythingInner.toISOString() }, { indentLevel })) : ((argumentType === AnyType["String"]) ? (`"${anythingInner}"`) : (((argumentType === AnyType["Numeric"]) || (argumentType === AnyType["Boolean"])) ? (`${anythingInner}`) : ((argumentType === AnyType["Object"]) ? ((Object.keys(anythingInner).length === 0) ? ("{}") : ((Object.keys(anythingInner).includes("ISO8601") === true) ? (`${((pretty === true) ? (`{\n${indent.repeat(indentLevel + 1)}`) : "{ ")}${(`"pretty": "${anythingInner["pretty"]}"${(pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", "}"ISO8601": "${anythingInner["ISO8601"]}"${(pretty === true) ? "," : ""}`)}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}}`) : " }")}`) : (`${((pretty === true) ? (`{\n${indent.repeat(indentLevel + 1)}`) : "{ ")}${Object.entries(anythingInner).reduce((currentResult, [objectKey, objectValue], objectEntryIndex) => (`${currentResult}"${objectKey}": ${temporaryMap.get("f")(objectValue, { indentLevel: (indentLevel + 1) })}${((objectEntryIndex + 1) !== Object.keys(anythingInner).length) ? ((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ") : ""}`), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}}`) : " }")}`))) : ((argumentType === AnyType["Array"]) ? ((anythingInner.length === 0) ? ("[]") : (`${((pretty === true) ? (`[\n${indent.repeat(indentLevel + 1)}`) : "[")}${anythingInner.reduce((currentResult, arrayItem, arrayItemIndex) => (`${currentResult}${temporaryMap.get("f")(arrayItem, { indentLevel: (indentLevel + 1) })}${((arrayItemIndex + 1) !== anythingInner.length) ? ((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ") : ""}`), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}]`) : "]")}`)) : ((argumentType === AnyType["Function"]) ? (`"${anythingInner.toString()}"`) : (`${anythingInner}`)))))))))))))), (temporaryMap.get("f")(anything))].at(-1)))(new Map()); /* custom JSON.stringify() function jsonStringifyV5 */
    const randomIntInclusive = (lowerBound, upperBound) => (Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound);
    const removeDuplicateListItem = (anyArray, callbackFunction = ((anyArrayItem) => (anyArrayItem))) => (anyArray.reduce(([uniqueKeyMap, uniqueArray], anyArrayItem) => ((newUniqueKeyString) => ((uniqueKeyMap.get(newUniqueKeyString) !== undefined) ? [uniqueKeyMap, uniqueArray] : ([(uniqueKeyMap.set(newUniqueKeyString, anyArrayItem)), (uniqueArray.push(anyArrayItem)), ([uniqueKeyMap, uniqueArray])].at(-1))))(callbackFunction(anyArrayItem)), [new Map(), []]).at(-1)); /* removeDuplicateListItemV2 */
    const rangeInclusive = function* (startNumber, stopNumber) {
        const stepNumber = ((startNumber < stopNumber) ? 1 : (startNumber > stopNumber) ? -1 : 0);
        if (stepNumber === 0) {
            yield startNumber;
            return;
        }
        for (let i = startNumber; ((stepNumber > 0) ? (i <= stopNumber) : (i >= stopNumber)); i += stepNumber) {
            yield i;
        }
    };
    const generatorExpression = function* (anyIterable, callbackFunction = ((anyIterableItem) => (anyIterableItem)), filterConditionFunction = (() => (true))) {
        for (const anyRangeItem of anyIterable) {
            if (filterConditionFunction(anyRangeItem) === true) {
                yield callbackFunction(anyRangeItem);
            }
        }
    };
    const listComprehension = (anyIterable, callbackFunction = ((anyIterableItem) => (anyIterableItem)), filterConditionFunction = (() => (true))) => Array.from(generatorExpression(anyIterable, callbackFunction, filterConditionFunction));
    const getRgbHexColorFromString = (anyString) => (Array.from({ length: 3 }, (_, i) => (((Array.from(anyString).reduce((currentNumericHash, currentCharacter) => (currentCharacter.charCodeAt(0) + ((currentNumericHash << 5) - currentNumericHash)), 0)) >> (i * 8)) & 0xff).toString(16).padStart(2, "0")).reduce((rgbHexColorCurrent, rgbHexColorPartCurrent) => (`${rgbHexColorCurrent}${rgbHexColorPartCurrent}`), "#"));
    const checkIsRgbHexColorLightLuminance = (anyString) => (pipe((pipe((anyString.replace(new RegExp("^#", "g"), "")), ((rgbStringInitial) => ((rgbStringInitial.length === 3) ? (rgbStringInitial.split("").map((rgbDigit) => (rgbDigit + rgbDigit)).join("")) : rgbStringInitial)))), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16) / 255), (parseInt(rgbString.slice(2, 4), 16) / 255), (parseInt(rgbString.slice(4, 6), 16) / 255)])), (([r, g, b]) => (pipe(((0.2126 * r) + (0.7152 * g) + (0.0722 * b)), ((luminance) => (luminance > 0.5)))))));
    const checkIsRgbHexColorLightYiq = (anyString) => (pipe((pipe((anyString.replace(new RegExp("^#", "g"), "")), ((rgbStringInitial) => ((rgbStringInitial.length === 3) ? (rgbStringInitial.split("").map((rgbDigit) => (rgbDigit + rgbDigit)).join("")) : rgbStringInitial)))), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16)), (parseInt(rgbString.slice(2, 4), 16)), (parseInt(rgbString.slice(4, 6), 16))])), (([r, g, b]) => (pipe((((r * 299) + (g * 587) + (b * 114)) / 1000), ((yiq) => (yiq >= 128)))))));
    const checkIsRgbHexColorLightAverage = (anyString) => (pipe((pipe((anyString.replace(new RegExp("^#", "g"), "")), ((rgbStringInitial) => ((rgbStringInitial.length === 3) ? (rgbStringInitial.split("").map((rgbDigit) => (rgbDigit + rgbDigit)).join("")) : rgbStringInitial)))), ((rgbString) => ([parseInt(rgbString.slice(0, 2), 16), parseInt(rgbString.slice(2, 4), 16), parseInt(rgbString.slice(4, 6), 16)])), (([r, g, b]) => (pipe(((r + g + b) / 3), ((average) => (average > 127.5)))))));
    const checkIsRgbHexColorLightHsl = (anyString) => (pipe((pipe((anyString.replace(new RegExp("^#", "g"), "")), ((rgbStringInitial) => ((rgbStringInitial.length === 3) ? (rgbStringInitial.split("").map((rgbDigit) => (rgbDigit + rgbDigit)).join("")) : rgbStringInitial)))), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16) / 255), (parseInt(rgbString.slice(2, 4), 16) / 255), (parseInt(rgbString.slice(4, 6), 16) / 255)])), (([r, g, b]) => ([(Math.max(r, g, b)), (Math.min(r, g, b))])), (([max, min]) => (pipe(((max + min) / 2), ((l) => (l > 0.5)))))));
    const ColorLightnessMethod = {
        "Luminance": checkIsRgbHexColorLightLuminance,
        "Yiq": checkIsRgbHexColorLightYiq,
        "Average": checkIsRgbHexColorLightAverage,
        "Hsl": checkIsRgbHexColorLightHsl,
        "Default": checkIsRgbHexColorLightLuminance,
    };
    const checkIsRgbHexColorLight = (anyString) => (ColorLightnessMethod["Default"](anyString));
    const getValidRgbHexColor = (anything) => {
        if (!anything) return null;
        const rgbHexColor = anything.trim();
        if (!(new RegExp("^#?[0-9a-fA-F]{3,6}$", "g").test(rgbHexColor))) return null;
        if (!rgbHexColor.startsWith("#")) return `#${rgbHexColor}`;
        return rgbHexColor;
    };
    const getInvertedRgbHexColorByParsePerChannel = (anyString) => (pipe((pipe((anyString.replace(new RegExp("^#", "g"), "")), ((rgbStringInitial) => ((rgbStringInitial.length === 3) ? (rgbStringInitial.split("").map((rgbDigit) => (rgbDigit + rgbDigit)).join("")) : rgbStringInitial)))), ((rgbString) => ([(255 - (parseInt(rgbString.slice(0, 2), 16))), (255 - (parseInt(rgbString.slice(2, 4), 16))), (255 - (parseInt(rgbString.slice(4, 6), 16)))])), (([r, g, b]) => (`#${[r, g, b].map((rgbDigit) => (rgbDigit).toString(16).padStart(2, "0")).join("")}`))));
    const getInvertedRgbHexColorByBitwiseXor = (anyString) => (pipe((pipe((anyString.replace(new RegExp("^#", "g"), "")), ((rgbStringInitial) => ((rgbStringInitial.length === 3) ? (rgbStringInitial.split("").map((rgbDigit) => (rgbDigit + rgbDigit)).join("")) : rgbStringInitial)))), ((rgbString) => (`#${(0xFFFFFF ^ parseInt(rgbString, 16)).toString(16).padStart(6, "0")}`))));
    const getInvertedRgbHexColorByBigInt = (anyString) => (pipe((pipe((anyString.replace(new RegExp("^#", "g"), "")), ((rgbStringInitial) => ((rgbStringInitial.length === 3) ? (rgbStringInitial.split("").map((rgbDigit) => (rgbDigit + rgbDigit)).join("")) : rgbStringInitial)))), ((rgbString) => (`#${(0xFFFFFFn ^ BigInt(rgbString)).toString(16).padStart(6, "0")}`))));
    const getInvertedRgbHexColorFromString = (anyString) => getInvertedRgbHexColorByParsePerChannel(anyString);
    const getColorFromString = (anyString) => {
        const rgbHexColorBackground = getRgbHexColorFromString(anyString);
        const rgbHexColorText = getInvertedRgbHexColorFromString(rgbHexColorBackground);
        const isRgbHexColorBackgroundLight = checkIsRgbHexColorLight(rgbHexColorBackground);
        return ({
            backgroundColor: rgbHexColorBackground,
            textColor: rgbHexColorText,
            isBackgroundColorLight: isRgbHexColorBackgroundLight,
        });
    };
    const iterateList = (anyList, callbackFunction = ((anyArrayItem, anyArrayItemIndex, anyArray) => (undefined))) => {
        let i = 0;
        for (const listItem of anyList) {
            callbackFunction(listItem, i, anyList);
            i += 1;
        }
    };
    const iterateListAsync = async (anyList, callbackFunctionAsync = ((anyArrayItem, anyArrayItemIndex, anyArray) => (undefined))) => {
        let i = 0;
        for (const listItem of anyList) {
            await callbackFunctionAsync(listItem, i, anyList);
            i += 1;
        }
    };
    const loop = (startNumber, stopNumber) => {
        const anyList = rangeInclusive(startNumber, stopNumber);
        return ((callbackFunction = ((anyArrayItem, anyArrayItemIndex, anyArray) => (undefined))) => {
            let i = 0;
            for (const listItem of anyList) {
                callbackFunction(listItem, i, anyList);
                i += 1;
            }
        });
    };
    const loopAsync = (startNumber, stopNumber) => {
        const anyList = rangeInclusive(startNumber, stopNumber);
        return (async (callbackFunctionAsync = ((anyArrayItem, anyArrayItemIndex, anyArray) => (undefined))) => {
            let i = 0;
            for (const listItem of anyList) {
                await callbackFunctionAsync(listItem, i, anyList);
                i += 1;
            }
        });
    };
    const catchAnyError = (asyncFunction, callbackFunction = ((anyResult) => anyResult)) => (asyncFunction.then((anyResult) => ([null, callbackFunction(anyResult)])).catch((anyError) => ([anyError, null])));
    const throwError = (anyErrorMessage) => {
        throw new Error(anyErrorMessage);
    };

    return {
        regexPattern,
        getNumberDifferenceInNumeric,
        getMostFrequent,
        pickArrayItemRandomly,
        parseEscapeSequence,
        pythonLikeSleep,
        runOnce,
        runNthTime,
        printOnce,
        printAndReturn,
        generateTimestamp,
        AnyType,
        checkIsNull,
        checkIsUndefined,
        checkIsBoolean,
        checkIsString,
        checkIsNumeric,
        checkIsObject,
        checkIsArray,
        checkIsFunction,
        checkIsError,
        checkIsStringIso8601,
        checkIsDate,
        getType,
        pipe,
        jsonStringify,
        randomIntInclusive,
        removeDuplicateListItem,
        rangeInclusive,
        generatorExpression,
        listComprehension,
        getRgbHexColorFromString,
        getInvertedRgbHexColorFromString,
        getColorFromString,
        checkIsRgbHexColorLightLuminance,
        checkIsRgbHexColorLightYiq,
        checkIsRgbHexColorLightAverage,
        checkIsRgbHexColorLightHsl,
        checkIsRgbHexColorLight,
        getValidRgbHexColor,
        iterateList,
        iterateListAsync,
        loop,
        loopAsync,
        catchAnyError,
        throwError,
    };
});
