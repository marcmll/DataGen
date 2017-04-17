// Require
var express = require('express'),
    app = express(),
    redis = require("redis"),
    client = redis.createClient(),
    bodyParser = require("body-parser"),
    Chance = require('chance'),
    chance = new Chance();

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
var port = process.env.PORT || 3000;

// Views und pug templating
app.set('views', './views');
app.set('view engine', 'pug');

// Router
var router = express.Router();

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
                    var link = 'localhost:3000/api/' + id;
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

// Assemble Single Object Data
function assembleData(data) {

    var assembledObject = {},
        gender = chance.gender(),
        firstName = chance.first({ gender: gender }),
        lastName = chance.last(),
        fullName = firstName + ' ' + lastName,
        username = firstName.charAt(0).toLowerCase() + lastName;

    data.forEach(function(type, index) {

        switch (type) {
            case 'fullName':
                assembledObject.fullName = fullName;
                break;
            case 'firstName':
                assembledObject.firstName = firstName;
                break;
            case 'lastName':
                assembledObject.lastName = lastName;
                break;
            case 'username':
                assembledObject.username = username;
                break;
            case 'gender':
                assembledObject.gender = gender;
                break;
            case 'age':
                assembledObject.age = chance.age();
                break;
            case 'email':
                assembledObject.email = username + '@example.com';
                break;
            case 'phoneNumber':
                assembledObject.phoneNumber = chance.phone({ country: 'us' });
                break;
            case 'twitter':
                assembledObject.twitter = '@' + username;
                break;
            default:
                console.log('ERROR.... type not known');
        }

    });

    // Give back the assembled object
    return assembledObject;
}

// API
router.get('/:id', function (req, res) {

    var id = req.params.id;

    // Get data & amount for the id
    client.hmget(id, 'amount', 'data', function(err, reply) {

        var processedData = {},
            amount = reply[0],
            data = reply[1].split(',');

        for(var i = 0; i < amount; i++) {
            processedData[i] = assembleData(data);
        }

        // Send JSON response
        res.json(processedData);

    });

});

// All routes prefixed => /api
app.use('/api', router);
 
// Listen
app.listen(port);
console.log('Magic happens on port ' + port);