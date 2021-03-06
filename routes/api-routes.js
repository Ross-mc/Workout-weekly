// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const getYTVideo = require("../controllers/googleapi");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/api/getVideo", (req, res) => {
    const { categorySelected, durationSelected } = req.query;
    db.YTPlaylists.findAll({
      where: {
        category: categorySelected
      }
      // the api searches our database for all playlists that match the category, we then select one of them randomly, and then call the youtube api.
    }).then(async playlists => {
      const randonNum = Math.floor(Math.random() * playlists.length);
      const selectedPlaylistId = playlists[randonNum].dataValues.playlistId;
      const newVideoArr = await getYTVideo(
        selectedPlaylistId,
        durationSelected
      );
      if (newVideoArr.length === 0){
        res.json("Failed to connect to youtube API");
        return;
      }
      const randonVideoNum = Math.floor(Math.random() * newVideoArr.length);
      const newVideo = newVideoArr[randonVideoNum];
      const videoUrl = `https://www.youtube.com/embed/${newVideo.id}`;
      res.json(videoUrl);
    });
  });
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  app.post("/api/createevent",  (req, res) => {
    console.log('request received')
    const { timeStart, timeEnd, eventName, eventDesc, category } = req.body;
    const user_id = req.body.id;
    db.Events.create({
      timeStart,
      timeEnd,
      eventName,
      eventDesc,
      category,
      user_id
    })
      .then(() => res.json("Success"))

  })

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.delete("/api/delete/:id/:user_id", (req, res) => {
    db.Events.destroy({
      where: {
        id: req.params.id,
        user_id: req.params.user_id
      }
    })
    .then(() => res.json("Success"))
  })

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
