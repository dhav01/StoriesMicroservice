const router = require('express').Router()
const {
  createContent,
  getContent,
  getAllContents,
  getContentForUser,
} = require('../controllers/contentController')

router.route('/').post(createContent).get(getAllContents)
router.route('/id/:id').get(getContent)
router.route('/user/:userId').get(getContentForUser)

module.exports = router
