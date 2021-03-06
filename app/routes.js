'use strict';
var search = require('./search.js');
var listings = require('./listings.js');
var locations = require('./locations.js');
var predict = require('./predict.js');

module.exports = function(app) {

    app.get('/search', search);

    app.get('/listings', listings);

    app.get('/locations', locations);

    app.get('/predict', predict);

    app.get('/index', function(req, res) {
        res.sendfile('./public/index.html');
    });
    app.get('/mainpage', function(req, res) {
        res.sendfile('./index-background.html');
    });
    app.get('/predictor', function(req, res) {
        res.sendfile('./public/predictor.html');
    });
};
