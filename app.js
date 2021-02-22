const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: false}));

// Routes
const authRoute = require('./routes/auth');
app.use('/', authRoute);

// DB Connection
const uri = process.env.DB_CONNECTION;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

mongoose.connect(uri, options, function(error){
    error ? console.log(error) : console.log('connected to DB');
});

app.listen(9999);
