const mysql = require('mysql2');


const User = function (user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.isAdmin = user.isAdmin;
};

module.exports = User;





// const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

// const userSchema = mongoose.Schema({
//     email: { type: String, required: true, unique: true, trim: true },
//     password: { type: String, required: true },
// });

// userSchema.plugin(uniqueValidator);

// module.exports = mongoose.model('User', userSchema);