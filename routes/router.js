const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/api/article', function(req, res, next) {
  if (req.query.id) {
    db.articleModel.findById({_id:req.query.id}, (err, doc) => {
      if (err) {
        console.log(err)
        res.json({msg:err,status:'-1'})
      } else {
        res.json({status:'0',msg:'success',data:doc})
      }
    })
  } else if (req.query.title) {
    db.articleModel.find({name:/req.query.title/}, (err, doc) => {
      if (err) {
        console.log(err)
        res.json({msg:err,status:'-1'})
      } else {
        res.json({status:'0',msg:'success',data:doc})
      }
    })
  } else {
    db.articleModel.find({}, (err, doc) => {
      if (err) {
        console.log(err)
        res.json({msg:err,status:'-1'})
      } else {
        res.json({status:'0',msg:'success',data:doc})
      }
    })
  }
})

router.post('/api/article', (req, res) => {
  const article = new db.articleModel(req.body, res)
  article.save((err, r) => {
    if (err) {
      console.log(err)
      res.json({msg:err,status:'-1'})
    } else {
      res.json({msg:'success',status:'0'})
    }
  })
})

router.delete('/api/article', (req, res) => {
  db.articleModel.remove({_id:req.query.id}, (err, r) => {
    if (err) {
      console.log(err)
      res.json({msg:err,status:'-1'})
    } else {
      res.json({msg:'success',status:'0'})
    }
  })
})

router.put('/api/article', (req, res) => {
  db.articleModel.update({_id:req.body.id}, req.body, (err, r) => {
    if (err) {
      console.log(err)
      res.json({msg:err,status:'-1'})
    } else {
      res.json({msg:'success',status:'0'})
    }
  })
})

// 用户
router.post('/api/login', (req, res, next) => {
  console.log(req.body);
  if (req.body.pwd) {
    db.userModel.findOne({name:req.body.name,pwd:req.body.pwd}, (err, doc) => {
      if (err) {
        console.log(err)
        res.json({msg:err,status:'-1'})
      } else if (doc && doc.name === req.body.name && doc.pwd === req.body.pwd) {
        res.json({
          status:'0',
          msg:'success',
          data:{
            name:doc.name,
            create_at:doc.create_at,
            id:doc._id
          }
        })
      } else {
        res.json({ status:'-1', msg:'帐号或密码错误' })
      }
    })
  }
})
router.get('/api/users', (req, res, next) => {
  db.userModel.find({}, (err, doc) => {
    if (err) {
      console.log(err)
      res.json({msg:err,status:'-1'})
    } else {
      res.json({status:'0',msg:'success',data:doc})
    }
  })
})

router.post('/api/users', (req, res, next) => {
  const users = new db.userModel(req.body, res)
  users.save((err, r) => {
    if (err) {
      console.log(err)
      res.json({msg:err,status:'-1'})
    } else {
      res.json({msg:'success',status:'0'})
    }
  })
})

router.put('/api/users', (req, res) => {
  console.log(req.body);
  const id = req.body.id
  db.userModel().findByIdAndUpdate(id, {$set: req.body}).then(res=>{
    res.json({status:'0',msg:'success'})
  })

  // users.update(id, req.body, (err, r) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     res.json({
  //
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
  //
  //         status:'0',
  //         msg:'success'
  //       })
  //     })
  //   } else {
  //     res.json({
  //
  //       status:'0',
  //       msg:'没有查询到用户',
  //       data:doc
  //     })
  //   }
  // })
})
module.exports = router
