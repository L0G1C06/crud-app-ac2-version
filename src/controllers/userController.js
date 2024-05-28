require('dotenv').config()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const auth = require("../middlewares/authentication")
const UserModel = require("../models/user")

const JWT_SECRET = process.env.JWT_SECRET
var users = []

// AUTHENTICATED
// return all users from database, require authentication
router.get("/list", auth, (req, res) => {
    return res.json(UserModel)
})

// edit a specific user
router.put("/edit/:id", auth, (req, res) => {
    var id = req.params.id
    const { username, email, role, password} = req.body;
    console.log(users)

    users.map( user => {
        if(user.id == id) {
            user.username = username,
            user.email = email,
            user.role = role,
            user.passwor = password
        }
    })
    console.log(users)
    console.log("Usuário editado com sucesso!")
    return res.json({
        mensagem: "Usuário editado com sucesso!",
        users: users
    })
})

// create a new user
router.post("/create", auth, (req, res) => {
    const { username, email, role,  password } = req.body;
    if (!username || !email || !role || !password) {
        return res.status(400).json({
            mensagem: "Campos obrigatórios em falta!"
        });
    }

    const user = {
        username: username,
        email: email,
        role: role,
        password: password
    };

    users.push(user);

    console.log("Usuário registrado com sucesso");
    console.log(users);
    return res.json({
        mensagem: "Usuário registrado com sucesso!",
    });
});

// delete a specific user 
router.delete("/delete/:id", auth, (req, res) => {
    var id =  req.params.id 
    console.log(users)

    users = users.filter( user => {
        return user.id != id
    })

    console.log(users)
    console.log("Usuário deletado com sucesso!")
    return res.json({
        mensagem: "Usuário deletado com sucesso!",
    })
})

// return amount of users sorted by role
router.get("/roles", auth, (req, res) => {
    const roleCounts = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc
    }, {})

    const sortedRoles = Object.keys(roleCounts).sort((a, b) => roleCounts[b] - roleCounts[a])

    return res.json({
        roleCounts: roleCounts,
        sortedRoles: sortedRoles
    })
})

// NOT AUTHENTICATED
// create a new user on signup page 
router.post("/register", async(req, res) => {
    const { username, email, password } = req.body;
    const passwordEncrypt = await bcryptjs.hash(password, 10)
    const user = {
        username: username,
        email: email,
        password: passwordEncrypt
    };

    try {
        await UserModel.create(user)
        return res.status(201).json({
            mensagem: "Usuário criado com sucesso"
        })
    } catch(error) {
        return res.status(500).json({
            error: error
        })
    }
});

// login route
router.post("/login", async(req, res) => {
    const {username, password} = req.body
    //const user = users.find(user => user.username === username && user.password === password)
    const user = await UserModel.findOne({username: username})
    if(!user) {
        return res.status(400).json({mensagem: "Usuário não encontrado"})
    }

    if(await bcryptjs.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, JWT_SECRET, {expiresIn: '2d'})

        return res.status(200).json({
            mensagem: "Usuário logado com sucesso",
            token: token
        })
    } else {
        return res.status(401).json({mensage: "Usuário ou senha inválidos"})
    }
})

module.exports = router