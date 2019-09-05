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
        price: user_requested.priceRange,
        term: user_requested.searchTerm
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
    var business = getRandomStore(response);
    res.render("results",
        {
            location: user_requested.location,
            radius: user_requested.distance,
            price: user_requested.priceRange,
            name: business.name,
            term: user_requested.searchTerm,
            location_restaurant: getBusiLocStr(business)
        }
    );
}


//helper functions 2------------------------------------------------------------------------

function getBusiLocStr(business) {
    // gets the business and compiles a string to send to location_restaraunt
    return business.location.address1 +
        ", " +
        business.location.city +
        ", " +
        business.location.state +
        ", " +
        checkUS(business.location.country);
}


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
    var arrLen = response.businesses.length; // arr length of business
    // console.log(arrLen);
    for( var i = 0; i < arrLen; i++)
    {
        storeArray.push(response.businesses[i]);
    }
    return storeArray[getRandomInt()];
    // return response.businesses[getRandomInt()].name;
}

function checkUS(country) {
    //checks if country is "US" and changes it accordingly
    if (country == "US") {
        return "USA";
    }
    else {
        return "US";
    }
}


//exporting main only since that's all app.js needs--------------------------------


module.exports.main = main;