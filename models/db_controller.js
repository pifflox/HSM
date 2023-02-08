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


//****************************************[USER]**********************************

//db signup
module.exports.signup = function (username, email, password, status, callback) {
  //condition to check if email already exists in db
  //if email does not exist, insert(signup) new user into db
  con.query(
    'SELECT email FROM users WHERE email = "' + email + '" ',
    function (err, result) {
      if (result[0] == undefined) {
        var query =
          "INSERT INTO `users` (`username`, `email`, `password`, `email_status`) VALUES ('" +
          username +
          "', '" +
          email +
          "', '" +
          password +
          "', '" +
          status +
          "')";
        //this console.log is for testing purposes
        con.query(query, callback);
        console.log(query);
      } else {
        console.log("Email already exists");
      }
    }
  );
};

//for verification
module.exports.verify = function (username, email, token, callback) {
  var query =
    "insert into `verify` (`username`, `email`, `token`) values ('" +
    username +
    "', '" +
    email +
    "', '" +
    token +
    "')";
  con.query(query, callback);
};

//for verification USERID
module.exports.getuserid = function (email, callback) {
  var query = "select * from `verify` where `email` = '" + email + "' ";
  con.query(query, callback);
};
//for CHECK TOKEN
module.exports.matchtoken = function (id, token, callback) {
  var query =
    "select * from `verify` where token = '" + token + "' and id=" + id;
  con.query(query, callback);
  console.log(query);
};
//for update verify
module.exports.updateverify = function (email, email_status, callback) {
  var query =
    "update `users` set `email_status` = '" +
    email_status +
    "' where `email`='" +
    email +
    "' ";
  con.query(query, callback);
  console.log(query);
};
//for verify token reset
module.exports.findOne = function (email, callback) {
  var query = "select * from `users` where `email` = '" + email + "' ";
  con.query(query, callback);
  console.log(query);
};
//for verify token reset
module.exports.temp = function (id, email, token, callback) {
  var query =
    "insert into `temp` (`id`, `email`, `token`) values ('" +
    id +
    "', '" +
    email +
    "', '" +
    token +
    "')";
  con.query(query, callback);
  console.log(query);
};


//**********************************[DOCTOR]**************************************************//

//add doctor details in db by admin only (admin can add doctor)
module.exports.add_doctor = function (
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  department,
  biography,
  callback
) {
  var query =
    "insert into `doctor` (`first_name`, `last_name`, `email`, `dob`, `gender`, `address`, `phone`, `image`, `department`, `biography`) values ('" +
    first_name +
    "', '" +
    last_name +
    "', )";
    "', '" +
    email +
    "', )";
    "', '" +
    dob +
    "', )";
    "', '" +
    gender +
    "', )";
    "', '" +
    address +
    "', )";
    "', '" +
    phone +
    "', )";
    "', '" +
    image +
    "', )";
    "', '" +
    department +
    "', )";
    "', '" +
    biography +
    "', )";
    con.query(query, callback);
    console.log(query);
};

//get all details of  doctor 
module.exports.getAllDoc = function (callback) {
  var query = "select * from `doctor`";
  con.query(query, callback);
  console.log(query);
};
//get doc by id
module.exports.getDocbyId = function (id, callback) {
  var query = "select * from `doctor` where `id` = '" + id + "' ";
  con.query(query, callback);
  console.log(query);
};

//for edit doctor
module.exports.editDoc = function (
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  department,
  biography,
  callback
) {
  var query =
    "insert into `doctor` `first_name` = '" +
    first_name +
    "', `last_name` = '" +
    last_name +
    "', `email` = '" +
    email +
    "' , `dob` = '" +
    dob +
    "', `gender` = '" +
    gender +
    "', `address` = '" +
    address +
    "', `phone` = '" +
    phone +
    "', `image` = '" +
    image +
    "', `department` =  '" +
    department +
    "', `biography` = '" +
    biography +
    "' where `id` = '" + id + "' ";

    con.query(query, callback);
    console.log(query);
};

//for deleting 
module.exports.deleteDoc = function (id, callback) {
  var query = "delete from `doctor` where `id` = '" + id + "'";
  con.query(query, callback);
  console.log(query);
};

//search doctor
module.exports.searchDoc = function (id, callback) {
  var query = "select from where `first_name` like "%"'+key+"%"' ";
  con.query(query, callback);
  console.log(query);
};

//doctor department wise
module.exports.getalldept = function (callback) {
  var query = "select * from department";
  con.query(query, callback);
  console.log(query);
};


//***************************************[EMPLOYEE]*********************************************//


