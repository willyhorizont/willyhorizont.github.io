window.UtilsDate = ((() => {
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
                "Sun": "Sun",
                "Mon": "Mon",
                "Tue": "Tue",
                "Wed": "Wed",
                "Thu": "Thu",
                "Fri": "Fri",
                "Sat": "Sat",
            },
            "long": {
                "Sun": "Sunday",
                "Mon": "Monday",
                "Tue": "Tuesday",
                "Wed": "Wednesday",
                "Thu": "Thursday",
                "Fri": "Friday",
                "Sat": "Saturday",
            },
        },
        "IDN": {
            "short": {
                "Sun": "Min",
                "Mon": "Sen",
                "Tue": "Sel",
                "Wed": "Rab",
                "Thu": "Kam",
                "Fri": "Jum",
                "Sat": "Sab",
            },
            "long": {
                "Sun": "Minggu", 
                "Mon": "Senin", 
                "Tue": "Selasa", 
                "Wed": "Rabu", 
                "Thu": "Kamis", 
                "Fri": "Jumat", 
                "Sat": "Sabtu",
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
                "January": "January",
                "February": "February",
                "March": "March",
                "April": "April",
                "May": "May",
                "June": "June",
                "July": "July",
                "August": "August",
                "September": "September",
                "October": "October",
                "November": "November",
                "December": "December",
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
    const getDateOfDateDotToIsoStringDotSliceZeroCommaTen = (dateDotToIsoStringDotSliceZeroCommaTen = "2026-01-01") => new Date(`${dateDotToIsoStringDotSliceZeroCommaTen}T00:00:00`);
    const getDayInNumericOfDateDotToIsoStringDotSliceZeroCommaTen = (dateDotToIsoStringDotSliceZeroCommaTen = "2026-01-01") => (getDateOfDateDotToIsoStringDotSliceZeroCommaTen(dateDotToIsoStringDotSliceZeroCommaTen).getDate());
    const getMonthInNumericOfDateDotToIsoStringDotSliceZeroCommaTen = (dateDotToIsoStringDotSliceZeroCommaTen = "2026-01-01") => ((getDateOfDateDotToIsoStringDotSliceZeroCommaTen(dateDotToIsoStringDotSliceZeroCommaTen).getMonth() + 1));
    const getYearInNumericOfDateDotToIsoStringDotSliceZeroCommaTen = (dateDotToIsoStringDotSliceZeroCommaTen = "2026-01-01") => (getDateOfDateDotToIsoStringDotSliceZeroCommaTen(dateDotToIsoStringDotSliceZeroCommaTen).getFullYear());
    const getMonthLengthInNumericOfDateDotToIsoStringDotSliceZeroCommaTen = (dateDotToIsoStringDotSliceZeroCommaTen = "2026-01-01") => ((({ anyDate }) => (new Date(anyDate.getFullYear(), (anyDate.getMonth() + 1), 0).getDate()))({ anyDate: new Date(dateDotToIsoStringDotSliceZeroCommaTen) }));
    const updateDateDotToIsoStringDotSliceZeroCommaTenByNumericVariable = (dateDotToIsoStringDotSliceZeroCommaTen = "2026-01-01", numericVariable) => (((dateDotToIsoStringDotSliceZeroCommaTenParsedToDate) => (((dateDotToIsoStringDotSliceZeroCommaTenParsedToDateClone) => ([(dateDotToIsoStringDotSliceZeroCommaTenParsedToDateClone.setDate(dateDotToIsoStringDotSliceZeroCommaTenParsedToDateClone.getDate() + numericVariable)), (`${dateDotToIsoStringDotSliceZeroCommaTenParsedToDateClone.getFullYear()}-${String(dateDotToIsoStringDotSliceZeroCommaTenParsedToDateClone.getMonth() + 1).padStart(2, "0")}-${String(dateDotToIsoStringDotSliceZeroCommaTenParsedToDateClone.getDate()).padStart(2, "0")}`)].at(-1)))(new Date(dateDotToIsoStringDotSliceZeroCommaTenParsedToDate))))(new Date(dateDotToIsoStringDotSliceZeroCommaTen)));
    const YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 2025; // Tahun Baru Masehi 2025
    const YEAR_EID_AL_FITR_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 1446; // Idul Fitri 1 Syawal 1446 Hijriah
    const YEAR_HIJRIAH_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 1447; // Satu Muharam / Tahun Baru Hijriah 1 Muharam 1447 Hijriah
    const YEAR_SAKA_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 1947; // Hari Suci Nyepi (Tahun Baru Saka 1947)
    const YEAR_CHINESE_LUNAR_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 2576; // Tahun Baru Imlek 2576 Kongzili
    const YEAR_BUDDHIST_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 2569; // Hari Raya Waisak 2569 Buddhist Era
    const YEAR_INDONESIA_INDEPENDENCE_PROCLAMATION_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN = 80; // Hari Proklamasi Kemerdekaan R.I. ke - 80
    const convertYearAnnoDominiGregorianToHijriah = (yearAnnoDominiGregorianNumeric) => (Math.round(YEAR_HIJRIAH_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN + ((yearAnnoDominiGregorianNumeric - YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN) * (33 / 32))));
    const convertYearAnnoDominiGregorianToSaka = (yearAnnoDominiGregorianNumeric) => (YEAR_SAKA_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN + (yearAnnoDominiGregorianNumeric - YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN));
    const convertYearAnnoDominiGregorianToChineseLunar = (yearAnnoDominiGregorianNumeric) => (YEAR_CHINESE_LUNAR_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN + (yearAnnoDominiGregorianNumeric - YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN));
    const convertYearAnnoDominiGregorianToBuddhist = (yearAnnoDominiGregorianNumeric) => (YEAR_BUDDHIST_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN + (yearAnnoDominiGregorianNumeric - YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN));
    const convertYearAnnoDominiGregorianToIndonesiaIndependenceProclamation = (yearAnnoDominiGregorianNumeric) => (YEAR_INDONESIA_INDEPENDENCE_PROCLAMATION_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN + (yearAnnoDominiGregorianNumeric - YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN));
    const getChineseZodiacOrShio = (yearAnnoDominiGregorianNumeric) => (dictionaryZodiacsOrShios[yearAnnoDominiGregorianNumeric % 12]);
    const getChineseZodiacOrShioWithElement = (yearAnnoDominiGregorianNumeric) => (dictionaryZodiacOrShioElements[yearAnnoDominiGregorianNumeric.toString().at(-1)]);
    const getDayDifferenceInNumeric = (dateDotToIsoStringDotSliceZeroCommaTenEnd, dateDotToIsoStringDotSliceZeroCommaTenStart) => (((new Date(dateDotToIsoStringDotSliceZeroCommaTenEnd) - new Date(dateDotToIsoStringDotSliceZeroCommaTenStart)) / UtilsDate.ONE_DAY_IN_MILLISECOND) - 1);

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
        getDateOfDateDotToIsoStringDotSliceZeroCommaTen,
        getDayInNumericOfDateDotToIsoStringDotSliceZeroCommaTen,
        getMonthInNumericOfDateDotToIsoStringDotSliceZeroCommaTen,
        getYearInNumericOfDateDotToIsoStringDotSliceZeroCommaTen,
        getMonthLengthInNumericOfDateDotToIsoStringDotSliceZeroCommaTen,
        updateDateDotToIsoStringDotSliceZeroCommaTenByNumericVariable,
        YEAR_ANNO_DOMINI_GREGORIAN_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_EID_AL_FITR_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_HIJRIAH_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_SAKA_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_CHINESE_LUNAR_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_BUDDHIST_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        YEAR_INDONESIA_INDEPENDENCE_PROCLAMATION_NUMERIC_IN_2025_ANNO_DOMINI_GREGORIAN,
        convertYearAnnoDominiGregorianToHijriah,
        convertYearAnnoDominiGregorianToSaka,
        convertYearAnnoDominiGregorianToChineseLunar,
        convertYearAnnoDominiGregorianToBuddhist,
        convertYearAnnoDominiGregorianToIndonesiaIndependenceProclamation,
        getChineseZodiacOrShio,
        getChineseZodiacOrShioWithElement,
        getDayDifferenceInNumeric,
    };
})());
