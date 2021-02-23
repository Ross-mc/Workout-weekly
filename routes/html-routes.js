// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const getCurrentWeek = require("../controllers/getCurrentWeek");
const moment = require("moment");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // Landing page
    res.render("index", {});
  });

  app.get("/signup", (req, res) => {
    // Landing page
    res.render("signup", {});
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/calendar");
    }
    res.render("login", {});
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/calendar/:id", isAuthenticated, (req, res) => {
    const id = parseInt(req.params.id);
    if (req.user.id !== id){
      res.redirect("/");
    } else {
      
      db.Events.findAll({
        where: {
          user_id: id,
        }
      }).then(userData => {
        const { startOfWeek, endOfWeek, daysOfWeek } = getCurrentWeek();

        const currentEvents = userData.filter(event => {
          const startOfEvent = moment(event.dataValues.timeStart).unix();
          const endOfEvent = moment(event.dataValues.timeEnd).unix();
          if (startOfEvent > startOfWeek && endOfEvent < endOfWeek){
            return true;
          }
        });

        
        

        res.render("calendar", {currentEvents, daysOfWeek});
      })
      
    }
    // to do: call db and get all the user events and pass to hbs as an object

    
  });
};