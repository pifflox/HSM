var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../models/db_controller");
var mysql = require("mysql");
var nodemailer = require("nodemailer");
var randomToken = require("random-token");
const { check, validationResult } = require("express-validator");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", function (req, res) {
  res.render("signup.ejs");
});

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
    check("email").notEmpty().withMessage("Email is required"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var email_status = "not_verified";
    var email = req.body.email;
    var username = req.body.username;

    db.signup(
      req.body.username,
      req.body.email,
      req.body.password,
      email_status
    );
    var token = randomToken(16);
    db.verify(req.body.username, email, token);

    db.getuserid(email, function (err, result) {
      var id = result[0].id;
      var output = `<p>Thank you ${username} for registering</p>
      <h3>Please click on the link below to verify your email</h3>
      <ul>
      <li>User Id: ${id}</li>
      <li>Token: ${token}</li>
      </ul>
      <p>verify link: <a href="http://localhost:8800/verify">Verify</a></p>
      <p><b>Automated mail</b></p>`;

      //nodemailer to send mail authntication
      var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user:"trashyou14@gmail.com",
            pass:"lpvqjeguqogwneau"
        }
      });
      var mailOptions = {
        from: 'HMSYSTEM@gmail.com',
        to: email,
        subject: 'Verify your email',
        html: output
      };
        transporter.sendMail(mailOptions, function (err, info) {
            if(err){
                return console.log(err);
            }
            console.log(info);
            //(info)
        });
        res.send("Email sent to " + email + " for verification");
    });
  }
);

module.exports = router;
