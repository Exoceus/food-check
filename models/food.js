const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// data schema
const FoodSchema = new Schema({
    //name parameter is the name of the food (is lowercase)
    name: {
        type: String,
        required: true,
        unique: true
    },
    //type is one of the 3 specified food types
    type: {
        type: String,
        required: true,
    }
});

const Food = mongoose.model('FoodSchema', FoodSchema);

module.exports = Food;