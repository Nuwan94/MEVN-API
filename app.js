const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database, {
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB Error : ' + err);
});

const port = process.env.port | 3000;

const app = express();

// Routes
const users = require('./routes/users');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize());
app.use(passport.session());

// Endpoints
app.use('/users', users);

require('./config/passport')(passport);

// Index Route
app.get('/', (req, res) => {
    res.send("Hello World!");
})

// Start Server
app.listen(port, () => {
    console.log("Server started on port " + port);
})