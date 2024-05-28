require('dotenv').config()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const auth = require("../middlewares/authentication")
const { TaskModel } = require("../models/todo")

const JWT_SECRET = process.env.JWT_SECRET

// return all tasks from database
router.get("/list", auth, async (req, res) => {
    try {
        const tasks = await TaskModel.find({})
        return res.status(200).json(tasks)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro ao buscar tarefas", error: error.message})
    }
})

module.exports = router