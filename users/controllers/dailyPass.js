const { ObjectId } = require('bson')
const User = require('../models/User')
const axios = require('axios')

exports.unlockChapters = async (req, res) => {
  try {
    let { user, series } = req.params

    let userId = await User.findById(user)
    let seriesId = await axios.get(
      `http://127.0.0.1:8888/content/id/${req.params.series}`
    )
    //invalid userId
    if (!userId) {
      return res.status(404).json({
        message: 'User does not exist!',
      })
    }

    let index = userId.unlockedContent.findIndex(
      (serie) => serie.seriesId.toString() === series
    )
    let data
    if (index === -1) {
      //series not found in user's unlockedContent
      data = await User.findByIdAndUpdate(
        user,
        {
          $push: { unlockedContent: { seriesId: series, unlockedChapters: 5 } },
        },
        { new: true }
      )
    } else {
      data = await User.updateOne(
        {
          _id: user,
          'unlockedContent.seriesId': series,
        },
        { $inc: { 'unlockedContent.$.unlockedChapters': 1 } },
        { upsert: true, new: true }
      )
    }

    res.status(201).json({
      status: 'success',
      data: data,
    })
  } catch (error) {
    if (error.response.status === 404) {
      return res.status(404).json({
        message: 'Series not found! Please check the series ID',
      })
    }

    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}
