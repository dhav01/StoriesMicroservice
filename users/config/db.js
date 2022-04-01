const mongoose = require('mongoose')

module.exports = connectDB = async () => {
  try {
    const DB = process.env.MONGO_URI.replace(
      '<password>',
      process.env.MONGO_PASSWORD
    )
    const conn = await mongoose.connect(DB)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('Database connection error:', error.message)
  }
}
