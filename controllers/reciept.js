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
  db.getAllemployee(function (err, result) {
    res.render("salary.ejs", { employee: result });
  });
});

//specific employee salary details
router.get("/generateslip/:id", function (req, res) {
  var id = req.params.id;
  db.getEmpbyId(id, function (err, result) {
    var name = result[0].name;
    var id = result[0].id;
    var email = result[0].email;
    var role = result[0].role;
    var salary = result[0].salary;
    var join_date = result[0].join_date;
    var contact = result[0].contact;

    res.render("payslip.ejs", {
      name: name,
      id: id,
      email: email,
      role: role,
      salary: salary,
      join_date: join_date,
      contact: contact,
    });
  });
});


module.exports = router;
