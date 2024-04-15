const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const checkRole = require("../middleware/checkRoleMiddleware")
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, orderController.create)
router.get('/', checkRole('ADMIN'), orderController.getAll)
router.get('/:id', checkRole('ADMIN'), orderController.getOne)
router.put('/:id', checkRole('ADMIN'), orderController.update)

module.exports = router