const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


const UserSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
});


const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, cb) => {
    User.findById(id, cb);
}

module.exports.getUserByUsername = (username, cb) => {
    const query = {username: username}
    User.findOne(query, cb);
}

module.exports.addUser = (newUser, cb) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(cb);
        });
    });
}


module.exports.comparePassword = (password, hash, cb) => {
    bcrypt.compare(password, hash, (err, isMatch)=> {
        if(err) throw err;
        cb(null, isMatch);
    })
}