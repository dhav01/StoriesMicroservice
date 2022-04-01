const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })

const app = express()
app.use(express.json())

connectDB()

app.use('/users', require('./routes/userRoute'))

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found',
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`User server is listening on port ${PORT}`)
})
