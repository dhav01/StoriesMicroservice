const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const app = express()
app.use(express.json())

dotenv.config({ path: './config/config.env' })

connectDB()

app.use('/content', require('./routes/contentRoute'))

const PORT = process.env.PORT || 3000

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not implemented yet!',
  })
})

app.listen(PORT, () => {
  console.log(`Content server is listening on port ${PORT}`)
})
