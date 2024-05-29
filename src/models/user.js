const mongoose = require('mongoose')

const UserModel = mongoose.model('users', {
    username: String,
    email: String, 
    password: String
})

const RoleUserModel = mongoose.model('usersRole', {
    username: String, 
    email: String, 
    role: String,
    password: String
})

RoleUserModel.schema.add({
    newUsername: String, // Adicionando o novo campo newUsername ao esquema existente
});

module.exports = {
    UserModel,
    RoleUserModel
}