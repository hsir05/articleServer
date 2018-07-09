
export default class dbOperat {
  this.total = 0
  dbQuery (dbModel, queryParams, done) {

    dbModel.count().exec((err, count) => {
      if (err) {
        console.log(err)
      } else {
        this.total = count
      }
    })

    const start = (parseInt(queryParams.page) - 1) * parseInt(queryParams.pageSize)

    dbModel.find({}).skip(start).limit(queryParams.pageSize).populate('').sort(queryParams.sort).exec(done(err, doc, this.total))
  }
}
