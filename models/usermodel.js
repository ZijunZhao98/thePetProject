var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

var Schema = mongoose.Schema

mongoose.connect(connect);

var userSchema = new Schema({
    slack_id: String,
    slack_name: String,
    pet_name: String,
    money: Number,
});

var User = mongoose.model('User', userSchema);

module.exports = {
    User: User,
};