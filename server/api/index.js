const express = require('express')
const router = express.Router()

require('./routes/product')(router)
 require('./routes/user')(router)
 require('./routes/purchase')(router)
 require('./routes/customer')(router)

module.exports = router
