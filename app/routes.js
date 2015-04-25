'use strict';
var search = require('./search.js');
var listings = require('./listing.js');
var locations = require('./location.js');

module.exports = function(app) {

    app.get('/search', search);

    app.get('/listings', listings);

    app.get('/locations', locations);

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
