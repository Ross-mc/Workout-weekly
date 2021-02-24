const moment = require("moment");
const getCurrentWeek = require("./getCurrentWeek");

const getValidEvents = userData => {
    const { startOfWeek, endOfWeek, days } = getCurrentWeek();

    const currentEvents = userData.filter(event => {
      const startOfEvent = moment(event.dataValues.timeStart).unix();
      const endOfEvent = moment(event.dataValues.timeEnd).unix();
      if (startOfEvent > startOfWeek && endOfEvent < endOfWeek){
        return true;
      }
    });

    if (days.length > 7){
        days.pop();
    }


    const daysOfWeekWithEvents = days.map(day => {
      return currentEvents.reduce((acc, event) => {
        if (moment(event.dataValues.timeStart).day() === moment(day).day()){
          acc.events.push(event)
        }
        return acc;
      }, {day: moment(day).format("dddd, MMMM Do YYYY"), events: []})
    })

    daysOfWeekWithEvents.forEach(elem => {
        elem.events = elem.events.map(event => {
            event.dataValues.timeStart = moment(event.dataValues.timeStart).format("hh:mm");
            return event;
        })
    })

    return daysOfWeekWithEvents
}

module.exports = getValidEvents;