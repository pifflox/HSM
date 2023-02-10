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
  "', '" + email + "', )";
  "', '" + dob + "', )";
  "', '" + gender + "', )";
  "', '" + address + "', )";
  "', '" + phone + "', )";
  "', '" + image + "', )";
  "', '" + department + "', )";
  "', '" + biography + "', )";
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
    "' where `id` = '" +
    id +
    "' ";

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
  var query = ("SELECT from where `first_name` like " % "+key+") % "' ";
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

//employee details by id
module.exports.getleavebyid = function (id, callback) {
  var query = "select * from `leaves` where `id` = '" + id + "' ";
  con.query(query, callback);
};

//get all leaves
module.exports.getAllleave = function (callback) {
  var query = "select * from leaves";
  con.query(query, callback);
};

//add leave to db
module.exports.add_leave = function (
  name,
  id,
  type,
  from,
  to,
  reason,
  callback
) {
  var query =
    "INSERT into `leaves` (`employee`, `id`, `type`, `from`, `to`, `reason`) values ('" +
    name +
    "', '" +
    id +
    "', '" +
    type +
    "', '" +
    from +
    "', '" +
    to +
    "', '" +
    reason +
    "')";
  console.log(query);
  con.query(query, callback);
};

//delete employee by id
module.exports.deleteleave = function (id, callback) {
  var query = "delete from `leaves` where `id` = '" + id + "'";
  con.query(query, callback);
};

//get all employee details
module.exports.getAllemployee = function (callback) {
  var query = "select * from employee";
  con.query(query, callback);
};

//add employee details
module.exports.add_employee = function (
  name,
  email,
  contact,
  join_date,
  role,
  salary,
  callback
) {
  var query =
    "INSERT into `employee` (`name`, `email`, `contact`, `join_date`, `role`, `salary`) values ('" +
    name +
    "', '" +
    email +
    "', '" +
    contact +
    "', '" +
    join_date +
    "', '" +
    role +
    "', '" +
    salary +
    "')";
  console.log(query);
  con.query(query, callback);
};

//for search employee
module.exports.searchEmp = function (key, callback) {
  var query = ("SELECT *  from employe  where `name` like " % "+key+") % "' ";
  con.query(query, callback);
  console.log(query);
};

//delete employee by id
module.exports.deleteEmp = function (id, callback) {
  var query = "delete from `employee` where `id` = '" + id + "'";
  con.query(query, callback);
};

//edit employee details
module.exports.editEmp = function (
  id,
  name,
  email,
  contact,
  join_date,
  role,
  callback
) {
  var query =
    "UPDATE `employee` SET `name` = '" +
    name +
    "', `email` = '" +
    email +
    "', `contact` = '" +
    contact +
    "', `join_date` = '" +
    join_date +
    "', `role` = '" +
    role +
    "' WHERE `id` = '" +
    id +
    "'";

  con.query(query, callback);
};

//get employee details by id
module.exports.getEmpbyId = function (id, callback) {
  var query = "select * from `employee` where `id` = '" + id + "'";
  con.query(query, callback);
};

//edit leave
module.exports.edit_leave = function (
  id,
  name,
  leave_type,
  from,
  to,
  reason,
  callback
) {
  var query =
    "update `leaves` set `employee` = '" +
    name +
    "', `leave_type` = '" +
    leave_type +
    "', `date_from` = '" +
    from +
    "', `date_to` = '" +
    to +
    "', `reason` = '" +
    reason +
    "' WHERE `id` = '" +
    id +
    "'";

  con.query(query, callback);
};

//***************************************[PATIENT APPOINTMENT]*********************************************//

// add appoinment for patient
module.exports.add_appointment = function (
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "insert into appointment (`patinet_name`, `department`, `doctor_name`, `date`, `time`, `email`, `phone`) values ('" +
    p_name +
    "', '" +
    department +
    "', '" +
    d_name +
    "', '" +
    date +
    "', '" +
    time +
    "', '" +
    email +
    "')";
  "', '" + phone + "')";

  con.query(query, callback);
};

//get all appointment
module.exports.getAllappointment = function (callback) {
  var query = "select * from appointment";
  con.query(query, callback);
};

//edit appointment
module.exports.editappointment = function (
  id,
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "update `appointment` set `patient_name` = '" +
    p_name +
    "', `department` = '" +
    department +
    "', `doctor_name` = '" +
    d_name +
    "', `date` = '" +
    date +
    "', `email` = '" +
    email +
    "', `phone` = '" +
    phone +
    "' WHERE `id` = '" +
    id +
    "'";

  con.query(query, callback);
};

//delete appointment by id
module.exports.deleteappointment = function (id, callback) {
  var query = "delete from `appointment` where `id` = '" + id + "'";
  con.query(query, callback);
};

//*******************************************************[STORE-MEDICINE]**********************************************//

//get all medicine
module.exports.getallmed = function (callback) {
  var query = "select * from store order by id desc";
  console.log(query);
  con.query(query, callback);
};

//add medicine
module.exports.addMed = function (
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "Insert into `store` (`name`, `p_date`, `expire`, `expire_end`, `price`, `quantity`) values ('" +
    name +
    "', '" +
    p_date +
    "', '" +
    expire +
    "', '" +
    e_date +
    "', '" +
    price +
    "', '" +
    quantity +
    "')";

  con.query(query, callback);
};

//medicine list details
module.exports.getMedbyId = function (id, callback) {
  var query = "select * from `store` where `id` = '" + id + "'";
  con.query(query, callback);
};

//edit medicine
module.exports.editMed = function (
  id,
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "update `store` set `name` = '" +
    name +
    "', `p_date` = '" +
    p_date +
    "', `expire` = '" +
    expire +
    "', `expire_end` = '" +
    e_date +
    "', `price` = '" +
    price +
    "', `quantity` = '" +
    quantity +
    "' WHERE `id` = '" +
    id +
    "'";

  con.query(query, callback);
};

//delete medicine
module.exports.deletemed = function (id, callback) {
  var query = "delete from `store` where `id` = '" + id + "'";
  con.query(query, callback);
};

//search medicine
module.exports.searchmed = function (key, callback) {
  var query = ("SELECT *  from store  where `name` like " % "+key+") % "' ";
  con.query(query, callback);
  console.log(query);
};

//*******************************************************[complain]**********************************************//

//post complain
module.exports.postcomplain = function (
  message,
  name,
  email,
  subject,
  callback
) {
  var query =
    "insert into `complain` (`message`, `name`, `email`, `subject`) values ('" +
    message +
    "', '" +
    name +
    "', '" +
    email +
    "', '" +
    subject +
    "')";

    con.query (query, callback);
  };

  //get all complain
  module.exports.getcomplain = function (callback) {
    var query = "select * from complain";
    con.query(query, callback);
  };
