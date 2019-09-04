
// 'use strict';

const yelp = require('yelp-fusion');
const API_KEY = "shiSLJAHIMJ0fUf9p2LtOCHHaygchm7KSMM-KmnXTS-hHQHFaEjPasuJgphfIOzJ-PVAs-bGo0Q_5Z2IfxhZxVOLneYu6Q1mwVYYn0co6GBU1E4zeduYgUnxCl9tXXYx";
const client = yelp.client(API_KEY);

const functions = require('./public/functions');

const express = require("express");
const app = express();
const ejs = require('ejs');


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/results",function(req,res){
  res.render("results",{functions : functions});
  // res.send(functions.getField());
});

app.get('/', function (req, res) {

    res.render("main");
});

var server = app.listen(3000,function(){
  console.log("SERVER HAS STARTED");
});

