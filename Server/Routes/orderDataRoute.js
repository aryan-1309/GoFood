const express = require('express')
const { orderDataController } = require('../controllers/orderDataCtrl')
const router = express()

router.post('/orderData', orderDataController)

module.exports = router