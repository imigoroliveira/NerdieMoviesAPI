const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({

    id: String,
    status: {
        type: String,
        enum: ['Active', 'Inactive']
    },
    firstName: String,
    lastName: String,
    birthDate: String,
    tel: String,
    address: String,
    district: String,
    city: String,
    state: String,
    image: Buffer

});

module.exports = mongoose.model('subscriber', subscriberSchema);