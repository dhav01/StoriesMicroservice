const mongoose = require('mongoose')

const EpisodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Chapter title is required'],
  },
  description: {
    type: String,
    required: [true, 'Chapter description is required'],
  },
  content: {
    type: String,
    required: [true, 'Chapter text is required'],
  },
})

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: [true, 'Title already exists'],
  },
  description: {
    type: String,
    required: true,
  },
  episodes: [],
})

//We can add image, meta tags also here

module.exports = mongoose.model('Content', contentSchema)
