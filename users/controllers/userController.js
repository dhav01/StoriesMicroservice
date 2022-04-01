const User = require('../models/User')

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })
    res.status(201).json({
      status: 'success',
      data: user,
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      })
    }
    res.status(200).json({
      status: 'success',
      user,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    })
  }
}
