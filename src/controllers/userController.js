const { randomUUID } = require('crypto')
const express = require('express')
const router = express.Router()

var users = []

// AUTHENTICATED
// return all users from database, require authentication
router.get("/list", (req, res) => {
    return res.json(users)
})

// edit a specific user
router.put("/edit/:id", (req, res) => {
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
router.post("/create", (req, res) => {
    const { username, email, role,  password } = req.body;
    if (!username || !email || !role || !password) {
        return res.status(400).json({
            mensagem: "Campos obrigatórios em falta!"
        });
    }

    const user = {
        id: randomUUID(),
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
router.delete("/delete/:id", (req, res) => {
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
router.get("/roles", (req, res) => {
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
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            mensagem: "Campos obrigatórios em falta!"
        });
    }

    const user = {
        id: randomUUID(),
        username: username,
        email: email,
        password: password
    };

    users.push(user);

    console.log("Usuário registrado com sucesso");
    console.log(users);
    return res.json({
        mensagem: "Usuário registrado com sucesso!",
    });
});

// login route
router.post("/login", (req, res) => {
    const {username, password} = req.body
    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        return res.json({
            mensagem: "Login bem-sucedido",
        })
    } else {
        return res.status(400).json({
            mensagem: "Credenciais inválidas"
        })
    }
})

module.exports = router