var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, unique: true, trim: true, required: true},
    password: {type: String, unique: true, trim: true, required: true},
    fullname: String,
    age:      Number,
    avatar:     String,
    gallery:    String,
    createAt: {
        type:Date,
        default: Date.now
    }
});
let UserModel = mongoose.model('user', userSchema);

exports.USER_MODEL = UserModel;