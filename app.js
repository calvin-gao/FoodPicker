// 'use strict';
const yelp = require('yelp-fusion');
const API_KEY = "shiSLJAHIMJ0fUf9p2LtOCHHaygchm7KSMM-KmnXTS-hHQHFaEjPasuJgphfIOzJ-PVAs-bGo0Q_5Z2IfxhZxVOLneYu6Q1mwVYYn0co6GBU1E4zeduYgUnxCl9tXXYx";
const client = yelp.client(API_KEY);

const functions = require('./public/functions');
const fs = require("fs");

var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

const express = require("express");
const app = express();
const ejs = require('ejs');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 60000 },
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

var server = app.listen(3000,function(){
  console.log("SERVER HAS STARTED");
});

