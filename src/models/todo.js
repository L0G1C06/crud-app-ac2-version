const mongoose = require('mongoose')

const TaskModel = mongoose.model('tasks', {
    taskname: String, 
    username: String
})

module.exports = {
    TaskModel
}