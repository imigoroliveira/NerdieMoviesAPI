const mongoose = require('mongoose');

const assinanteSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    nascDate: String,
    tel: String,
    address: String,
    district: String,
    city: String,
    state: String,
    status: {
        type: String,
        enum: ['Ativo', 'Inativo']
    },
    imagem: Buffer
});

module.exports = mongoose.model('subscribers', subscribersSchema);