const INDIAN_HOLIDAYS_BY_YEAR = {
  2026: [
    { date: "2026-01-26", name: "Republic Day" },
    { date: "2026-03-04", name: "Holi" },
    { date: "2026-03-21", name: "Id-ul-Fitr" },
    { date: "2026-03-26", name: "Ram Navami" },
    { date: "2026-03-31", name: "Mahavir Jayanti" },
    { date: "2026-04-03", name: "Good Friday" },
    { date: "2026-05-01", name: "Buddha Purnima" },
    { date: "2026-05-27", name: "Id-ul-Zuha (Bakrid)" },
    { date: "2026-06-26", name: "Muharram" },
    { date: "2026-08-15", name: "Independence Day" },
    { date: "2026-08-26", name: "Milad-un-Nabi" },
    { date: "2026-09-04", name: "Janmashtami" },
    { date: "2026-10-02", name: "Mahatma Gandhi's Birthday" },
    { date: "2026-10-20", name: "Dussehra" },
    { date: "2026-11-08", name: "Diwali" },
    { date: "2026-11-24", name: "Guru Nanak's Birthday" },
    { date: "2026-12-25", name: "Christmas Day" },
  ],
};

const getIndianHolidaysForYear = (year) => INDIAN_HOLIDAYS_BY_YEAR[year] || [];

const getIndianHolidayByDate = (date) => {
  const year = Number(date.split("-")[0]);
  return getIndianHolidaysForYear(year).find((holiday) => holiday.date === date) || null;
};

module.exports = {
  INDIAN_HOLIDAYS_BY_YEAR,
  getIndianHolidaysForYear,
  getIndianHolidayByDate,
};
