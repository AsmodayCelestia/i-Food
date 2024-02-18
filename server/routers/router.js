const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const {authentication} = require('../middlewares/authentication')

router.post('/login', Controller.login)
router.post('/googleLogin', Controller.googleLogin)
router.post('/register', Controller.register)
router.get('/menu', Controller.allMenu)
router.get('/menu/:id', Controller.menu)
router.post('/transaction', authentication, Controller.transaction)
router.post('/cart', authentication, Controller.addCart)
router.get('/cart', authentication, Controller.allCart)
router.post('/payment', authentication, Controller.payment)

module.exports = router