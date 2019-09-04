'use strict';

const yelp = require('yelp-fusion');
const API_KEY = "shiSLJAHIMJ0fUf9p2LtOCHHaygchm7KSMM-KmnXTS-hHQHFaEjPasuJgphfIOzJ-PVAs-bGo0Q_5Z2IfxhZxVOLneYu6Q1mwVYYn0co6GBU1E4zeduYgUnxCl9tXXYx";
const client = yelp.client(API_KEY);

//main function that interacts with app.js; calls on yelp-funsion to make a search, in which the JSON is sent to make_page()
async function main(req,res) {
    client.search({
        location: req.query.userRequest.location,
        radius: Number(req.query.userRequest.distance),
        price: req.query.userRequest.priceRange
    }).then(response => {
        make_page(req, res, response.jsonBody);
    }).catch(e => {
        console.log(e);
    });

}

//renders the page, add functions that calculate from response.jsonBody here
function make_page(req, res, response) {
    console.log();
    //req.query.userRequest to send message
    res.render("results", { location: req.query.userRequest.location,
    radius: req.query.userRequest.distance, price: req.query.userRequest.priceRange,
    name: getRandomStore(response)
});
}

function getRandomInt()
// currently will return 0-19 since business returns 20 by default
{
    return Math.floor(Math.random() * Math.floor(20));
}

//req is used if u wanna get something from the GET funciton
//res is render shit LOL
function getRandomStore(response)
{
    return response.businesses[getRandomInt()].name;
}



module.exports.main = main;