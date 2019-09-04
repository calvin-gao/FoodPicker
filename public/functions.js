'use strict';

const yelp = require('yelp-fusion');
const API_KEY = "shiSLJAHIMJ0fUf9p2LtOCHHaygchm7KSMM-KmnXTS-hHQHFaEjPasuJgphfIOzJ-PVAs-bGo0Q_5Z2IfxhZxVOLneYu6Q1mwVYYn0co6GBU1E4zeduYgUnxCl9tXXYx";
const client = yelp.client(API_KEY);

module.exports = {
    getField: function() {
        client.search({
            term: 'Four Barrel Coffee',
            location: 'san francisco, ca',
        }).then(response => {
            console.log((response.jsonBody.businesses[0].name));
        }).catch(e => {
            console.log(e);
        });
    }
}