var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

var Schema = mongoose.Schema

mongoose.connect(connect);

var petSchema = new Schema({
    slack_id: String,
    pet_name: String,
    pet_number: String,
    create_date: Date,
    health: Number,
    happiness: Number,
    level: Number,
    money: Number,
});


var Pet = mongoose.model('Pet', petSchema);

module.exports = {
    Pet: Pet,
};
