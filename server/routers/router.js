const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const {authentication} = require('../middlewares/authentication')

router.post('/ifood/login', Controller.login)
router.post('/ifood/googleLogin', Controller.googleLogin)
router.post('/ifood/register', Controller.register)
router.get('/ifood/menu', Controller.allMenu)
router.get('/ifood/menu/:id', Controller.menu)
router.post('/ifood/transaction', authentication, Controller.transaction)
router.post('/ifood/cart', authentication, Controller.addCart)
router.get('/ifood/cart', authentication, Controller.allCart)
router.post('/ifood/payment', authentication, Controller.payment)

module.exports = router