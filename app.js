var express = require("express");
var session = require("express-session");
var cookie = require("cookie-parser");
var path = require("path");
var ejs = require("ejs");
var mutler = require("multer");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
var expressValidator = require("express-validator");
var sweetalert = require("sweetalert2");

var app = express();

var bodyParser = require("body-parser");
const http = require("http");
var db = require("./models/db_controller");
var signup = require("./controllers/signup");
var login = require("./controllers/login");
var verify = require("./controllers/verify");
var reset = require("./controllers/reset_controller");
var doctors = require("./controllers/doc_controller");
var employee = require("./controllers/employee");
var appointment = require("./controllers/appointment");
var store = require("./controllers/store");
var reciept = require("./controllers/reciept");
var complain = require("./controllers/complain");
var home = require ('./controllers/home');
var add_doc = require ('./controllers/add_doctor');
var reset = require('./controllers/reset_controller');
var set = require('./controllers/set_controller');
var logout = require ('./controllers/logout');
var landing = require ('./controllers/landing');
var inbox = require ('./controllers/inbox');
var receipt = require ('./controllers/receipt');
var doc_controller = require('./controllers/doc_controller');


// const dotenv = require("dotenv").config();

app.use(
  session({ secret: "somevalue", resave: true, saveUninitialized: true })
);

app.set("view engine", "ejs");
const Server = http.createServer(app);

app.use(express.static("./public"));
// This code parses the body of the request to the server to make the data
// available to the app.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookie());

const PORT = process.env.PORT || 3000;
Server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use("/login", login);
app.use('/home' , home);
app.use('/signup' , signup);
app.use('/doctors', doc_controller);
app.use('/resetpassword' ,reset);
app.use('/setpassword',set);
app.use('/employee',employee);
app.use ('/logout',logout);
app.use ('/verify', verify);
app.use ('/store',store);
app.use ('/',landing);
app.use ('/complain',complain);
app.use ('/inbox',inbox);
app.use ('/appointment',appointment);
app.use('/receipt',receipt);

// app.use('/add_doctor',add_doc);
