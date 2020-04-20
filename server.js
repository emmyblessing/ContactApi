const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const contactRouter = require('./app/routes/contact.routes');

// create express app
const app = express();

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse request of content - application/json
app.use(bodyParser.json());

// middleware to display routes activities
app.use(logger('combined'));

// configuration of the database```
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

//connecting to the database

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to database");
}).catch(err => {
    console.log("Could not connect to database. Exiting now...", err);
    process.exit();
});



// configuration of https api
app.use(cors());

// api route
app.use('/api/contacts', contactRouter);

// listening port of the app
const port = process.env.PORT || 3000;

// define simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to Contact application, to create contact and also keep track of your contact list"
    });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
}); 

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(port, () => {
    console.log("Express server is running on port", port);
})

