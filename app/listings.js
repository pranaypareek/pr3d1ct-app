'use strict';
module.exports = listings;

var fs = require('fs');

function listings(req, res) {

  console.log('Inside', listings.name);
  var location = req.query.location;
  var file = __dirname + '/' + location + '.json';
  var JSONData = {};
  var locations = [];

  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }
    JSONData = JSON.parse(data);
    JSONData.hits.hits.forEach(function (hit) {
      var location = {
        idKey: hit._id,
        
        latitude: hit.latitude,
        longitude: hit.longitude
      };
      locations.push(location);
      res.send(200, locations);
    });
  });
}
