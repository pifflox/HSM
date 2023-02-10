var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require.main.require("./models/db_controller");

//get user (if user not exist then redirect to login page)
router.get("*", function (req, res, next) {
  if (req.cookies["username"] != null) {
    res.redirect("/login");
  } else {
    next();
  }
});

//get all items from store
router.get("/", function (req, res) {
    db.getallmed(function (err, result) {
        console.log(result);
        res.render("store.ejs", { list: result });
    });
});

//add item to store
router.get("/add_med", function (req, res) {
    res.render("add_med.ejs");
});

//post details of item to db (p_date = production date)
router.post("/add_med", function (req, res) {
    var name = req.body.name;
    var p_date = req.body.p_date;
    var expire = req.body.expire;
    var e_date = req.body.e_date;
    var price = req.body.price;
    var quantity = req.body.quantity;

    db.addMed(name, p_date, expire, e_date, price, quantity, function (err, result) {
        res.redirect("/store");
    });
});

//edit item
router.get("/edit_med/:id", function (req, res) {
    var id = req.params.id;
    db.getMedbyId(id, function (err, result) {
        console.log(result);
        res.render("edit_med.ejs", { result: result });
    });
});

//post edited item to db
// router.post("/edit_med/:id", function (req, res) {
//     var id = req.params.id;
//     db.editMed(
//         req.body.name,
//         req.body.p_date,
//         req.body.expire,
//         req.body.e_date,
//         req.body.price,
//         req.body.quantity,
//         id,
//         function (err, result) {
//             res.redirect("/store");
//         }
//     );
// });

//extra****
router.post("/edit_med/:id", function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var p_date = req.body.p_date;
    var expire = req.body.expire;
    var e_date = req.body.e_date;
    var price = req.body.price;
    var quantity = req.body.quantity;

    db.editMed(id, name, p_date, expire, e_date, price, quantity, function (err, result) {
        res.redirect("/store");
    });
});

//delete item from store
router.get('/delete_med/:id', function (req, res) {
    var id = req.params.id;
    db.getMedbyId(id, function (err, result) {
        res.render('delete_med.ejs', { list: result });
    });
});

//delete and updaate db
router.post('/delete_med/:id', function (req, res) {
    var id = req.params.id;
    db.deletemed(id, function (err, result) {
        res.redirect('/store');
    });
});

//search item from store
router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchmed(key, function (err, result) {
        console.log(result);
        res.render('store.ejs', { list: result });
    });
});







module.exports = router;