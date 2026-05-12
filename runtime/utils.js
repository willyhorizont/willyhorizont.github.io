((root, factory) => {
    // UMD (Universal Module Definition)
    if ((typeof window !== "undefined") && (typeof document !== "undefined")) {
        // Web Browser environment non module script (script with no type="module")
        root.WillyHorizont = (root.WillyHorizont || {});
        root.WillyHorizont.Utils = factory(root);
        return;
    }
    if ((typeof module !== "undefined") && ("exports" in module) && (typeof module.exports !== "undefined")) {
        // Node.js CommonJS environment may also support Web Browser environment module script (script with type="module") and Node.js ES Module (ESM) environment
        module.exports = factory(root);
        return;
    }
    // Unknown / unsupported environment
})(globalThis, (root) => {
    const regexPattern = {
        "three_digit_grouping": (new RegExp(`\B(?=(\d{3})+(?!\d))`, "g")),
    };
    const throwError = (anyErrorMessage) => {
        throw new Error(anyErrorMessage);
    };
    const optionalChaining = (callbackFunction, defaultValue = null) => {
        try {
            return callbackFunction();
        } catch (anyError) {
            return defaultValue;
        }
    };
    const createGenerator = (nextFunction = ((currentIterator) => ({ value: currentIterator, nextState: currentIterator, done: false })), initialState) => ((function* () {
        let currentState = initialState;
        while (true) {
            const nextFunctionResult = nextFunction(currentState);
            const nextFunctionResultValue = (nextFunctionResult?.value ?? nextFunctionResult);
            const nextFunctionResultNextState = (nextFunctionResult?.nextState ?? nextFunctionResultValue);
            const isGeneratorFunctionDone = (nextFunctionResult?.done ?? false);
            if (isGeneratorFunctionDone) return;
            currentState = nextFunctionResultNextState;
            yield nextFunctionResultValue;
        }
    })());
    const fetchThrowErrorIfNotOk = async (anyUrl) => {
        const anyFetchResponse = await fetch(anyUrl);
        if (!anyFetchResponse.ok) {
            throw new Error(`fetch ${anyUrl} not ok`);
        }
        return anyFetchResponse;
    };
    const createRecursiveFunctionNoCallStackLimitInner = (callbackFunction) => (...restArguments) => {
        let result = callbackFunction(...restArguments);
        while (Object.prototype.toString.call(result) === "[object Function]") {
            result = result();
        }
        return result;
    };
    const createRecursiveFunctionNoCallStackLimit = (callbackFunctionWrapper) => (((self = (...restArguments) => () => callbackFunction(...restArguments), callbackFunction = callbackFunctionWrapper(self)) => createRecursiveFunctionNoCallStackLimitInner(callbackFunction))());
    const replaceAnyLineBreak = (inputString, separator = " ") => (inputString.replace(new RegExp("\\s*(?:\\r\\n|\\r|\\n|\\u2028|\\u2029)+\\s*", "g"), separator).trim());
    const safeGetObjectProperty = (rootObject, methodChain) => ((typeof rootObject === "undefined") ? false : (methodChain.split(".").slice(1).reduce((currentResult, currentProperty) => ((currentResult && (currentProperty in currentResult)) ? currentResult[currentProperty] : undefined), rootObject)))
    const checkIsMethodAvailable = (rootObject, methodChain) => (typeof safeGetObjectProperty(rootObject, methodChain) === "function");
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
    const getMostFrequentOneLiner = (anyArray, callbackFunction = (anyArrayItem) => (anyArrayItem)) => (((frequencyMap) => (anyArray.reduce(((getMostFrequentOneLinerLocalVariableMap, anyArrayItem, anyArrayItemIndex) => (((currentCount) => ([frequencyMap.set(callbackFunction(anyArrayItem), currentCount), ((currentCount > getMostFrequentOneLinerLocalVariableMap.get("maxCount")) ? ([(getMostFrequentOneLinerLocalVariableMap.set("maxCount", currentCount)), (getMostFrequentOneLinerLocalVariableMap.set("mostFrequentResult", callbackFunction(anyArrayItem))), (undefined)].at(-1)) : undefined), ((anyArrayItemIndex === (anyArray.length - 1)) ? getMostFrequentOneLinerLocalVariableMap.get("mostFrequentResult") : getMostFrequentOneLinerLocalVariableMap)].at(-1)))((frequencyMap.get(callbackFunction(anyArrayItem)) || 0) + 1))), (new Map([["maxCount", 0], ["mostFrequentResult", null]])))))(new Map()));
    const pickArrayItemRandomly = (anyArray) => (anyArray.at(randomIntInclusive({ lowerBound: 0, upperBound: (anyArray.length - 1) })));
    const parseEscapeSequence = (anyString) => (JSON.parse(`"${anyString}"`));
    const pythonLikeSleep = (anySeconds) => new Promise((anyResolveFunction) => setTimeout(anyResolveFunction, (anySeconds * 1 * (({ secondInMiliseconds }) => secondInMiliseconds)({ secondInMiliseconds: 1_000 }))));
    const runOnce = ((keySet) => (anyStringKey = "something", callbackFunction = (() => (undefined))) => (keySet.has(anyStringKey) ? undefined : ([(keySet.add(anyStringKey)), (callbackFunction())].at(-1))))(new Set()); /* runOnceV2 */
    const runNthTime = ((keyCountMap) => (({ keyString = "something", runTime = 1 } = {}, callbackFunction = ((totalRunTime, currentRunTime) => (undefined))) => (((keyCountMap.get(keyString) ?? 0) >= runTime) ? undefined : ([(keyCountMap.set(keyString, ((keyCountMap.get(keyString) ?? 0) + 1))), (callbackFunction(runTime, keyCountMap.get(keyString)))].at(-1)))))(new Map()); /* runNthTimeV2 */
    const printOnce = ((keySet) => (anything, { key, title, formatter = ((anythingInner) => anythingInner) } = {}) => (((anyStringKey) => (keySet.has(anyStringKey) ? anything : ([(keySet.add(anyStringKey)), (console.log(`${title ? `${title}: ` : ""}${formatter(anything)}`)), anything].at(-1))))(key || title || "first")))(new Set()); /* printOnceV2 */
    const printAndReturn = (anything, { title, formatter = ((anythingInner) => anythingInner) } = {}) => ([(console.log(`${title ? `${title}: ` : ""}${formatter(anything)}`)), anything].at(-1));
    const prettyFormatDate = ({ includeSecond = true, includeMiliSecond = false, fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, twelveHourClockLatinAbbreviation, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit }) => (`(${zeroPaddedMonth}/12 month) | ${dayThreeFirstLetter}, ${zeroPaddedDay} ${monthThreeFirstLetter} ${fullYear} | ${zeroPaddedHourTwentyFourHourClock}:${zeroPaddedMinute}${includeSecond ? `:${zeroPaddedSecond}` : ``}${includeMiliSecond ? `.${zeroPaddedMiliSecondThreeDigit}` : ``} | ${zeroPaddedHourTwelveHourClock}:${zeroPaddedMinute} ${twelveHourClockLatinAbbreviation}`); /* prettyFormatDateV2 */
    const extractDate = (anything) => {
        const anythingType = getType(anything);
        const dateObject = ((anythingType === AnyType["String"]) ? new Date(anything) : ((anythingType === AnyType["Date"]) ? anything : undefined));
        if (dateObject === undefined) return undefined;
        const [hourMinuteTwentyFourHourClockAllZeroPaddedJoinByColon, twelveHourClockLatinAbbreviation] = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).format(dateObject).split(" ");
        const [zeroPaddedHourTwelveHourClock, _] = hourMinuteTwentyFourHourClockAllZeroPaddedJoinByColon.split(":");
        const [zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute] = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(dateObject).split(":");
        return ({
            fullYear: (`${dateObject.getUTCFullYear()}`),
            zeroPaddedMonth: ((`${dateObject.getUTCMonth() + 1}`).padStart(2, "0")),
            monthThreeFirstLetter: (new Intl.DateTimeFormat("en-US", { month: "short" }).format(dateObject)),
            zeroPaddedDay: ((`${dateObject.getUTCDate()}`).padStart(2, "0")),
            dayThreeFirstLetter: (new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dateObject)),
            zeroPaddedHourTwelveHourClock,
            twelveHourClockLatinAbbreviation,
            zeroPaddedHourTwentyFourHourClock,
            zeroPaddedMinute,
            zeroPaddedSecond: ((`${dateObject.getUTCSeconds()}`).padStart(2, "0")),
            zeroPaddedMiliSecondThreeDigit: ((`${dateObject.getUTCMilliseconds()}`).padStart(3, "0")),
        });
    }; /* extractDateV3 */
    const getClock = ({ includeSecond = true, includeMiliSecond = true } = {}) => ((({ fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, twelveHourClockLatinAbbreviation, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit }) => (prettyFormatDate({ includeSecond, includeMiliSecond, fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, twelveHourClockLatinAbbreviation, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit })))(extractDate(new Date().toISOString()))); /* getClockV2 */
    const getTimestamp = () => ((({ fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, twelveHourClockLatinAbbreviation, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit }) => (`${fullYear}-${zeroPaddedMonth}-${zeroPaddedDay}-at-${zeroPaddedHourTwentyFourHourClock}.${zeroPaddedHourTwelveHourClock}.${zeroPaddedMinute}.${zeroPaddedMiliSecondThreeDigit}`))(extractDate(new Date().toISOString()))); /* getTimestampV2 */
    const AnyType = { "Null": "Null", "Undefined": "Undefined", "Boolean": "Boolean", "String": "String", "Numeric": "Numeric", "Object": "Object", "Array": "Array", "Function": "Function", "Error": "Error", "Date": "Date" };
    const checkIsNull = (anything) => ((Object.prototype.toString.call(anything) === "[object Null]") && (anything === null));
    const checkIsUndefined = (anything) => ((Object.prototype.toString.call(anything) === "[object Undefined]") && (anything === undefined));
    const checkIsBoolean = (anything) => ((Object.prototype.toString.call(anything) === "[object Boolean]") && ((anything === true) || (anything === false)));
    const checkIsString = (anything) => (Object.prototype.toString.call(anything) === "[object String]");
    const checkIsNumeric = (anything) => ((Object.prototype.toString.call(anything) === "[object Number]") && (Number.isNaN(anything) === false) && (Number.isFinite(anything) === true));
    const checkIsInt = (anything) => (checkIsNumeric(anything) && (Math.floor(anything) === anything) && (Number.isInteger(anything) === true));
    const checkIsFloat = (anything) => (checkIsNumeric(anything) && (Math.floor(anything) !== anything) && (Number.isInteger(anything) === false));
    const checkIsObject = (anything) => (Object.prototype.toString.call(anything) === "[object Object]");
    const checkIsArray = (anything) => ((Object.prototype.toString.call(anything) === "[object Array]") && (Array.isArray(anything) === true));
    const checkIsFunction = (anything) => (Object.prototype.toString.call(anything) === "[object Function]");
    const checkIsError = (anything) => (Object.prototype.toString.call(anything) === "[object Error]");
    const checkIsStringIso8601 = (anything) => ((checkIsString(anything) === false) ? false : ((new RegExp(`^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$`, "g").test(anything) === false) ? false : ((dateParsedFromString) => ((checkIsNumeric(dateParsedFromString.getTime()) === false) ? false : (dateParsedFromString.toISOString().replace(new RegExp(`\.000Z$`, "g"), "Z") === anything)))(new Date(anything))));
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
    const pipeOneLiner = (...restArguments) => (((pipeLastResultMap) => (((pipeResult) => (getType(pipeResult) === AnyType["Function"] ? (pipeResult(pipeLastResultMap.get("result"))) : (pipeResult)))(restArguments.reduce((currentResult, currentArgument) => ([(pipeLastResultMap.set("result", currentResult)), ((getType(currentResult) === AnyType["Undefined"]) ? currentArgument : ((getType(currentArgument) === AnyType["Function"]) ? currentArgument(currentResult) : undefined))].at(-1)), undefined))))(new Map()));
    const jsonStringify = (anything, { pretty = false } = {}) => ((temporaryMap) => ([(temporaryMap.set("f", ((anythingInner, { indent = " ".repeat(4), indentLevel = 0, argumentType = getType(anythingInner) } = {}) => ((checkIsStringIso8601(anythingInner) === true) ? (temporaryMap.get("f")({ "pretty": getClock(anythingInner), "ISO8601": anythingInner }, { indentLevel })) : ((argumentType === AnyType["Undefined"]) ? ('"undefined"') : ((argumentType === AnyType["Null"]) ? ("null") : ((argumentType === AnyType["Error"]) ? (`"${anythingInner.toString()}"`) : ((argumentType === AnyType["Date"]) ? (temporaryMap.get("f")({ "pretty": getClock(anythingInner), "ISO8601": anythingInner.toISOString() }, { indentLevel })) : ((argumentType === AnyType["String"]) ? (`"${anythingInner}"`) : (((argumentType === AnyType["Numeric"]) || (argumentType === AnyType["Boolean"])) ? (`${anythingInner}`) : ((argumentType === AnyType["Object"]) ? ((Object.keys(anythingInner).length === 0) ? ("{}") : ((Object.keys(anythingInner).includes("ISO8601") === true) ? (`${((pretty === true) ? (`{\n${indent.repeat(indentLevel + 1)}`) : "{ ")}${(`"pretty": "${anythingInner["pretty"]}"${(pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", "}"ISO8601": "${anythingInner["ISO8601"]}"${(pretty === true) ? "," : ""}`)}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}}`) : " }")}`) : (`${((pretty === true) ? (`{\n${indent.repeat(indentLevel + 1)}`) : "{ ")}${Object.entries(anythingInner).reduce((currentResult, [objectKey, objectValue], objectEntryIndex) => (`${currentResult}"${objectKey}": ${temporaryMap.get("f")(objectValue, { indentLevel: (indentLevel + 1) })}${((objectEntryIndex + 1) !== Object.keys(anythingInner).length) ? ((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ") : ""}`), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}}`) : " }")}`))) : ((argumentType === AnyType["Array"]) ? ((anythingInner.length === 0) ? ("[]") : (`${((pretty === true) ? (`[\n${indent.repeat(indentLevel + 1)}`) : "[")}${anythingInner.reduce((currentResult, arrayItem, arrayItemIndex) => (`${currentResult}${temporaryMap.get("f")(arrayItem, { indentLevel: (indentLevel + 1) })}${((arrayItemIndex + 1) !== anythingInner.length) ? ((pretty === true) ? (`,\n${indent.repeat(indentLevel + 1)}`) : ", ") : ""}`), "")}${((pretty === true) ? (`\n${indent.repeat(indentLevel)}]`) : "]")}`)) : ((argumentType === AnyType["Function"]) ? (`"${anythingInner.toString()}"`) : (`${anythingInner}`)))))))))))))), (temporaryMap.get("f")(anything))].at(-1)))(new Map()); /* custom JSON.stringify() function jsonStringifyV5 */
    const randomIntInclusive = ({ lowerBound, upperBound, multiplier = 1 } = {}) => ((({ min, max }) => ((Math.floor(Math.random() * (max - min + 1)) + min) * multiplier))({ min: Math.ceil(lowerBound / multiplier), max: Math.floor(upperBound / multiplier) }));
    const removeDuplicateListItem = (anyArray, callbackFunction = ((anyArrayItem) => (anyArrayItem))) => (anyArray.reduce(([uniqueKeyMap, uniqueArray], anyArrayItem) => ((newUniqueKeyString) => ((uniqueKeyMap.get(newUniqueKeyString) !== undefined) ? [uniqueKeyMap, uniqueArray] : ([(uniqueKeyMap.set(newUniqueKeyString, anyArrayItem)), (uniqueArray.push(anyArrayItem)), ([uniqueKeyMap, uniqueArray])].at(-1))))(callbackFunction(anyArrayItem)), [new Map(), []]).at(-1)); /* removeDuplicateListItemV2 */
    const fakeGenerator = () => {
        let i = 0;
        return ({
            next() {
                i += 1;
                return { value: i, done: (i > 3) };
            }
        });
    };
    const increment = (start = 0) => (createGenerator((currentIterator) => (currentIterator + 1), start));
    const rangeInclusiveOneLiner = (start, stop, step = ((start < stop) ? 1 : ((start > stop) ? -1 : 0))) => (createGenerator(((currentIterator) => ((step === 0) ? (currentIterator) : (((step > 0) ? (currentIterator > stop) : (currentIterator < stop)) ? ({ done: true }) : ({ value: currentIterator, nextState: (currentIterator + step), done: false })))), start));
    const rangeInclusive = function* (start, stop, step = ((start < stop) ? 1 : ((start > stop) ? -1 : 0))) {
        if (step === 0) {
            yield start;
            return;
        }
        for (let i = start; ((step > 0) ? (i <= stop) : (i >= stop)); i += step) {
            yield i;
        }
    };
    const pythonLikeGeneratorExpression = function* (anyIterable, callbackFunction = ((anyIterableItem) => (anyIterableItem)), filterConditionFunction = ((anyIterableItem) => (true))) {
        for (const anyRangeItem of anyIterable) {
            if (filterConditionFunction(anyRangeItem) === true) {
                yield callbackFunction(anyRangeItem);
            }
        }
    };
    const pythonLikeGeneratorExpressionOneLiner = (anyIterable, callbackFunction = ((anyIterableItem) => (anyIterableItem)), filterConditionFunction = ((anyIterableItem) => (true))) => (createGenerator(((currentIterator) => (((nextIterator) => ((({ nextIteratorValue, isGeneratorFunctionDone }) => (isGeneratorFunctionDone ? ({ done: true }) : ((filterConditionFunction(nextIteratorValue) === true) ? ({ value: callbackFunction(nextIteratorValue), nextState: currentIterator }) : ({ nextState: currentIterator }))))({ nextIteratorValue: nextIterator?.value, isGeneratorFunctionDone: nextIterator?.done })))(currentIterator.next()))), (anyIterable[Symbol.iterator]())));
    const listComprehension = (anyIterable, callbackFunction = ((anyIterableItem) => (anyIterableItem)), filterConditionFunction = ((anyIterableItem) => (true))) => Array.from(pythonLikeGeneratorExpression(anyIterable, callbackFunction, filterConditionFunction));
    const getRgbHexColorFromString = (anyString) => (Array.from({ length: 3 }, (_, i) => (((Array.from(anyString).reduce((currentNumericHash, currentCharacter) => (currentCharacter.charCodeAt(0) + ((currentNumericHash << 5) - currentNumericHash)), 0)) >> (i * 8)) & 0xff).toString(16).padStart(2, "0")).reduce((rgbHexColorCurrent, rgbHexColorPartCurrent) => (`${rgbHexColorCurrent}${rgbHexColorPartCurrent}`), "#"));
    const getSixDigitRgbStringFromThreeDigitRgbString = (anyString) => (pipe((anyString.replace(new RegExp("^#", "g"), "")), ((rgbStringInitial) => ((rgbStringInitial.length === 3) ? (rgbStringInitial.split("").map((rgbDigit) => (rgbDigit + rgbDigit)).join("")) : rgbStringInitial))));
    const checkIsRgbHexColorLightLuminance = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16) / 255), (parseInt(rgbString.slice(2, 4), 16) / 255), (parseInt(rgbString.slice(4, 6), 16) / 255)])), (([r, g, b]) => (pipe(((0.2126 * r) + (0.7152 * g) + (0.0722 * b)), ((luminance) => (luminance > 0.5)))))));
    const checkIsRgbHexColorLightYiq = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16)), (parseInt(rgbString.slice(2, 4), 16)), (parseInt(rgbString.slice(4, 6), 16))])), (([r, g, b]) => (pipe((((r * 299) + (g * 587) + (b * 114)) / 1000), ((yiq) => (yiq >= 128)))))));
    const checkIsRgbHexColorLightAverage = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16)), (parseInt(rgbString.slice(2, 4), 16)), parseInt(rgbString.slice(4, 6), 16)])), (([r, g, b]) => (pipe(((r + g + b) / 3), ((average) => (average > 127.5)))))));
    const checkIsRgbHexColorLightHsl = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16) / 255), (parseInt(rgbString.slice(2, 4), 16) / 255), (parseInt(rgbString.slice(4, 6), 16) / 255)])), (([r, g, b]) => ([(Math.max(r, g, b)), (Math.min(r, g, b))])), (([max, min]) => (pipe(((max + min) / 2), ((l) => (l > 0.5)))))));
    const ColorLightnessMethod = {
        "Luminance": checkIsRgbHexColorLightLuminance,
        "Yiq": checkIsRgbHexColorLightYiq,
        "Average": checkIsRgbHexColorLightAverage,
        "Hsl": checkIsRgbHexColorLightHsl,
        "Default": checkIsRgbHexColorLightLuminance,
    };
    const checkIsRgbHexColorLight = (anyString) => (ColorLightnessMethod["Default"](anyString));
    const getValidRgbHexColor = (anything) => ((!anything) ? null : (((rgbHexColor) => ((!(new RegExp("^#?[0-9a-fA-F]{3,6}$", "g").test(rgbHexColor))) ? null : ((!rgbHexColor.startsWith("#")) ? (`#${rgbHexColor}`) : rgbHexColor)))(anything.trim())));
    const getInvertedRgbHexColorByParsePerChannel = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(255 - (parseInt(rgbString.slice(0, 2), 16))), (255 - (parseInt(rgbString.slice(2, 4), 16))), (255 - (parseInt(rgbString.slice(4, 6), 16)))])), (([r, g, b]) => (`#${[r, g, b].map((rgbDigit) => (rgbDigit).toString(16).padStart(2, "0")).join("")}`))));
    const getInvertedRgbHexColorByBitwiseXor = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => (`#${(0xFFFFFF ^ parseInt(rgbString, 16)).toString(16).padStart(6, "0")}`))));
    const getInvertedRgbHexColorByBigInt = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => (`#${(0xFFFFFFn ^ BigInt(rgbString)).toString(16).padStart(6, "0")}`))));
    const getInvertedRgbHexColorFromString = (anyString) => getInvertedRgbHexColorByParsePerChannel(anyString);
    const getColorFromString = (anyString) => (((rgbHexColorBackground) => ({ backgroundColor: rgbHexColorBackground, textColor: getInvertedRgbHexColorFromString(rgbHexColorBackground), isBackgroundColorLight: checkIsRgbHexColorLight(rgbHexColorBackground) }))(getRgbHexColorFromString(anyString)));
    const forEach = (anyIterable, callbackFunction = ((anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => {
        let anyIterableItemIndex = 0;
        for (const anyIterableItem of anyIterable) {
            const isBreak = callbackFunction(anyIterableItem, anyIterableItemIndex, anyIterable);
            if (isBreak === true) break;
            anyIterableItemIndex += 1;
        }
    };
    const forEachOneLiner = (anyIterable, callbackFunction = ((anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => (((anyIterator, innerFunction = ((anyIterableItemIndex = 0) => (((step) => (((!step.done) ? ((callbackFunction(step.value, anyIterableItemIndex, anyIterable) === true) ? undefined : innerFunction(anyIterableItemIndex + 1)) : undefined)))(anyIterator.next())))) => (innerFunction(0)))(anyIterable[Symbol.iterator]()));
    const forEachAsync = async (anyIterable, callbackFunctionAsync = (async (anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => {
        let anyIterableItemIndex = 0;
        for (const anyIterableItem of anyIterable) {
            const isBreak = await callbackFunctionAsync(anyIterableItem, anyIterableItemIndex, anyIterable);
            if (isBreak === true) break;
            anyIterableItemIndex += 1;
        }
    };
    const forEachAsyncOneLiner = async (anyIterable, callbackFunctionAsync = (async (anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => (((anyIterator, innerFunction = ((anyIterableItemIndex = 0) => ((async (step) => (((!step.done) ? (((await callbackFunctionAsync(step.value, anyIterableItemIndex, anyIterable)) === true) ? undefined : innerFunction(anyIterableItemIndex + 1)) : undefined)))(anyIterator.next())))) => (innerFunction(0)))(anyIterable[Symbol.iterator]()));
    const forLoop = ({ start, stop, step }, callbackFunction = ((anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => ([(forEach(rangeInclusive(start, stop, step), callbackFunction)), undefined].at(-1));
    const forLoopAsync = async ({ start, stop, step }, callbackFunctionAsync = (async (anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => ([(await forEachAsync(rangeInclusive(start, stop, step), callbackFunctionAsync)), undefined].at(-1));
    const catchAnyError = (asyncFunction, callbackFunction = ((anyResult) => (anyResult))) => (asyncFunction.then((anyResult) => ([null, callbackFunction(anyResult)])).catch((anyError) => ([anyError, null])));
    const getRandomString = (minLength = 2, maxLength = 10) => ((({ characters, lengthRandomString }) => (Array.from({ length: lengthRandomString }, () => (characters[Math.floor(Math.random() * characters.length)])).join("")))({ characters: "abcdefghijklmnopqrstuvwxyz", lengthRandomString: (Math.floor(Math.random() * (maxLength - 1)) + minLength) }));

    return {
        regexPattern,
        createRecursiveFunctionNoCallStackLimitInner,
        createRecursiveFunctionNoCallStackLimit,
        optionalChaining,
        getNumberDifferenceInNumeric,
        fetchThrowErrorIfNotOk,
        getMostFrequent,
        getMostFrequentOneLiner,
        pickArrayItemRandomly,
        parseEscapeSequence,
        pythonLikeSleep,
        runOnce,
        runNthTime,
        printOnce,
        printAndReturn,
        prettyFormatDate,
        extractDate,
        getClock,
        getTimestamp,
        AnyType,
        checkIsNull,
        checkIsUndefined,
        checkIsBoolean,
        checkIsString,
        checkIsNumeric,
        checkIsInt,
        checkIsFloat,
        checkIsObject,
        checkIsArray,
        checkIsFunction,
        checkIsError,
        checkIsStringIso8601,
        checkIsDate,
        getType,
        pipe,
        pipeOneLiner,
        jsonStringify,
        randomIntInclusive,
        replaceAnyLineBreak,
        removeDuplicateListItem,
        rangeInclusive,
        rangeInclusiveOneLiner,
        pythonLikeGeneratorExpression,
        pythonLikeGeneratorExpressionOneLiner,
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
        forEach,
        forEachOneLiner,
        forEachAsync,
        forEachAsyncOneLiner,
        forLoop,
        forLoopAsync,
        catchAnyError,
        throwError,
        getRandomString,
        safeGetObjectProperty,
        checkIsMethodAvailable,
        increment,
    };
});
