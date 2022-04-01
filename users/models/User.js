const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const SeriesSchema = new mongoose.Schema({
  seriesId: {
    type: mongoose.Types.ObjectId,
    ref: 'Content',
  },
  unlockedChapters: {
    type: Number,
  },
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please add a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not the same!',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  unlockedContent: [SeriesSchema],
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  this.passwordConfirm = undefined
  next()
})

module.exports = mongoose.model('User', userSchema)
