var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/db_controller");

//get user (if user not exist then redirect to login page)
router.get("*", function (req, res, next) {
  if (req.cookies["username"] != null) {
    res.redirect("/login");
  } else {
    next();
  }
});

//get complain page
router.get("/", function (req, res) {
  res.render("complain.ejs");
});

//create a post to complain
router.post("/", function (req, res) {
  var message = req.body.message;
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  db.postcomplain(message, name, email, subject, function (err, result) {
    res.redirect("back");
  });
});


module.exports = router;
