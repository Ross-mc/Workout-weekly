const moment = require("moment");

const getCurrentWeek = () => {
  const weekStart = moment().startOf("week");

  const days = [];
  for (let i = 1; i <= 8; i++) {
    days.push(moment(weekStart).add(i, "days"));
  }
  const daysOfWeek = days.map((day) => {
    return { date: moment(day).format("dddd, MMMM Do YYYY") };
  });
  if (daysOfWeek.length > 7) {
    daysOfWeek.pop()
  }
  const startOfWeek = moment(days[0]).unix();
  const endOfWeek = moment(days[7]).unix();
  return {
    startOfWeek,
    endOfWeek,
    daysOfWeek,
  };
};

module.exports = getCurrentWeek;
