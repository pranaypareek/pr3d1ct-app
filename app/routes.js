var search = require('./search.js');

module.exports = function(app) {

    app.get('/search', search);

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });
};
