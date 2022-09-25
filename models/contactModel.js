const mongoose = require('mongoose');
let contacts = new mongoose.Schema({
    name: String,
    lastname: String,
    email:String,
    phone: Number,
    user_id: String,
    img:String
});

module.exports = mongoose.model('Contact',contacts);