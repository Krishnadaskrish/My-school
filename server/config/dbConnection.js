const mongoose = require('mongoose')

const uri = process.env.CONNECTION_STRING

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));

module.exports = mongoose;
