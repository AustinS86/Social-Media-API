const addDateSuffix = (date) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const idx =
    date % 100 > 10 && date % 100 < 14 ? 0 : date % 10 < 4 ? date % 10 : 0;
  return `${date}${suffixes[idx]}`;
};

module.exports = (
  timestamp,
  { monthLength = "short", dateSuffix = true } = {}
) => {
  const dateObj = new Date(timestamp);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const months = monthNames
    .slice(0, 12)
    .concat(monthLength === "short" ? [] : monthNames.slice(12));

  const formattedMonth = months[dateObj.getMonth()];
  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();
  const year = dateObj.getFullYear();
  let hour = dateObj.getHours() % 12 || 12;
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const periodOfDay = dateObj.getHours() >= 12 ? "pm" : "am";

  return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
};
