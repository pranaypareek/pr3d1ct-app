'use strict';
module.exports = locations;
var GooglePlaces = require('googleplaces');

function locations(req, res) {
    console.log('Inside', locations.name);
    var location = req.query.location + ' bangalore';
    //var amenitites = ['doctor', 'badminton'];
    var googlePlaces = new GooglePlaces(
        'AIzaSyAQVT80NecrWP3l2H2rKwLR6SPFLbQ7r-0', 'json');
    var parameters;

    parameters = {
        query: location
    };
    googlePlaces.textSearch(parameters, function(err, response) {
        if (err) throw err;
        var latitude = response.results[0].geometry.location.lat;
        var longitude = response.results[0].geometry.location.lng;
        var location = {
            latitude: latitude,
            longitude: longitude
        };
        res.send(200, location);
    });
}
