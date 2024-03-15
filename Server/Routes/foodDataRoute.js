const express = require('express')
const router = express.Router()
const {fooditems} = require('../controllers/foodDataCtrl')

router.post('/foodData',fooditems)

module.exports = router