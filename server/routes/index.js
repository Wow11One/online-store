const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')

router.use('/users', userRouter)
router.use('/baskets', basketRouter)
router.use('/brands', brandRouter)
router.use('/types', typeRouter)
router.use('/shoes', deviceRouter)

module.exports = router