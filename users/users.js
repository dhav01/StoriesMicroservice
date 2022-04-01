const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })

const app = express()
app.use(express.json())

connectDB()

app.use('/users', require('./routes/userRoute'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`User server is listening on port ${PORT}`)
})
