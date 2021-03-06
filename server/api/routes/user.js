const User = require('../../models/user')

module.exports = function (router) {
  router.get('/user', function (req, res) {
      User.find().exec()
        .then(docs => res.status(200)
            .json(docs))
        .catch(err => res.status(500)
            .json({
              message: 'Error finding user',
              error: err
            }))
  })
  router.get('/user/:id', function (req, res) {
    User.findById(req.params.id).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })

  router.get('/user/email/:email', function (req, res) {
    User.find({ 'email': req.params.email }).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })

  router.post('/user', function (req, res) {
    let user = new User(req.body)
      console.log(req.body)
    user.save(function (err, user) {
      if (err) return console.log(err)
      res.status(200).json(user)
    })
  })

  router.put('/user/:id', function (req, res) {
    console.log('update record', req.body)
    let qry = { _id: req.params.id }
      const doc = { first, last, email, password, isActive } = req.body

    //   let doc = {
    //   first: req.body.first,
    //   last: req.body.last,
    //   email: req.body.email,
    //   password: req.body.password,
    //   isActive: req.body.isActive
    // }
    console.log(doc)
    User.update(qry, doc, function (err, respRaw) {
      if (err) return console.log(err)
      res.status(200).json(respRaw)
    })
  }),
      // delete user from database
      router.delete('/user/:id', function (req, res) {
          console.log('iam in delete record' ,req.body)
          let qry = {_id: req.params.id}
          User.remove(qry, function (err, respRaw) {
              if (err) return console.log(err)
              res.status(200).json(respRaw)
          })
      })

}







