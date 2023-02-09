var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/db_controller");
var multer = require("multer");
var fs = require("fs");
var path = require("path");
const { route } = require("./login");

//get user (if user not exist then redirect to login page)
router.get("*", function (req, res, next) {
  if (req.cookies["username"] != null) {
    res.redirect("/login");
  } else {
    next();
  }
});

//storage for image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/images/upload_images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

//get doctors
router.get("/", function (req, res) {
  if (err) throw err;
  res.render("doctors.ejs", { list: result });
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//add doctor
router.get("/add_doctor", function (req, res) {
  db.getalldept(function (err, result) {
    res.render("add_doctor.ejs", { list: result });
  });
});

//add doctor image 
router.post("/add_doctor", upload.single("image"), function (req, res) {
  db.add_doctor(
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.dob,
    req.body.gender,
    req.body.address,
    req.body.phone,
    req.file.filename,
    req.body.department,
    req.body.biography
  );
  if (db.add_doctor) {
    console.log("Doctor Added");
  }
  res.render("add_doctor");
});

//edit doctor
router.get("/edit_doctor/:id", function (req, res) {
  var id = req.params.id;
  db.getDocbyId(id, function (err, result) {
    res.render("edit_doctor.ejs", { list: result });
  });
});

//edit doctor info
router.post("/edit_doctor/:id", function (req, res) {
  var id = req.params.id;
  db.getDocbyId(
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.dob,
    req.body.gender,
    req.body.address,
    req.body.phone,
    req.body.department,
    req.body.biography,
    function (err, result) {
      if (err) throw err;
      res.redirect("back");
    }
  );
});

//delete doctor
router.get("/delete_doctor/:id", function (req, res) {
  var id = req.params.id;
  db.getDocbyId(id, function (err, result) {
    res.render("delete_doctor.ejs", { list: result });
  });
});

//delete doctor info
router.post("/delete_doctor/:id", function (req, res) {
  var id = req.params.id;
  db.getDocbyId(id, function (err, result) {
    if (err) throw err;
    res.redirect("doctor");
  });
});

//get all doctors
router.get("/", function (req, res) {
  db.getAllDoc(function (err, result) {
    if (err) throw err;
    res.render("doctors.ejs", { list: result });
  });
});

//search doctor
router.post("/search", function (req, res) {
  var key = req.body.search;
  db.searchDoc(key, function (err, result) {
    console.log(result);
    res.render("doctors.ejs", { list: result });
  });
});

module.exports = router;
