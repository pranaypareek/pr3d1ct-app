'use strict';
module.exports = Search;
var GooglePlaces = require('googleplaces');
var util = require('util');

function Search(req, res) {
    console.log('Inside', Search.name);
    var location = req.query.location + ' bangalore';
    //var amenitites = ['doctor', 'badminton'];
    var googlePlaces = new GooglePlaces(
        'AIzaSyAQVT80NecrWP3l2H2rKwLR6SPFLbQ7r-0', 'json');
    var parameters;
    var types = 'gym';

    /**
     * Place search - https://developers.google.com/places/documentation
     /#PlaceSearchRequests
     */
    /*amenitites.forEach(function (amenity) {
        if (amenitites.length === 1) return;
        types = types + '|' + amenity;
    });*/
    parameters = {
        query: location
    };
    googlePlaces.textSearch(parameters, function(err, response) {
        if (err) throw err;
        console.log(util.inspect(response));
        var latitude = response.results[0].geometry.location.lat;
        var longitude = response.results[0].geometry.location.lng;
        var radarQuery = {
            location: [latitude, longitude],
            types: types,
            radius: 2000
        };
        console.log('radarQuery', radarQuery);
        googlePlaces.radarSearch(radarQuery, function(err, data) {
            if (err) throw err;
            console.log(util.inspect(data), {
                depth: 6
            });
            res.send(200, data);
        });
    });
}
