const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

require('dotenv').config()

const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.d7vx9.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log('error db:', e))

const healthRoutes = require('./routes/health')
const colaboradorRoutes = require('./routes/colaborador')
const verifyToken = require('./routes/validate-token')

app.use('/api/health', healthRoutes)
app.use('/api/colaborador', verifyToken, colaboradorRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.warn(`servidor andando en: ${PORT}`)
})

module.exports = app
