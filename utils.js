window.Utils = ((() => {
    const regexPattern = {
        "three_digit_grouping": (/\B(?=(\d{3})+(?!\d))/g),
    };
    const parseEscapeSequence = (anyString) => JSON.parse(`"${anyString}"`);
    const pythonLikeSleep = (anySeconds) => new Promise((anyResolveFunction) => setTimeout(anyResolveFunction, (anySeconds * 1 * (({ secondInMiliseconds }) => secondInMiliseconds)({ secondInMiliseconds: 1_000 }))));
    const runOnce = ((keySet) => (anyStringKey = "something", callbackFunction = (() => undefined)) => (keySet.has(anyStringKey) ? undefined : ([(keySet.add(anyStringKey)), (callbackFunction())].at(-1))))(new Set()); /* runOnceV2 */
    const runNthTime = ((keyCountMap) => (({ keyString = "something", runTime = 1 } = {}, callbackFunction = (() => undefined)) => (((keyCountMap.get(keyString) ?? 0) >= runTime) ? undefined : ([(keyCountMap.set(keyString, ((keyCountMap.get(keyString) ?? 0) + 1))), (callbackFunction(runTime, keyCountMap.get(keyString)))].at(-1)))))(new Map()); /* runNthTimeV2 */
    const printOnce = ((keySet) => (anything, { key, title, formatter = ((anythingInner) => anythingInner) } = {}) => (((anyStringKey) => (keySet.has(anyStringKey) ? anything : ([(keySet.add(anyStringKey)), (console.log(`${title ? `${title}: ` : ""}${formatter(anything)}`)), anything].at(-1))))(key || title || "first")))(new Set()); /* printOnceV2 */
    const printAndReturn = (anything, { title, formatter = ((anythingInner) => anythingInner) } = {}) => ([(console.log(`${title ? `${title}: ` : ""}${formatter(anything)}`)), anything].at(-1));
    const extractDate = (anything) => (((anythingType) => (((anyDate) => ((anyDate === undefined) ? undefined : (((anyDate) => ((([hourMinuteTwentyFourHourClockAllZeroPaddedJoinByColon, amPm], [zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute]) => ((([zeroPaddedHourTwelveHourClock, _]) => ([(String(anyDate.getFullYear())), (String(anyDate.getMonth() + 1).padStart(2, "0")), (new Intl.DateTimeFormat("en-US", { month: "short" }).format(anyDate)), (String(anyDate.getDate()).padStart(2, "0")), (new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(anyDate)), zeroPaddedHourTwelveHourClock, amPm, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, (String(anyDate.getSeconds()).padStart(2, "0")), (String(anyDate.getMilliseconds()).padStart(3, "0"))]))(hourMinuteTwentyFourHourClockAllZeroPaddedJoinByColon.split(":"))))((new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).format(anyDate).split(" ")), (new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(anyDate).split(":")))))(new Date(anything)))))((anythingType === AnyType["String"]) ? new Date(anything) : ((anythingType === AnyType["Date"]) ? anything : undefined))))(getType(anything))); /* extractDateV3 */
    const prettyFormatDate = (precise, fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, amPm, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit) => (`((${fullYear}//(${zeroPaddedMonth}|${monthThreeFirstLetter})//(${zeroPaddedDay}|${dayThreeFirstLetter})||(${(precise === true) ? "(" : ""}${zeroPaddedHourTwelveHourClock}:${zeroPaddedMinute}${amPm}|${zeroPaddedHourTwentyFourHourClock}:${zeroPaddedMinute})${(precise === true) ? (`:${zeroPaddedSecond}.${zeroPaddedMiliSecondThreeDigit}`) : ("")}${(precise === true) ? ")" : ""}))`); /* prettyFormatDateV2 */
    const datePrettier = (anything = new Date(), precise) => (((anythingType) => ((([fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, amPm, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit]) => (prettyFormatDate(precise, fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, amPm, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit)))((anythingType === AnyType["String"]) ? extractDate(new Date(anything).toISOString()) : ((anythingType === AnyType["Date"]) ? extractDate(anything.toISOString()) : []))))(getType(anything))); /* datePrettierV2 */
    const generateTimestamp = ({ precise = false } = {}) => ((([fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, amPm, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit]) => (prettyFormatDate(precise, fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, amPm, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit)))(extractDate(new Date().toISOString()))); /* generateTimestampV2 */
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
    const jsonStringify = (anything, { pretty = false } = {}) => ((temporaryMap) => ([(temporaryMap.set("f", ((anythingInner, { indent = " ".repeat(4), indentLevel = 0, argumentType = getType(anythingInner) } = {}) => ((checkIsStringIso8601(anythingInner) === true) ? (temporaryMap.get("f")({ "pretty": generateTimestamp(anythingInner), "ISO8601": anythingInner }, { indentLevel })) : ((argumentType === AnyType["Undefined"]) ? ('"undefined"') : ((argumentType === AnyType["Null"]) ? ("null") : ((argumentType === AnyType["Error"]) ? (`"${anythingInner.toString()}"`) : ((argumentType === AnyType["Date"]) ? (temporaryMap.get("f")({ "pretty": generateTimestamp(anythingInner), "ISO8601": anythingInner.toISOString() }, { indentLevel })) : ((argumentType === AnyType["String"]) ? (`"${anythingInner}"`) : (((argumentType === AnyType["Numeric"]) || (argumentType === AnyType["Boolean"])) ? (`${anythingInner}`) : ((argumentType === AnyType["Object"]) ? ((Object.keys(anythingInner).length === 0) ? ("{}") : ((Object.keys(anythingInner).includes("ISO8601") === true) ? (`${((pretty === true) ? (`{\n${indent.repeat(indentLevel + 1)}`) : "{ ")}${(`"pretty": "${anythingInner["pretty"]}"${(pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", "}"ISO8601": "${anythingInner["ISO8601"]}"${(pretty === true) ? "," : ""}`)}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}}`) : " }")}`) : (`${((pretty === true) ? (`{\n${indent.repeat(indentLevel + 1)}`) : "{ ")}${Object.entries(anythingInner).reduce((currentResult, [objectKey, objectValue], objectEntryIndex) => (`${currentResult}"${objectKey}": ${temporaryMap.get("f")(objectValue, { indentLevel: (indentLevel + 1) })}${((objectEntryIndex + 1) !== Object.keys(anythingInner).length) ? ((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ") : ""}`), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}}`) : " }")}`))) : ((argumentType === AnyType["Array"]) ? ((anythingInner.length === 0) ? ("[]") : (`${((pretty === true) ? (`[\n${indent.repeat(indentLevel + 1)}`) : "[")}${anythingInner.reduce((currentResult, arrayItem, arrayItemIndex) => (`${currentResult}${temporaryMap.get("f")(arrayItem, { indentLevel: (indentLevel + 1) })}${((arrayItemIndex + 1) !== anythingInner.length) ? ((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ") : ""}`), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}]`) : "]")}`)) : ((argumentType === AnyType["Function"]) ? (`"${anythingInner.toString()}"`) : (`${anythingInner}`)))))))))))))), (temporaryMap.get("f")(anything))].at(-1)))(new Map()); /* custom JSON.stringify() function jsonStringifyV5 */
    const randomIntInclusive = (lowerBound, upperBound) => (Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound);
    const removeDuplicateListItem = (anyArray, callbackFunction = ((anyArrayItem) => anyArrayItem)) => (anyArray.reduce(([uniqueKeyMap, uniqueArray], anyArrayItem) => ((newUniqueKeyString) => ((uniqueKeyMap.get(newUniqueKeyString) !== undefined) ? [uniqueKeyMap, uniqueArray] : ([(uniqueKeyMap.set(newUniqueKeyString, anyArrayItem)), (uniqueArray.push(anyArrayItem)), ([uniqueKeyMap, uniqueArray])].at(-1))))(callbackFunction(anyArrayItem)), [new Map(), []]).at(-1)); /* removeDuplicateListItemV2 */
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
    const generatorExpression = function* (anyIterable, callbackFunction, filterConditionFunction = () => true) {
        for (const anyRangeItem of anyIterable) {
            if (filterConditionFunction(anyRangeItem) === true) {
                yield callbackFunction(anyRangeItem);
            }
        }
    };
    const listComprehension = (anyIterable, callbackFunction, filterConditionFunction) => Array.from(generatorExpression(anyIterable, callbackFunction, filterConditionFunction));
    const stringToRgbHexColor = (anyString) => (Array.from({ length: 3 }, (_, i) => (((Array.from(anyString).reduce((currentNumericHash, currentCharacter) => (currentCharacter.charCodeAt(0) + ((currentNumericHash << 5) - currentNumericHash)), 0)) >> (i * 8)) & 0xff).toString(16).padStart(2, "0")).reduce((rgbHexColorCurrent, rgbHexColorPartCurrent) => (`${rgbHexColorCurrent}${rgbHexColorPartCurrent}`), "#"));
    const iterateList = (anyList, callbackFunction) => {
        let i = 0;
        for (const listItem of anyList) {
            callbackFunction(listItem, i, anyList);
            i += 1;
        }
    };
    const iterateListAsync = async (anyList, callbackFunctionAsync) => {
        let i = 0;
        for (const listItem of anyList) {
            await callbackFunctionAsync(listItem, i, anyList);
            i += 1;
        }
    };
    const loop = (startNumber, stopNumber) => {
        const anyList = rangeInclusive(startNumber, stopNumber);
        return ((callbackFunction) => {
            let i = 0;
            for (const listItem of anyList) {
                callbackFunction(listItem, i, anyList);
                i += 1;
            }
        });
    };
    const loopAsync = (startNumber, stopNumber) => {
        const anyList = rangeInclusive(startNumber, stopNumber);
        return (async (callbackFunctionAsync) => {
            let i = 0;
            for (const listItem of anyList) {
                await callbackFunctionAsync(listItem, i, anyList);
                i += 1;
            }
        });
    };
    const catchAnyError = (asyncFunction) => (asyncFunction.then((anyResult) => ([null, anyResult])).catch((anyError) => ([anyError, null])));
    const throwError = (anyErrorMessage) => {
        throw new Error(anyErrorMessage);
    };

    return {
        regexPattern,
        parseEscapeSequence,
        pythonLikeSleep,
        runOnce,
        runNthTime,
        printOnce,
        printAndReturn,
        extractDate,
        prettyFormatDate,
        datePrettier,
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
        jsonStringify,
        randomIntInclusive,
        removeDuplicateListItem,
        rangeInclusive,
        generatorExpression,
        listComprehension,
        stringToRgbHexColor,
        iterateList,
        iterateListAsync,
        loop,
        loopAsync,
        catchAnyError,
        throwError,
    };
})());
