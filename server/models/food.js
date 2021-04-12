const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    }
});

const Food = mongoose.model('FoodSchema', FoodSchema);

module.exports = Food;