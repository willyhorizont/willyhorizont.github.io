(function (root, factory) {
    if ((typeof module === "object") && module.exports) {
        // Node.js
        module.exports = factory(root);
    } else {
        // Browser
        root.WillyHorizont = (root.WillyHorizont || {});
        root.WillyHorizont.UtilsDate = factory(root);
    }
})(((typeof globalThis !== "undefined") ? globalThis : this), function (root) {
    const ONE_SECOND_IN_MILLISECOND = 1000;
    const ONE_MINUTE_IN_SECOND = 60;
    const ONE_MINUTE_IN_MILLISECOND = (ONE_MINUTE_IN_SECOND * ONE_SECOND_IN_MILLISECOND);
    const ONE_HOUR_IN_MINUTE = 60;
    const ONE_HOUR_IN_SECOND = (ONE_HOUR_IN_MINUTE * ONE_MINUTE_IN_SECOND);
    const ONE_HOUR_IN_MILLISECOND = (ONE_HOUR_IN_SECOND * ONE_SECOND_IN_MILLISECOND);
    const ONE_DAY_IN_HOUR = 24;
    const ONE_DAY_IN_MINUTE = (ONE_DAY_IN_HOUR * ONE_HOUR_IN_MINUTE);
    const ONE_DAY_IN_SECOND = (ONE_DAY_IN_MINUTE * ONE_MINUTE_IN_SECOND);
    const ONE_DAY_IN_MILLISECOND = (ONE_DAY_IN_SECOND * ONE_SECOND_IN_MILLISECOND);

    const dictionaryDay = {
        "ENG": {
            "short": {
                "Mon": "Mon",
                "Tue": "Tue",
                "Wed": "Wed",
                "Thu": "Thu",
                "Fri": "Fri",
                "Sat": "Sat",
                "Sun": "Sun",
            },
            "long": {
                "Mon": "Monday",
                "Tue": "Tuesday",
                "Wed": "Wednesday",
                "Thu": "Thursday",
                "Fri": "Friday",
                "Sat": "Saturday",
                "Sun": "Sunday",
            },
        },
        "IDN": {
            "short": {
                "Mon": "Sen",
                "Tue": "Sel",
                "Wed": "Rab",
                "Thu": "Kam",
                "Fri": "Jum",
                "Sat": "Sab",
                "Sun": "Min",
            },
            "long": {
                "Mon": "Senin", 
                "Tue": "Selasa", 
                "Wed": "Rabu", 
                "Thu": "Kamis", 
                "Fri": "Jumat", 
                "Sat": "Sabtu",
                "Sun": "Minggu", 
            },
        },
    };

    const dictionaryMonth = {
        "ENG": {
            "short": {
                "Jan": "Jan",
                "Feb": "Feb",
                "Mar": "Mar",
                "Apr": "Apr",
                "May": "May",
                "Jun": "Jun",
                "Jul": "Jul",
                "Aug": "Aug",
                "Sep": "Sep",
                "Oct": "Oct",
                "Nov": "Nov",
                "Dec": "Dec",
            },
            "long": {
                "Jan": "January",
                "Feb": "February",
                "Mar": "March",
                "Apr": "April",
                "May": "May",
                "Jun": "June",
                "Jul": "July",
                "Aug": "August",
                "Sep": "September",
                "Oct": "October",
                "Nov": "November",
                "Dec": "December",
            },
        },
        "IDN": {
            "short": {
                "Jan": "Jan",
                "Feb": "Feb",
                "Mar": "Mar",
                "Apr": "Apr",
                "May": "Mei",
                "Jun": "Jun",
                "Jul": "Jul",
                "Aug": "Agu",
                "Sep": "Sep",
                "Oct": "Okt",
                "Nov": "Nov",
                "Dec": "Des",
            },
            "long": {
                "Jan": "Januari",
                "Feb": "Februari",
                "Mar": "Maret",
                "Apr": "April",
                "May": "Mei",
                "Jun": "Juni",
                "Jul": "Juli",
                "Aug": "Agustus",
                "Sep": "September",
                "Oct": "Oktober",
                "Nov": "November",
                "Dec": "Desember",
            },
        },
    };

    const getZeroPaddedMonthByMonthThreeFirstLetter = (monthThreeFirstLetter) => (`${Object.values(dictionaryMonth["ENG"]["short"]).findIndex((m) => (m === monthThreeFirstLetter)) + 1}`).padStart(2, "0");

    const dictionaryZodiacsOrShios = [
        { "name_ENG": "Monkey", "name_IDN": "Monyet", "icon": "🐒" },
        { "name_ENG": "Rooster", "name_IDN": "Ayam", "icon": "🐓" },
        { "name_ENG": "Dog", "name_IDN": "Anjing", "icon": "🐕" },
        { "name_ENG": "Pig", "name_IDN": "Babi", "icon": "🐖" },
        { "name_ENG": "Rat", "name_IDN": "Tikus", "icon": "🐀" },
        { "name_ENG": "Ox", "name_IDN": "Kerbau", "icon": "🐂" },
        { "name_ENG": "Tiger", "name_IDN": "Macan", "icon": "🐅" },
        { "name_ENG": "Rabbit", "name_IDN": "Kelinci", "icon": "🐇" },
        { "name_ENG": "Dragon", "name_IDN": "Naga", "icon": "🐉" },
        { "name_ENG": "Snake", "name_IDN": "Ular", "icon": "🐍" },
        { "name_ENG": "Horse", "name_IDN": "Kuda", "icon": "🐎" },
        { "name_ENG": "Goat", "name_IDN": "Kambing", "icon": "🐐" },
    ];
    const dictionaryZodiacOrShioElements = [
        { "name_ENG": "Metal", "name_IDN": "Logam", "icon": "🔩" },
        { "name_ENG": "Metal", "name_IDN": "Logam", "icon": "🔩" },
        { "name_ENG": "Water", "name_IDN": "Air", "icon": "💧" },
        { "name_ENG": "Water", "name_IDN": "Air", "icon": "💧" },
        { "name_ENG": "Wood", "name_IDN": "Kayu", "icon": "🌳" },
        { "name_ENG": "Wood", "name_IDN": "Kayu", "icon": "🌳" },
        { "name_ENG": "Fire", "name_IDN": "Api", "icon": "🔥" },
        { "name_ENG": "Fire", "name_IDN": "Api", "icon": "🔥" },
        { "name_ENG": "Earth", "name_IDN": "Tanah", "icon": "🌍" },
        { "name_ENG": "Earth", "name_IDN": "Tanah", "icon": "🌍" },
    ];
    const parseYyyyMmDdToUtcDate = (yyyyMmDdString) => {
        const [yearString, monthString, dayString] = yyyyMmDdString.split("-");
        return new Date(Date.UTC(Number(yearString), (Number(monthString) - 1), Number(dayString)));
    };
    const extractDate = (anything) => {
        const anythingType = WillyHorizont.Utils.getType(anything);
        const dateObject = ((anythingType === WillyHorizont.Utils.AnyType["String"]) ? new Date(anything) : ((anythingType === WillyHorizont.Utils.AnyType["Date"]) ? anything : undefined));
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
    const prettyFormatDate = ({ includeSecond = true, includeMiliSecond = false, fullYear, zeroPaddedMonth, monthThreeFirstLetter, zeroPaddedDay, dayThreeFirstLetter, zeroPaddedHourTwelveHourClock, twelveHourClockLatinAbbreviation, zeroPaddedHourTwentyFourHourClock, zeroPaddedMinute, zeroPaddedSecond, zeroPaddedMiliSecondThreeDigit }) => (`(${zeroPaddedMonth}/12 month) | ${dayThreeFirstLetter}, ${zeroPaddedDay} ${monthThreeFirstLetter} ${fullYear} | ${zeroPaddedHourTwentyFourHourClock}:${zeroPaddedMinute}${includeSecond ? `:${zeroPaddedSecond}` : ``}${includeMiliSecond ? `.${zeroPaddedMiliSecondThreeDigit}` : ``} | ${zeroPaddedHourTwelveHourClock}:${zeroPaddedMinute} ${twelveHourClockLatinAbbreviation}`); /* prettyFormatDateV2 */
    const getDayDifferenceInNumeric = (dateDotToIsoStringDotSliceZeroCommaTenNewer, dateDotToIsoStringDotSliceZeroCommaTenOlder) => (((new Date(dateDotToIsoStringDotSliceZeroCommaTenNewer) - new Date(dateDotToIsoStringDotSliceZeroCommaTenOlder)) / ONE_DAY_IN_MILLISECOND) - 1);
    const getYyyyMinusMmMinusDdOfDateObject = (dateObject) => {
        const newDateObject = new Date(dateObject.getTime());
        const { fullYear, zeroPaddedMonth, zeroPaddedDay } = extractDate(newDateObject);
        return (`${fullYear}-${zeroPaddedMonth}-${zeroPaddedDay}`);
    }
    const addOrSubtractDay = (dateObject, integerVariable) => {
        const newDateObject = new Date(dateObject.getTime());
        newDateObject.setUTCDate(newDateObject.getUTCDate() + integerVariable);
        return newDateObject;
    };
    const updateDateDotToIsoStringDotSliceZeroCommaTenByNumericVariable = (dateDotToIsoStringDotSliceZeroCommaTen = "2026-01-01", numericVariable) => {
        const newDateObject = new Date(dateDotToIsoStringDotSliceZeroCommaTen);
        const dateDotToIsoStringDotSliceZeroCommaTenUpdated = addOrSubtractDay(newDateObject, numericVariable);
        return getYyyyMinusMmMinusDdOfDateObject(dateDotToIsoStringDotSliceZeroCommaTenUpdated);
    };
    const YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 2025; // Tahun Baru Masehi 2025
    const YEAR_SAKA_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 1947; // Hari Suci Nyepi (Tahun Baru Saka 1947)
    const YEAR_CHINESE_LUNAR_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 2576; // Tahun Baru Imlek 2576 Kongzili
    const YEAR_BUDDHIST_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 2569; // Hari Raya Waisak 2569 Buddhist Era
    const YEAR_INDONESIA_INDEPENDENCE_PROCLAMATION_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 80; // Hari Proklamasi Kemerdekaan R.I. ke - 80
    const convertYearAnnoDominiGregorianToSaka = (yearAnnoDominiGregorianNumeric) => (YEAR_SAKA_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN + (yearAnnoDominiGregorianNumeric - YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN));
    const convertYearAnnoDominiGregorianToChineseLunar = (yearAnnoDominiGregorianNumeric) => (YEAR_CHINESE_LUNAR_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN + (yearAnnoDominiGregorianNumeric - YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN));
    const convertYearAnnoDominiGregorianToBuddhist = (yearAnnoDominiGregorianNumeric) => (YEAR_BUDDHIST_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN + (yearAnnoDominiGregorianNumeric - YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN));
    const convertYearAnnoDominiGregorianToIndonesiaIndependenceProclamation = (yearAnnoDominiGregorianNumeric) => (YEAR_INDONESIA_INDEPENDENCE_PROCLAMATION_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN + (yearAnnoDominiGregorianNumeric - YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN));
    const getChineseZodiacOrShio = (yearAnnoDominiGregorianNumeric) => (dictionaryZodiacsOrShios[yearAnnoDominiGregorianNumeric % 12]);
    const getChineseZodiacOrShioWithElement = (yearAnnoDominiGregorianNumeric) => (dictionaryZodiacOrShioElements[yearAnnoDominiGregorianNumeric.toString().at(-1)]);

    const HIJRIAH_TABULAR_CYCLE_YEAR_COUNT = 30;
    const HIJRIAH_TABULAR_CYCLE_LEAP_YEAR_COUNT = 11;
    const HIJRIAH_TABULAR_CYCLE_LEAP_CONFIGURATION_VARIANT_DEFAULT_KEY = "fazari_or_khwarizmi_or_battani_or_toledan_or_alfonsine_or_microsoft_kuwaiti";
    const HIJRIAH_TABULAR_CYCLE_LEAP_CONFIGURATION_VARIANT = {
        [HIJRIAH_TABULAR_CYCLE_LEAP_CONFIGURATION_VARIANT_DEFAULT_KEY]: [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29],
        "fifteenth_instead_of_sixteenth": [2, 5, 7, 10, 13, 15, 18, 21, 24, 26, 29],
        "tayyibi_like": [2, 5, 8, 10, 13, 16, 19, 21, 24, 27, 29],
        "thirtieth_year_variant": [2, 5, 8, 11, 13, 16, 19, 21, 24, 27, 30],
    };
    const HIJRIAH_TABULAR_CYCLE_LEAP_CONFIGURATION = HIJRIAH_TABULAR_CYCLE_LEAP_CONFIGURATION_VARIANT[HIJRIAH_TABULAR_CYCLE_LEAP_CONFIGURATION_VARIANT_DEFAULT_KEY];
    const HIJRIAH_HOLIDAY = {
        "Isra Mikraj": {
            name: "Isra Mikraj",
            references: [
                {
                    gregorianDate: `2026-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Jan"])}-16`,
                    hijriahYear: 1447,
                },
                {
                    gregorianDate: `2025-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Jan"])}-27`,
                    hijriahYear: 1446,
                },
                {
                    gregorianDate: `2023-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Feb"])}-18`,
                    hijriahYear: 1444,
                },
                {
                    gregorianDate: `2022-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Feb"])}-28`,
                    hijriahYear: 1443,
                },
            ],
        },
        "Idul Fitri": {
            name: "Idul Fitri",
            references: [
                {
                    gregorianDate: `2026-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Mar"])}-21`,
                    hijriahYear: 1447,
                },
                {
                    gregorianDate: `2025-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Mar"])}-31`,
                    hijriahYear: 1446,
                },
                {
                    gregorianDate: `2023-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Apr"])}-22`,
                    hijriahYear: 1444,
                },
                {
                    gregorianDate: `2022-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["May"])}-02`,
                    hijriahYear: 1443,
                },
            ],
        },
        "Idul Adha": {
            name: "Idul Adha",
            references: [
                {
                    gregorianDate: `2026-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["May"])}-27`,
                    hijriahYear: 1447,
                },
                {
                    gregorianDate: `2025-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Jun"])}-06`,
                    hijriahYear: 1446,
                },
                {
                    gregorianDate: `2023-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Jun"])}-29`,
                    hijriahYear: 1444,
                },
                {
                    gregorianDate: `2022-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Jul"])}-09`,
                    hijriahYear: 1443,
                },
            ],
        },
        "Satu Muharam / Tahun Baru Hijriah": {
            name: "Satu Muharam / Tahun Baru Hijriah",
            references: [
                {
                    gregorianDate: `2026-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Jun"])}-16`,
                    hijriahYear: 1448,
                },
                {
                    gregorianDate: `2025-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Jun"])}-27`,
                    hijriahYear: 1447,
                },
                {
                    gregorianDate: `2023-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Jul"])}-19`,
                    hijriahYear: 1445,
                },
                {
                    gregorianDate: `2022-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Jul"])}-30`,
                    hijriahYear: 1444,
                },
            ],
        },
        "Maulid Nabi": {
            name: "Maulid Nabi",
            references: [
                {
                    gregorianDate: `2026-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Aug"])}-25`,
                    hijriahYear: 1448,
                },
                {
                    gregorianDate: `2025-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Sep"])}-05`,
                    hijriahYear: 1447,
                },
                {
                    gregorianDate: `2023-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Sep"])}-28`,
                    hijriahYear: 1445,
                },
                {
                    gregorianDate: `2022-${getZeroPaddedMonthByMonthThreeFirstLetter(dictionaryMonth["ENG"]["short"]["Oct"])}-08`,
                    hijriahYear: 1444,
                },
            ],
        },
    };
    const getCycleYear = (hijriahYear) => (((hijriahYear - 1) % HIJRIAH_TABULAR_CYCLE_YEAR_COUNT) + 1);
    const checkIsHijriahLeapYear = (hijriahYear, hijriahTabularCycleLeapPosition = HIJRIAH_TABULAR_CYCLE_LEAP_CONFIGURATION) => {
        if (hijriahTabularCycleLeapPosition.length !== HIJRIAH_TABULAR_CYCLE_LEAP_YEAR_COUNT) throw new Error("Invalid Hijriah tabular cycle leap configuration.");
        return (hijriahTabularCycleLeapPosition.includes(getCycleYear(hijriahYear)));
    };
    const getHijriahYearLengthInDays = (hijriahYear) => (checkIsHijriahLeapYear(hijriahYear) ? 355 : 354);
    const estimateHijriahHoliday = ({ hijriahHolidayName, targetGregorianYearInt }) => {
        const { gregorianDate: referenceGregorianDate, hijriahYear: referenceHijriahYear } = HIJRIAH_HOLIDAY[hijriahHolidayName]["references"][1];
        const referenceGregorianDateData = extractDate(referenceGregorianDate);
        const referenceGregorianYearInt = parseInt(referenceGregorianDateData["fullYear"], 10);
        const gregorianYearDifference = WillyHorizont.Utils.getNumberDifferenceInNumeric(targetGregorianYearInt, referenceGregorianYearInt); 
        const hijriahYearEstimation = (referenceHijriahYear + gregorianYearDifference);
        const gregorianReferenceDateObject = parseYyyyMmDdToUtcDate(referenceGregorianDate);
        if (hijriahYearEstimation === referenceHijriahYear) {
            return ({
                hijriahHolidayName,
                targetGregorianYearInt,
                referenceHijriahYear,
                referenceGregorianDate,
                hijriahYearEstimation,
                gregorianEstimationDate: getYyyyMinusMmMinusDdOfDateObject(gregorianReferenceDateObject),
            });
        }
        let totalDaysToAdd = 0;
        if (hijriahYearEstimation > referenceHijriahYear) {
            for (let hijriahYear = referenceHijriahYear; (hijriahYear < hijriahYearEstimation); hijriahYear += 1) {
                totalDaysToAdd += getHijriahYearLengthInDays(hijriahYear);
            }
            return ({
                hijriahHolidayName,
                targetGregorianYearInt,
                referenceHijriahYear,
                referenceGregorianDate,
                hijriahYearEstimation,
                gregorianEstimationDate: getYyyyMinusMmMinusDdOfDateObject(addOrSubtractDay(gregorianReferenceDateObject, totalDaysToAdd)),
            });
        }
        for (let hijriahYear = hijriahYearEstimation; (hijriahYear < referenceHijriahYear); hijriahYear += 1) {
            totalDaysToAdd += getHijriahYearLengthInDays(hijriahYear);
        }
        return ({
            hijriahHolidayName,
            targetGregorianYearInt,
            referenceHijriahYear,
            referenceGregorianDate,
            hijriahYearEstimation,
            gregorianEstimationDate: getYyyyMinusMmMinusDdOfDateObject(addOrSubtractDay(gregorianReferenceDateObject, -totalDaysToAdd)),
        });
    };

    const getGregorianEasterDate = (gregorianYearInt) => {
        // Step 1: Golden Number / Metonic cycle
        const metonicCycleRemainder = (gregorianYearInt % 19);

        // Step 2: Gregorian century components
        const century = Math.floor(gregorianYearInt / 100);
        const yearWithinCentury = (gregorianYearInt % 100);
        const leapCenturyCorrection = Math.floor(century / 4);
        const centuryRemainder = (century % 4);

        // Step 3: Gregorian moon corrections
        const moonCorrectionFactor = Math.floor((century + 8) / 25);
        const gregorianMoonShiftCorrection = Math.floor((century - moonCorrectionFactor + 1) / 3);

        // Step 4: Paschal full moon offset
        const paschalFullMoonOffset = (((19 * metonicCycleRemainder) + century - leapCenturyCorrection - gregorianMoonShiftCorrection + 15) % 30);

        // Step 5: Weekday corrections
        const leapYearWithinCenturyCorrection = Math.floor(yearWithinCentury / 4);
        const yearWithinCenturyRemainder = (yearWithinCentury % 4);
        const weekdayOffset = ((32 + (2 * centuryRemainder) + (2 * leapYearWithinCenturyCorrection) - paschalFullMoonOffset - yearWithinCenturyRemainder) % 7);

        // Step 6: Final Easter correction
        const easterMonthCorrection = Math.floor((metonicCycleRemainder + (11 * paschalFullMoonOffset) + (22 * weekdayOffset)) / 451);

        // Step 7: Extract final month/day
        const easterMonth = Math.floor((paschalFullMoonOffset + weekdayOffset - (7 * easterMonthCorrection) + 114) / 31);
        const easterDay = (((paschalFullMoonOffset + weekdayOffset - (7 * easterMonthCorrection) + 114) % 31) + 1);

        return new Date(Date.UTC(gregorianYearInt, (easterMonth - 1), easterDay));
    };

    return {
        ONE_SECOND_IN_MILLISECOND,
        ONE_MINUTE_IN_SECOND,
        ONE_MINUTE_IN_MILLISECOND,
        ONE_HOUR_IN_MINUTE,
        ONE_HOUR_IN_SECOND,
        ONE_HOUR_IN_MILLISECOND,
        ONE_DAY_IN_HOUR,
        ONE_DAY_IN_MINUTE,
        ONE_DAY_IN_SECOND,
        ONE_DAY_IN_MILLISECOND,
        dictionaryDay,
        dictionaryMonth,
        dictionaryZodiacsOrShios,
        dictionaryZodiacOrShioElements,
        getZeroPaddedMonthByMonthThreeFirstLetter,
        parseYyyyMmDdToUtcDate,
        addOrSubtractDay,
        extractDate,
        prettyFormatDate,
        getYyyyMinusMmMinusDdOfDateObject,
        updateDateDotToIsoStringDotSliceZeroCommaTenByNumericVariable,
        YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_SAKA_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_CHINESE_LUNAR_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_BUDDHIST_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_INDONESIA_INDEPENDENCE_PROCLAMATION_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        convertYearAnnoDominiGregorianToSaka,
        convertYearAnnoDominiGregorianToChineseLunar,
        convertYearAnnoDominiGregorianToBuddhist,
        convertYearAnnoDominiGregorianToIndonesiaIndependenceProclamation,
        getChineseZodiacOrShio,
        getChineseZodiacOrShioWithElement,
        getDayDifferenceInNumeric,
        HIJRIAH_HOLIDAY,
        estimateHijriahHoliday,
        getGregorianEasterDate,
    };
});
