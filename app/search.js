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
    var types = 'hospital|restaraunt|gym|school|hindu_temple';
    /*for(var i=0; i<types.length; i++) {
        if(types[i] && types[i] !== 'undefined'){
            mytypes = types[i]+'|';
        }
    }
    types = mytypes;
    console.log("=========", types)*/
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
            radius: 1000
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
