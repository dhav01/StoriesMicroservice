const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const app = express()
app.use(express.json())

dotenv.config({ path: './config/config.env' })

connectDB()

app.use('/content', require('./routes/contentRoute'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Content server is listening on port ${PORT}`)
})
