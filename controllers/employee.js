var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/db_controller");
const { check, validationResult } = require("express-validator");

//get user
router.get("*", function (req, res, next) {
  if (req.cookies["username"] != null) {
    res.redirect("/login");
  } else {
    next();
  }
});

//user login
router.get("/", function (req, res) {
  db.getAllemployee(function (err, result) {
    res.render("employee.ejs", { employee: result });
  });
});

//add employee
router.get("/add", function (req, res) {
  res.render("add_employee.ejs");
});

//add employee details
router.post("/add", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.contact;
  var join_date = req.body.date;
  var role = req.body.role;
  var salary = req.body.salary;
  db.add_employee(
    name,
    email,
    contact,
    join_date,
    role,
    salary,
    function (err, result) {
      console.log("employee details added");
      res.redirect("/employee");
    }
  );
});

//employee leave request
router.get("/leave", function (req, res) {
  db.getAllLeave(function (err, result) {
    res.render("leave.ejs", { user: result });
  });
});

//add leave details
router.get("/add_leave", function (req, res) {
  res.render("add_leave.ejs");
});

//edit leave detials
router.get("/edit_leave/:id", function (req, res) {
  var id = req.params.id;
  db.getleavebyid(id, function (err, result) {
    res.render("edit_leave.ejs", { user: result });
  });
});

//after edit leave details update in database
router.post("/edit_leave/:id", function (req, res) {
  var id = req.params.id;
  db.edit_leave(
    id,
    req.body.name,
    req.body.leave_type,
    req.body.from,
    req.body.to,
    req.body.resason,
    function (err, result) {
      console.log("leave details updated");
      res.redirect("/employee/leave");
    }
  );
});

//delete the leave
router.get("/delete_leave/:id", function (req, res) {
  var id = req.params.id;
  db.getleavebyid(id, function (err, result) {
    res.render("/delete_leave.ejs", { user: result });
  });
});

//after delet post back to bd
router.post("/delete_leave/:id", function (req, res) {
  var id = req.params.id;
  db.deleteleave(id, function (err, result) {
    console.log("leave details deleted");
    res.redirect("/employee/leave");
  });
});

//edit employee details
router.get("/edit_employee/:id", function (req, res) {
  var id = req.params.id;
  db.getEmpbyId(id, function (err, result) {
    res.render("edit_employee.ejs", { list: result });
  });
});

//after edit post back to db
router.post("/edit_employee/:id", function (req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var email = req.body.email;
  var contact = req.body.contact;
  var join_date = req.body.date;
  var role = req.body.role;
  var salary = req.body.salary;
  db.editEmp(
    name,
    email,
    contact,
    join_date,
    role,
    salary,
    function (err, result) {
      console.log("employee details updated");
      res.redirect("/employee");
    }
  );
});

//delete employee
router.post("/delete_employee/:id", function (req, res) {
  var id = req.params.id;
  db.getEmpbyId(id, function (err, result) {
    console.log("employee details deleted");
    res.render("delete_employee.ejs", { list: result });
  });
});

//after delete post back to db
router.post("/delete_employee/:id", function (req, res) {
  var id = req.params.id;
  db.deleteEmp(id, function (err, result) {
    console.log("employee details deleted");
    res.redirect("/employee");
  });
});

//search employee
router.post("/search", function (req, res) {
  var search = req.body.search;
  db.searchEmp(search, function (err, result) {
    res.render("employee.ejs", { employee: result });
  });
});

//validate form for employee
router.post(
  "/add_leave",
  [
    check("name").notEmpty(),
    check("id").notEmpty(),
    check("leave_type").notEmpty(),
    check("from").notEmpty().withMessage("From date is required"),
    check("to").notEmpty().withMessage("To date is required"),
    check("reason").notEmpty().withMessage("Reason is required"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.array() });
    }
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.contact;
    var join_date = req.body.date;
    var role = req.body.role;
    var salary = req.body.salary;
    db.add_leave(
      name,
      email,
      contact,
      join_date,
      role,
      salary,
      function (err, result) {
        res.redirect("/employee/leave");
      }
    );
  }
);

module.exports = router;
