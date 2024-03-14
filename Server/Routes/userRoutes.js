const express = require('express')
const router = express.Router()
const { registerController, loginController } = require('../controllers/userCtrl')

router.post('/signup', registerController)
router.post('/login', loginController)

module.exports = router