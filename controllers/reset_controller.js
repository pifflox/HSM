var express = require("express");
var flash = require("flash");
var router = express.Router();
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var randomToken = require("random-token");
const { route } = require("./login");
var db = require.main.require("./models/db_controller");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// router.get("/", function (req, res) {
//   res.render("resetpassword.ejs");
// });

router.post("/", function (req, res) {
  var email = req.body.email;
  db.findOne(email, function (err, resultone) {
    if (!resultone) {
      console.log("email not found");
      res.send("email not found");
    }
    var id = resultone[0].id;
    var email = resultone[0].email;
    var token = randomToken(16);

    //node mailer to send mail authentication 
    db.temp(id, email, token, function (err, resulttwo) {
      var output =
        `<p> You have requested for a password reset</p>
            <h3>Click on the link below to reset your password</h3>
            <ul>
            <li>User Id: ` +
        id +
        `</li>
            <li>User Token: ` +
        token +
        `</li>
            </ul>
            `;
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "trashyou14@gmail.com",
          pass: "lpvqjeguqogwneau",
        },
      });
      var mailOptions = {
        from: "HMSYSTEM",
        to: email,
        subject: "Password Reset",
        html: output,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
          res.send("email sent");
        }
      });
      res.send("email sent");
    });
  });
});

module.exports = router;
