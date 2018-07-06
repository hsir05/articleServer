const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
  name:{type:String},
  pwd:{type:String},
  create_at: {type: Date, default: Date.now}
})

const articleSchema = new Schema({
  title:{type:String},
  content: {type:String},
  create_at:{type: Date, default: Date.now},
  auth: {type:String}
})

mongoose.Promise = global.Promise;

const database = mongoose.connect('mongodb://127.0.0.1:27017/articleServe')
console.log(database);
mongoose.connection.on('error', (error) => {
  console.log('数据库articleServe链接失败' + error)
  return
})
mongoose.connection.once('open', () => {
  console.log('数据库articleServe链接成功')
  initDate()
})

const db = {
  userModel: mongoose.model('userModel', userSchema),
  articleModel: mongoose.model('articleModel', articleSchema)
}

const initDate = () => {
  let data = {name:'admin', pwd:'admin'}
  db.userModel.find({}, (err, doc) => {
    if (err) {
      console.log('initDate 出错' + err);
    } else if (!doc.length) {
      db.userModel.create(data)
    }
  })
}

module.exports = db
