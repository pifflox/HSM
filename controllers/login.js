var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../models/db_controller");
var mysql = require("mysql");
var session = require("express-session");
var sweetalert = require("sweetalert2");
const { check, validationResult } = require("express-validator");
// const dotenv = require("dotenv").config();

// const app = express();
// app.use(session({ secret: 'somevalue' }));

var con = mysql.createConnection({
  host: "localhost",
  post: "3000",
  password: "",
  database: "hmsystem",
});

router.use(
  session({
    secrect: "somevalue",
    resave: true,
    saveUninitialized: true,
  })
);

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  function (request, response) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }
    var username = request.body.username;
    var password = request.body.password;

    if (username && password) {
      con.query(
        'select * from users where username = ? and password = ?',
        [username, password],
        function (error, results, fields) {
          if (results.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.cookie("username", username);
            var status = results[0].email_status;
            if (status == "not_verified") {
              response.send("verify");
            } else {
              sweetalert.fire("Login Successful");
              response.redirect("/home");
            }
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
          })
        
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
})

module.exports = router;
