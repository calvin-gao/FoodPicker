/*
 * Function.js
 *
 * Used in app.js
 *  -abstracts away app.js, but still has req and res to grab url request, might change that in main though.
 */

'use strict';

const yelp = require('yelp-fusion');
const API_KEY = "shiSLJAHIMJ0fUf9p2LtOCHHaygchm7KSMM-KmnXTS-hHQHFaEjPasuJgphfIOzJ-PVAs-bGo0Q_5Z2IfxhZxVOLneYu6Q1mwVYYn0co6GBU1E4zeduYgUnxCl9tXXYx";
const client = yelp.client(API_KEY);


//main function that interacts with app.js; calls on yelp-fusion to make a search, in which the JSON is sent to make_page()
async function main(req, res) {
    var user_requested = req.query.userRequest;
    client.search({
        location: user_requested.location,
        radius: Number(user_requested.distance),
        price: user_requested.priceRange
    }).then(response => {
        make_page(user_requested, res, response.jsonBody);
    }).catch(e => {
        console.log(e);
    });

}


//helper functions-------------------------------------------------------------------------


//renders the page, add functions that calculate from response.jsonBody here
function make_page(user_requested, res, response) {
    console.log();
    res.render("results",
        {
            location: user_requested.location,
            radius: user_requested.distance,
            price: user_requested.priceRange,
            name: getRandomStore(response)
        }
    );
}


//helper functions 2------------------------------------------------------------------------


function getRandomInt()
// currently will return 0-19 since business returns 20 by default
{
    return Math.floor(Math.random() * Math.floor(20));
}


//req is used if u wanna get something from the GET function
//res is render shit LOL
function getRandomStore(response)
{
    var storeArray = [];
    var arrLen = Object.keys(response.businesses[0]).length; // arr length of business
    console.log(arrLen);
    for( var i = 0; i < arrLen; i++)
    {
        storeArray.push(response.businesses[i].name);
    }
    return storeArray;
    // return response.businesses[getRandomInt()].name;

}


//exporting main only since that's all app.js needs--------------------------------


module.exports.main = main;