// 'use strict';
const yelp = require('yelp-fusion');
const API_KEY = "shiSLJAHIMJ0fUf9p2LtOCHHaygchm7KSMM-KmnXTS-hHQHFaEjPasuJgphfIOzJ-PVAs-bGo0Q_5Z2IfxhZxVOLneYu6Q1mwVYYn0co6GBU1E4zeduYgUnxCl9tXXYx";
const client = yelp.client(API_KEY);

const functions = require('./public/functions');
const fs = require("fs");

var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

const express = require("express");
const app = express();
const ejs = require('ejs');
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(cookieSession({
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    secret: "FoodPicker",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
//used for error handling

app.get("/results", function (req, res) {
    // rendering results page
    functions.main(req, res);
});

app.get('/', function (req, res) {
    res.render("main", { messages: req.flash('info') });
});

<<<<<<< HEAD

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
=======
var server = app.listen((process.env.PORT||3000),function(){
  console.log("SERVER HAS STARTED");
});
>>>>>>> 88dcbd6df760de624a50ab2770ae5b450204f123

