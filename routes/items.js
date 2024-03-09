const express = require('express')
const router = express.Router()
const { authenticated } = require('../middleware/api-auth')
const itemController = require('../controllers/item-controller')
const upload = require('../middleware/multer')

router.post('/items', authenticated, upload.single('photo'), itemController.postItem)

module.exports = router 