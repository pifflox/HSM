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

//get appointment page and display all appointments
router.get("/", function (req, res) {
  db.getallappointment(function (err, result) {
    console.log(result);
    res.render("appointment.ejs", { result: result });
  });
});

//add appointment to db
router.get("/add_appointment", function (req, res) {
  res.render("add_appointment.ejs");
});

//post details of appointment to db
router.post("/add_appointment", function (req, res) {
  //p_name = patient name, d_name = specfiq dept name that patient wants to do appointment with
  db.add_appointment(
    req.body.p_name,
    req.body.department,
    req.body.d_name,
    req.body.date,
    req.body.time,
    req.body.email,
    req.body.phone,
    function (err, result) {
      res.redirect("/appointment");
    }
  );
});

//edit appointment
router.get("/edit_appointment/:id", function (req, res) {
  var id = req.params.id;
  db.getappointmentbyid(id, function (err, result) {
    console.log(result);
    res.render("edit_appointment.ejs", { list: result });
  });
});

//post edited appointment to db
router.post("/edit_appointment/:id", function (req, res) {
  //p_name = patient name, d_name = specfiq dept name that patient wants to do appointment with
  var id = req.params.id;
  db.editappointment(
    id,
    req.body.p_name,
    req.body.department,
    req.body.d_name,
    req.body.date,
    req.body.time,
    req.body.email,
    req.body.phone,
    function (err, result) {
      res.redirect("/appointment");
    }
  );
});

//delete appointment
router.get("/delete_appointment/:id", function (req, res) {
  var id = req.params.id;
  db.getappointmentbyid(id, function (err, result) {
    console.log(result);
    res.render("delete_appointment.ejs", { list: result });
  });
});

//post deleted appointment to db
router.post("/delete_appointment/:id", function (req, res) {
  var id = req.params.id;
  db.deleteappointment(id, function (err, result) {
    res.redirect("/appointment");
  });
});

module.exports = router;
