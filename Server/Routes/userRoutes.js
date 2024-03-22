const express = require('express')
const router = express.Router()
const { registerController, loginController, authController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/signup', registerController)
router.post('/login', loginController)
router.post('/getUserData', authMiddleware, authController)

module.exports = router