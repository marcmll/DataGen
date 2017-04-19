// Require
var express = require('express'),
    app = express(),
    redis = require("redis"),
    client = redis.createClient(),
    bodyParser = require("body-parser");

// Check for Redis
client.on("error", function (err) {
    console.log("Error " + err);
});

// Static files
app.use(express.static('public'));

// Parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Port
var port = process.env.PORT || 8080;

// Views und pug templating
app.set('views', './views');
app.set('view engine', 'pug');

// Index
app.get('/', function (req, res) {

    res.render('index');

});

// Add new API entry
app.post('/addDataSet', function (req, res, next) {

    var selected = req.body.selected;
    var amount = req.body.amount;

    function addData() {

        // Create random id
        var id = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for( var i = 0; i < 6; i++ ){
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        client.hget(id, function(err, reply) {
            if (reply == '' || reply == null) {

                client.hmset(id, 'amount', amount, 'data', selected, function(err, reply) {
                    console.log('Key Created: ' + id);
                    var link = 'http://datagen.xyz/api/' + id;
                    var data = {
                        id: id,
                        link: link
                    }
                    res.send(data);
                });

            } else {
                addData();
            }
        });

    }

    addData();

});
 
// Listen
app.listen(port);
console.log('Magic happens on port ' + port);