const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/geo-location-v1', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const conn = mongoose.connection;

conn.on('error', () => console.error('Connection Error'));

conn.once('open', () => console.info('Connection to Database is successful'));

module.exports = conn;
