'use strict';
module.exports = locations;
var GooglePlaces = require('googleplaces');

function locations(req, res) {
    console.log('Inside', locations.name);
    var location = req.query.location + ' bangalore';
    //var amenitites = ['doctor', 'badminton'];
    var googlePlaces = new GooglePlaces(
        'AIzaSyC8HSlurW0czIqjt6qvRpp80zsTNJXYBjQ', 'json');
    var parameters;

    parameters = {
        query: location
    };
    console.log(parameters);
    googlePlaces.textSearch(parameters, function(err, response) {
        if (err) throw err;
        console.log(response);
        var latitude = response.results[0].geometry.location.lat;
        var longitude = response.results[0].geometry.location.lng;
        var location = {
            latitude: latitude,
            longitude: longitude
        };
        res.send(200, location);
    });
}
