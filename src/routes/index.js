const express = require('express')
const userRouter = require('../controllers/userController')

const port = 8000 

const app = express()
app.use(express.json())

app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.send("I'm alive!")
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})