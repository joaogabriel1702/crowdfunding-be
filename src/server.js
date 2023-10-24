const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const problemsRouter = require('./routes/Problems')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/Problems', problemsRouter)

mongoose.connect('mongodb+srv://joao1702:Joaogabriel10@cluster0.7lbvyxp.mongodb.net/oncode', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected')
}).catch((error) => {
    console.log(error.message)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})