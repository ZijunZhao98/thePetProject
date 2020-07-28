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
});

var userSchema = new Schema({
    slack_id: String,
    per_id: String,
    money: Number,
});

var User = mongoose.model('User', userSchema);
var Pet = mongoose.model('Pet', petSchema);

module.exports = {
    Pet: Pet,
    User: User,
};
