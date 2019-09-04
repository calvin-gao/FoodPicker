'use strict';

const yelp = require('yelp-fusion');
const API_KEY = "shiSLJAHIMJ0fUf9p2LtOCHHaygchm7KSMM-KmnXTS-hHQHFaEjPasuJgphfIOzJ-PVAs-bGo0Q_5Z2IfxhZxVOLneYu6Q1mwVYYn0co6GBU1E4zeduYgUnxCl9tXXYx";
const client = yelp.client(API_KEY);

async function main(req,res) {
    client.search({
        term: 'Four Barrel Coffee',
        location: 'san francisco, ca',
    }).then(response => {
        make_page(req, res, response.jsonBody);
    }).catch(e => {
        console.log(e);
    });

}

function make_page(req, res, response) {
    console.log();
    //req.query.userRequest to send message
    res.render("results", { location: req.query.userRequest.location});
}

module.exports.main = main;