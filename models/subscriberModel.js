const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({

    id: Number,
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
    imagem: Buffer

});

module.exports = mongoose.model('subscriber', subscriberSchema);