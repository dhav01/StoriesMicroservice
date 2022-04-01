const Content = require('../models/Content')
const axios = require('axios')
const { Console, log } = require('console')

exports.createContent = async (req, res) => {
  try {
    const data = req.body

    const content = await Content.insertMany(data)
    res.status(201).json({
      status: 'success',
      data: content,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.getAllContents = async (req, res) => {
  try {
    const content = await Content.find()
    const totalSeries = content.length
    res.status(200).json({
      status: 'success',
      seriesAvailable: totalSeries,
      data: content,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}

findCount = (user, content) => {
  if (user.unlockedContent.length === 0) {
    return 0
  }

  let index = user.unlockedContent.findIndex(
    (serie) => serie.seriesId.toString() === content.toString()
  )

  if (index === -1) {
    return 0
  } else {
    return user.unlockedContent[index].unlockedChapters
  }
}

exports.getContent = async (req, res) => {
  try {
    const id = req.params.id
    const content = await Content.findById(id)

    if (!content) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid series or user Id',
      })
    }

    res.status(200).json({
      status: 'success',
      data: content,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}

exports.getContentForUser = async (req, res) => {
  try {
    const { userId } = req.params
    let config = {
      method: 'get',
      url: `https://rhubarb-crisp-80148.herokuapp.com/users/${userId}`,
    }
    const user = await axios(config)

    let unlockedSeries = user.data.user

    let totalEp = 0
    let watchableEp = 0

    var series = []
    const data = await Content.find()
    data.map((content) => {
      totalEp += content.episodes.length
      let episodeCount = Math.max(findCount(unlockedSeries, content._id), 4)

      const newData = {
        title: content.title,
        description: content.description,
        image: content.image,
        episodes: content.episodes.slice(0, episodeCount),
      }
      watchableEp += newData.episodes.length
      series.push(newData)
    })

    res.status(200).json({
      status: 'success',
      data: {
        totalEp: totalEp,
        watchableEp: watchableEp,
        series,
      },
    })
  } catch (error) {
    if (error.response.status === 404) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found. Please enter a valid user Id',
      })
    }
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}
