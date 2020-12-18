const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sars-cov-2');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

db.once('open', function(){
    console.log("Connected to mongoDB");
});

module.exports = db;