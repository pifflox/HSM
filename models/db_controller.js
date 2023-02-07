var mysql = require("mysql");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var con = mysql.createConnection({
  host: "localhost",
  post: "3000",
  user: "root",
  password: "",
  socket: "/Applications/MAMP/tmp/mysql/mysql.sock",
  database: "hmsystem",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("MySql Database connected!");
});


//db signup
module.exports.signup = function (username, email, password, status, callback) {
  //condition to check if email already exists in db
  //if email does not exist, insert(signup) new user into db
  con.query('SELECT email FROM users WHERE email = "'+email+'" ',
    function (err, result) {
      if (result[0] == undefined){
        var query =
          "INSERT INTO `users` (`username`, `email`, `password`, `email_status`) VALUES ('"+username+"', '"+email+"', '"+password+"', '"+status+"')";
      //this console.log is for testing purposes
          con.query(query, callback);
          console.log(query);
      } else {
        console.log("Email already exists");
      }
    });
};

//for verification
module.exports.verify = function (username, email, token, callback) {
  var query =
    "insert into `verify` (`username`, `email`, `token`) values ('"+username+"', '"+email+"', '"+token+"')";
    con.query(query, callback);
  };

//for verification
module.exports.getuserid = function (email, callback) {
  var query = "select * from `verify` where `email` = '"+email+"' ";
    con.query(query, callback);
  };

