const mongoose = require('mongoose')

const UserModel = mongoose.model('users', {
    username: String,
    email: String, 
    password: String
})

module.exports = UserModel