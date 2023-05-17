const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    price: { type: Number, required: true },
    mobile: { type: String, required: true, minlength: 10 },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
});

module.exports = mongoose.model('Item', itemSchema)