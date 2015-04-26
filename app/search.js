'use strict';
module.exports = Search;
var GooglePlaces = require('googleplaces');
var util = require('util');

function Search(req, res) {
    console.log('Inside', Search.name);
    var location = req.query.location + ' bangalore';
    //var amenitites = ['doctor', 'badminton'];
    var googlePlaces = new GooglePlaces(
        'AIzaSyC8HSlurW0czIqjt6qvRpp80zsTNJXYBjQ', 'json');
    var parameters;
    var mytypes = [];
    var types = req.query.types || 'gym|hindu_temple|school|';
    mytypes = types[0];
    if (types.length > 1) {
        for(var i=1; i<types.length; i++) {
            mytypes = '|'+types[1];
        }
    }
    types = mytypes;
    console.log(types);

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
        var nearbyQuery = {
            location: [latitude, longitude],
            types: types,
            radius: 5000
        };
        console.log('nearbyQuery', nearbyQuery);
        googlePlaces.nearbySearch(nearbyQuery, function(err, data) {
            if (err) throw err;
            console.log(util.inspect(data), {
                depth: 6
            });
            res.send(200, data);
        });
    });
}
