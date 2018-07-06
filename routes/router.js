const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/api/article', function(req, res, next) {
  res.json({
    "return_code": "0",
    "return_message": "success",
    "result": []
  })
})

router.get('/api/users', function(req, res, next) {
  res.json({
    "return_code": "0",
    "return_message": "success",
    "result": []
  })
})
module.exports = router
