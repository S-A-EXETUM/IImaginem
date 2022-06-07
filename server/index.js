require('dotenv')
require('./database.js')

const userRouter=require('./routes/userRoutes')
const postRouter=require('./routes/postRoutes')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

//Rutas
app.use("/api", userRouter)
app.use("/api", postRouter)

app.get('/', (request, response) => {
    response.status(404)
})

app.listen(3001, () => {
    console.log('Servidor en: ', 3001)
})