const router = require('express').Router()
const {
  createUser,
  getAllUsers,
  getUser,
} = require('../controllers/userController')
const { unlockChapters } = require('../controllers/dailyPass')

router.route('/').post(createUser).get(getAllUsers)
router.route('/:id').get(getUser)

router.route('/:user/:series').post(unlockChapters)

module.exports = router
