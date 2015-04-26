'use strict';
module.exports = Predict;
var GooglePlaces = require('googleplaces');
var util = require('util');
var async = require('async');
var _ = require('underscore');

function Predict(req, res) {
    console.log('Inside', Predict.name);
    var locations = req.query.locations;
    //var amenitites = ['doctor', 'badminton'];
    var googlePlaces = new GooglePlaces(
        'AIzaSyAQVT80NecrWP3l2H2rKwLR6SPFLbQ7r-0', 'json');
    var types = req.query.fields;
    var nearestObject = [];

    async.eachSeries(locations, function (location, nextLocation) {
            var nearbyQuery = {
                location: [location.latitude, location.longitude],
                types:  types,
                radius: 2000
            };
            var latitude = location.latitude;
            var longitude = location.longitude;
            console.log('nearbyQuery', nearbyQuery);
            googlePlaces.nearbySearch(nearbyQuery, function(err, data) {
                if (err) throw err;
                var distancArray = [];
                var shortestDistance = 0;
                data.forEach(function (object){
                    var distance = 0;
                    var count = 0;
                    var lat = object.geometry.location.lat;
                    var lng = object.geometry.location.lng;
                    var latDifference = latitude - lat;
                    var latProduct = latDifference * latDifference;
                    var lngDifference = longitude - lng;
                    var lngProduct = lngDifference * lngDifference;
                    distance = Math.sqrt(latProduct + lngProduct);
                    distancArray.push(distance);
                    shortestDistance = _.min(distancArray);
                    count ++;
                    if (count === data.length) {
                        var temp = {
                            location: object,
                            shortestDistance: shortestDistance
                        };
                        nearestObject.push(temp);
                    }
                });
                nextLocation();
            });
        }, function (err) {
            if (err) throw err;
            res.send(200, nearestObject);
    });
    /**
     * Place search - https://developers.google.com/places/documentation
     /#PlaceSearchRequests
     */
    /*amenitites.forEach(function (amenity) {
        if (amenitites.length === 1) return;
        types = types + '|' + amenity;
    });*/
}
