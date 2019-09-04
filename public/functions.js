'use strict';

const yelp = require('yelp-fusion');
const API_KEY = "shiSLJAHIMJ0fUf9p2LtOCHHaygchm7KSMM-KmnXTS-hHQHFaEjPasuJgphfIOzJ-PVAs-bGo0Q_5Z2IfxhZxVOLneYu6Q1mwVYYn0co6GBU1E4zeduYgUnxCl9tXXYx";
const client = yelp.client(API_KEY);

async function main(req,res) {
    client.search({
        term: 'Four Barrel Coffee',
        location: 'san francisco, ca',
    }).then(response => {
        make_page(req, res, response);
    }).catch(e => {
        console.log(e);
    });

}

function make_page(req, res, response) {
    console.log();
    res.send(req.query.userRequest);
}

module.exports.main = main;