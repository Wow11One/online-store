const Router = require('express')
const router = new Router()
const deviceRouter = require('./shoesRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')
const novaPostApiRouter = require('./novaPostApiRouter')

router.use('/users', userRouter)
router.use('/brands', brandRouter)
router.use('/types', typeRouter)
router.use('/shoes', deviceRouter)
router.use('/orders', orderRouter)
router.use('/nova-post', novaPostApiRouter)

module.exports = router