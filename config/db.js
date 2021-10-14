const MongoClient = require('mongodb').MongoClient;
const DB_URI = require('./DB_URI');

let db;

function connect(callback) {
    MongoClient.connect(DB_URI, { useUnifiedTopology: true }, (err, client) => {
        if (err) throw err;
        db = client;
        console.log('DB CONNECTED');
        callback();
    });
}

function get() {
    return db
}

module.exports = { connect, get };