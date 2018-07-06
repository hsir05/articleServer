const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/api/article', function(req, res, next) {
  db.articleModel.find({}, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
        status:'0',
        msg:'success',
        data:doc
      })
    }
  })
})

router.post('/api/article', (req, res) => {
  console.log(req.body)
  const article = new db.articleModel(req.body, res)
  article.save((err, r) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        code: 200,
        msg:'success',
        status:'0'
      })
    }
  })
})
router.delete('/api/article', (req, res) => {
  console.log(req.body)
  db.articleModel.remove({_id:req.body.id}, (err, r) => {
    if (err) {
      console.log(err)
    } else {
      res.json({code: 200,msg:'success',status:'0'})
    }
  })
})
router.put('/api/article', (req, res) => {
  console.log(req.body)
  db.articleModel.update({_id:req.body.id}, req.body, (err, r) => {
    if (err) {
      console.log(err)
    } else {
      res.json({code: 200,msg:'success',status:'0'})
    }
  })
})
router.get('/api/users', (req, res, next) => {
  db.userModel.find({}, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        code: 200,
        status:'0',
        msg:'success',
        data:doc
      })
    }
  })
})

router.post('/api/users', (req, res, next) => {
  console.log(req.body)
  const users = new db.userModel(req.body, res)
  users.save((err, r) => {
    if (err) {
      console.log(err)
    } else {
      res.json({
        code: 200,
        msg:'success',
        status:'0'
      })
    }
  })
})

router.put('/api/users', (req, res) => {
  // const users = new db.userModel()
  console.log(req.body);
  const id = req.body.id
  db.userModel().findByIdAndUpdate(id, {$set: req.body}).then(res=>{
    res.json({
      code: 200,
      status:'0',
      msg:'success'
    })
  })

  // users.update(id, req.body, (err, r) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     res.json({
  //       code: 200,
  //       status:'0',
  //       msg:'success'
  //     })
  //   }
  // })
  // db.userModel.findById({_id:req.body.id}, (err, doc) => {
  //   if (err) {
  //     console.log(err);
  //   } else if (doc) {
  //     users.update((err, r) => {
  //       res.json({
  //         code: 200,
  //         status:'0',
  //         msg:'success'
  //       })
  //     })
  //   } else {
  //     res.json({
  //       code: 200,
  //       status:'0',
  //       msg:'没有查询到用户',
  //       data:doc
  //     })
  //   }
  // })
})
module.exports = router
