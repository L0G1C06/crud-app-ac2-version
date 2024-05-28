const mongoose = require('mongoose')

const TaskModel = mongoose.model('tasks', {
    taskName: String, 
    ownerTask: String
})

module.exports = {
    TaskModel
}