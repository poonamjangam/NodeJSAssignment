require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();
// Setup server port
const port = process.env.PORT;
const mongoConnectionString = process.env.MONGODB_URI
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(mongoConnectionString, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to NodeJS CRUD API."});
});
require('./app/routes/note.routes.js')(app);
// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port",port);
});
