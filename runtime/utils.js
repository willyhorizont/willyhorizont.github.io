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
    const AnyType = {
        "Undefined": "Undefined",
        "Null": "Null",
        "Boolean": "Boolean",
        "String": "String",
        "Int": "Int",
        "Float": "Float",
        "PythonLikeList": "PythonLikeList",
        "PythonLikeDict": "PythonLikeDict",
        "Function": "Function",
    };
    const getIsUndefined = (anything) => ((Object.prototype.toString.call(anything) === "[object Undefined]") && (anything === undefined));
    const getIsNull = (anything) => ((Object.prototype.toString.call(anything) === "[object Null]") && (anything === null));
    const getIsBoolean = (anything) => ((Object.prototype.toString.call(anything) === "[object Boolean]") && ((anything === true) || (anything === false)));
    const getIsString = (anything) => (Object.prototype.toString.call(anything) === "[object String]");
    const getIsNumeric = (anything) => ((Object.prototype.toString.call(anything) === "[object Number]") && (Number.isNaN(anything) === false) && (Number.isFinite(anything) === true));
    const getIsInt = (anything) => (getIsNumeric(anything) && (Math.floor(anything) === anything) && (Number.isInteger(anything) === true));
    const getIsFloat = (anything) => (getIsNumeric(anything) && (Math.floor(anything) !== anything) && (Number.isInteger(anything) === false));
    const getIsPythonLikeList = (anything) => ((Object.prototype.toString.call(anything) === "[object Array]") && (Array.isArray(anything) === true));
    const getIsPythonLikeDict = (anything) => (Object.prototype.toString.call(anything) === "[object Object]");
    const getIsFunction = (anything) => (Object.prototype.toString.call(anything) === "[object Function]");
    const getType = (anything) => ((getIsUndefined(anything) === true) ? AnyType["Undefined"] : (getIsNull(anything) === true) ? AnyType["Null"] : (getIsBoolean(anything) === true) ? AnyType["Boolean"] : (getIsString(anything) === true) ? AnyType["String"] : (getIsInt(anything) === true) ? AnyType["Int"] : (getIsFloat(anything) === true) ? AnyType["Float"] : (getIsPythonLikeList(anything) === true) ? AnyType["PythonLikeList"] : (getIsPythonLikeDict(anything) === true) ? AnyType["PythonLikeDict"] : (getIsFunction(anything) === true) ? AnyType["Function"] : Object.prototype.toString.call(anything));
    const jsonStringify = (anything, { pretty = false } = {}) => {
        const indentation = " ".repeat(4);
        const tokenStack = [{ type: "value", value: anything, indentationLevel: 0 }];
        let result = "";
        while (tokenStack.length > 0) {
            const current = tokenStack.pop();
            if (current["type"] === "raw") {
                result += current["value"];
                continue;
            }
            const currentValue = current["value"];
            const currentIndentationLevel = current["indentationLevel"];
            const currentValueType = getType(currentValue);
            if (currentValueType === AnyType["Undefined"]) {
                result += "undefined";
                continue;
            }
            if (currentValueType === AnyType["Null"]) {
                result += "null";
                continue;
            }
            if (currentValueType === AnyType["String"]) {
                result += ["\"", String(currentValue), "\""].join("");
                continue;
            }
            if ((currentValueType === AnyType["Int"]) || (currentValueType === AnyType["Float"]) || (currentValueType === AnyType["Boolean"])) {
                result += String(currentValue);
                continue;
            }
            if (currentValueType === AnyType["Function"]) {
                result += currentValue.toString();
                continue;
            }
            if (currentValueType === AnyType["PythonLikeList"]) {
                if (currentValue.length === 0) {
                    result += "[]";
                    continue;
                }
                const childIndentationLevel = (currentIndentationLevel + 1);
                tokenStack.push({
                    type: "raw",
                    value: ((pretty === true) ? ["\n", indentation.repeat(currentIndentationLevel), "]"].join("") : "]"),
                    indentationLevel: currentIndentationLevel
                });
                for (let i = (currentValue.length - 1); (i >= 0); i -= 1) {
                    tokenStack.push({
                        type: "value",
                        value: currentValue[i],
                        indentationLevel: childIndentationLevel
                    });
                    if (i > 0) {
                        tokenStack.push({
                            type: "raw",
                            value: ((pretty === true) ? [",\n", indentation.repeat(childIndentationLevel)].join("") : ", "),
                            indentationLevel: childIndentationLevel
                        });
                    }
                }
                tokenStack.push({
                    type: "raw",
                    value: ((pretty === true) ? (["[\n", indentation.repeat(childIndentationLevel)].join("")) : "["),
                    indentationLevel: childIndentationLevel
                });
                continue;
            }
            if (currentValueType === AnyType["PythonLikeDict"]) {
                const objectEntries = Object.entries(currentValue);
                if (objectEntries.length === 0) {
                    result += "{}";
                    continue;
                }
                const childIndentationLevel = (currentIndentationLevel + 1);
                tokenStack.push({
                    type: "raw",
                    value: ((pretty === true) ? (["\n", indentation.repeat(currentIndentationLevel), "}"].join("")) : " }"),
                    indentationLevel: currentIndentationLevel
                });
                for (let i = objectEntries.length - 1; i >= 0; i -= 1) {
                    const [objectKey, objectValue] = objectEntries[i];
                    tokenStack.push({
                        type: "value",
                        value: objectValue,
                        indentationLevel: childIndentationLevel
                    });
                    tokenStack.push({
                        type: "raw",
                        value: ["\"", objectKey, "\": "].join(""),
                        indentationLevel: childIndentationLevel
                    });
                    if (i > 0) {
                        tokenStack.push({
                            type: "raw",
                            value: ((pretty === true) ? ([",\n", indentation.repeat(childIndentationLevel)].join("")) : ", "),
                            indentationLevel: childIndentationLevel
                        });
                    }
                }
                tokenStack.push({
                    type: "raw",
                    value: ((pretty === true) ? (["{\n", indentation.repeat(childIndentationLevel)].join("")) : "{ "),
                    indentationLevel: childIndentationLevel
                });
                continue;
            }
            result += String(currentValue);
        }
        return result;
    };
    const getIsStringIsoEightSixZeroOne = (anything) => ((getIsString(anything) === false) ? false : ((new RegExp(`^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$`, "g").test(anything) === false) ? false : ((dateParsedFromString) => ((getIsNumeric(dateParsedFromString.getTime()) === false) ? false : (dateParsedFromString.toISOString().replace(new RegExp(`\.000Z$`, "g"), "Z") === anything)))(new Date(anything))));
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
    const createRecursiveFunctionNoCallStackLimit = (callbackFunctionWrapper) => ((self = (...restArguments) => () => callbackFunction(...restArguments), callbackFunction = callbackFunctionWrapper(self)) => createRecursiveFunctionNoCallStackLimitInner(callbackFunction))();
    const factorial = (anything) => ((getIsInt(anything) === false) ? ["Error: Argument should be any non-negative integer", null] : (anything < 0) ? ["Error: Argument should be >= 0", null] : (anything === 0) ? [null, 1] : [null, (createRecursiveFunctionNoCallStackLimit((self) => ((anyInt, accumulator) => ((anyInt === 0) ? accumulator : self((anyInt - 1), (anyInt * accumulator))))))(anything, 1)]);
    const replaceAnyLineBreak = (inputString, separator = " ") => (inputString.replace(new RegExp("\\s*(?:\\r\\n|\\r|\\n|\\u2028|\\u2029)+\\s*", "g"), separator).trim());
    const safeGetObjectProperty = (rootObject, methodChain) => ((typeof rootObject === "undefined") ? false : (methodChain.split(".").slice(1).reduce((currentResult, currentProperty) => ((currentResult && (currentProperty in currentResult)) ? currentResult[currentProperty] : undefined), rootObject)))
    const getIsMethodAvailable = (rootObject, methodChain) => (typeof safeGetObjectProperty(rootObject, methodChain) === "function");
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
        const dateObject = ((anythingType === AnyType["String"]) ? new Date(anything) : anything);
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
    const getIsRgbHexColorLightLuminance = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16) / 255), (parseInt(rgbString.slice(2, 4), 16) / 255), (parseInt(rgbString.slice(4, 6), 16) / 255)])), (([r, g, b]) => (pipe(((0.2126 * r) + (0.7152 * g) + (0.0722 * b)), ((luminance) => (luminance > 0.5)))))));
    const getIsRgbHexColorLightYiq = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16)), (parseInt(rgbString.slice(2, 4), 16)), (parseInt(rgbString.slice(4, 6), 16))])), (([r, g, b]) => (pipe((((r * 299) + (g * 587) + (b * 114)) / 1000), ((yiq) => (yiq >= 128)))))));
    const getIsRgbHexColorLightAverage = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16)), (parseInt(rgbString.slice(2, 4), 16)), parseInt(rgbString.slice(4, 6), 16)])), (([r, g, b]) => (pipe(((r + g + b) / 3), ((average) => (average > 127.5)))))));
    const getIsRgbHexColorLightHsl = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(parseInt(rgbString.slice(0, 2), 16) / 255), (parseInt(rgbString.slice(2, 4), 16) / 255), (parseInt(rgbString.slice(4, 6), 16) / 255)])), (([r, g, b]) => ([(Math.max(r, g, b)), (Math.min(r, g, b))])), (([max, min]) => (pipe(((max + min) / 2), ((l) => (l > 0.5)))))));
    const ColorLightnessMethod = {
        "Luminance": getIsRgbHexColorLightLuminance,
        "Yiq": getIsRgbHexColorLightYiq,
        "Average": getIsRgbHexColorLightAverage,
        "Hsl": getIsRgbHexColorLightHsl,
        "Default": getIsRgbHexColorLightLuminance,
    };
    const getIsRgbHexColorLight = (anyString) => (ColorLightnessMethod["Default"](anyString));
    const getValidRgbHexColor = (anything) => ((!anything) ? null : (((rgbHexColor) => ((!(new RegExp("^#?[0-9a-fA-F]{3,6}$", "g").test(rgbHexColor))) ? null : ((!rgbHexColor.startsWith("#")) ? (`#${rgbHexColor}`) : rgbHexColor)))(anything.trim())));
    const getInvertedRgbHexColorByParsePerChannel = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => ([(255 - (parseInt(rgbString.slice(0, 2), 16))), (255 - (parseInt(rgbString.slice(2, 4), 16))), (255 - (parseInt(rgbString.slice(4, 6), 16)))])), (([r, g, b]) => (`#${[r, g, b].map((rgbDigit) => (rgbDigit).toString(16).padStart(2, "0")).join("")}`))));
    const getInvertedRgbHexColorByBitwiseXor = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => (`#${(0xFFFFFF ^ parseInt(rgbString, 16)).toString(16).padStart(6, "0")}`))));
    const getInvertedRgbHexColorByBigInt = (anyString) => (pipe((getSixDigitRgbStringFromThreeDigitRgbString(anyString)), ((rgbString) => (`#${(0xFFFFFFn ^ BigInt(rgbString)).toString(16).padStart(6, "0")}`))));
    const getInvertedRgbHexColorFromString = (anyString) => getInvertedRgbHexColorByParsePerChannel(anyString);
    const getColorFromString = (anyString) => (((rgbHexColorBackground) => ({ backgroundColor: rgbHexColorBackground, textColor: getInvertedRgbHexColorFromString(rgbHexColorBackground), isBackgroundColorLight: getIsRgbHexColorLight(rgbHexColorBackground) }))(getRgbHexColorFromString(anyString)));
    const infinityLoop = (callbackFunction = (() => (undefined))) => {
        while (true) {
            const { isBreak, isContinue } = (callbackFunction() || {});
            if (isBreak === true) break;
            if (isContinue === true) continue;
        }
    };
    const forEach = (anyIterable, callbackFunction = ((anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => {
        let anyIterableItemIndex = 0;
        for (const anyIterableItem of anyIterable) {
            const { isBreak, isContinue } = (callbackFunction(anyIterableItem, anyIterableItemIndex, anyIterable) || {});
            if (isBreak === true) break;
            anyIterableItemIndex += 1;
            if (isContinue === true) continue;
        }
    };
    const forEachOneLiner = (anyIterable, callbackFunction = ((anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => (((anyIterator, innerFunction = ((anyIterableItemIndex = 0) => (((step) => (((!step.done) ? ((callbackFunction(step.value, anyIterableItemIndex, anyIterable) === true) ? undefined : innerFunction(anyIterableItemIndex + 1)) : undefined)))(anyIterator.next())))) => (innerFunction(0)))(anyIterable[Symbol.iterator]()));
    const forEachAsync = async (anyIterable, callbackFunctionAsync = (async (anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => {
        let anyIterableItemIndex = 0;
        for (const anyIterableItem of anyIterable) {
            const { isBreak, isContinue } = (await callbackFunctionAsync(anyIterableItem, anyIterableItemIndex, anyIterable) || {});
            if (isBreak === true) break;
            anyIterableItemIndex += 1;
            if (isContinue === true) continue;
        }
    };
    const forEachAsyncOneLiner = async (anyIterable, callbackFunctionAsync = (async (anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => (((anyIterator, innerFunction = ((anyIterableItemIndex = 0) => ((async (step) => (((!step.done) ? (((await callbackFunctionAsync(step.value, anyIterableItemIndex, anyIterable)) === true) ? undefined : innerFunction(anyIterableItemIndex + 1)) : undefined)))(anyIterator.next())))) => (innerFunction(0)))(anyIterable[Symbol.iterator]()));
    const forLoop = ({ start, stop, step }, callbackFunction = ((anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => ([(forEach(rangeInclusive(start, stop, step), callbackFunction)), undefined].at(-1));
    const forLoopAsync = async ({ start, stop, step }, callbackFunctionAsync = (async (anyIterableItem, anyIterableItemIndex, anyIterable) => (undefined))) => ([(await forEachAsync(rangeInclusive(start, stop, step), callbackFunctionAsync)), undefined].at(-1));
    const catchAnyError = (asyncFunction, callbackFunction = ((anyResult) => (anyResult))) => (asyncFunction.then((anyResult) => ([null, callbackFunction(anyResult)])).catch((anyError) => ([anyError, null])));
    const getRandomString = (minLength = 2, maxLength = 10) => ((({ characters, lengthRandomString }) => (Array.from({ length: lengthRandomString }, () => (characters[Math.floor(Math.random() * characters.length)])).join("")))({ characters: "abcdefghijklmnopqrstuvwxyz", lengthRandomString: (Math.floor(Math.random() * (maxLength - 1)) + minLength) }));

    return {
        AnyType,
        getIsUndefined,
        getIsNull,
        getIsBoolean,
        getIsString,
        getIsNumeric,
        getIsInt,
        getIsFloat,
        getIsPythonLikeList,
        getIsPythonLikeDict,
        getIsFunction,
        getType,
        jsonStringify,
        getIsStringIsoEightSixZeroOne,
        regexPattern,
        createRecursiveFunctionNoCallStackLimitInner,
        createRecursiveFunctionNoCallStackLimit,
        factorial,
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
        pipe,
        pipeOneLiner,
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
        getIsRgbHexColorLightLuminance,
        getIsRgbHexColorLightYiq,
        getIsRgbHexColorLightAverage,
        getIsRgbHexColorLightHsl,
        getIsRgbHexColorLight,
        getValidRgbHexColor,
        infinityLoop,
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
        getIsMethodAvailable,
        increment,
    };
});
