const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/meanM1')
    .then(() => console.log('Connected'))
    .catch((err) => console.error(err));

module.exports = mongoose;