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
