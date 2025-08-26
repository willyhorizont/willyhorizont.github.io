const currentYear = new Date().getFullYear();
const getAbcCalendarEventHolidayIndonesiaDataInitial = () => ([
    {
        "summary": "Hari Tahun Baru",
        "start": {
            "date": `${currentYear}-01-01`
        },
        "end": {
            "date": `${currentYear}-01-02`
        }
    },
    {
        "summary": "Hari Buruh Internasional / Pekerja",
        "start": {
            "date": `${currentYear}-05-01`
        },
        "end": {
            "date": `${currentYear}-05-02`
        }
    },
    {
        "summary": "Hari Lahir Pancasila",
        "start": {
            "date": `${currentYear}-06-01`
        },
        "end": {
            "date": `${currentYear}-06-02`
        }
    },
    {
        "summary": "Hari Proklamasi Kemerdekaan R.I.",
        "start": {
            "date": `${currentYear}-08-17`
        },
        "end": {
            "date": `${currentYear}-08-18`
        }
    },
    {
        "summary": "Malam Natal",
        "start": {
            "date": `${currentYear}-12-24`
        },
        "end": {
            "date": `${currentYear}-12-25`
        }
    },
    {
        "summary": "Malam Tahun Baru",
        "start": {
            "date": `${currentYear}-12-31`
        },
        "end": {
            "date": `${currentYear}-01-01`
        }
    }
]);

const kalenderLiburGeneratorDataInitial = {
    getAbcCalendarEventHolidayIndonesiaDataInitial,
};
