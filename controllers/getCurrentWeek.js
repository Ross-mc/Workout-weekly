const moment = require("moment");

const getCurrentWeek = () => {
    const weekStart = moment().startOf('week');
  
    const days = [];
    for (let i = 1; i <= 8; i++) {
      days.push(moment(weekStart).add(i, 'days'));
    }

    const startOfWeek = moment(days[0]).unix();
    const endOfWeek = moment(days[7]).unix();
    return {
        startOfWeek,
        endOfWeek
    }
};

module.exports = getCurrentWeek;