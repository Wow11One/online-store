const Router = require('express')
const router = new Router()
const shoesController = require('../controllers/shoesController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), shoesController.create)
router.get('/', shoesController.getAll)
router.get('/sort-criteria', shoesController.getSortCriteria)
router.get('/:id', shoesController.getOne)
router.put('/:id', shoesController.update)
router.delete('/:id', checkRole('ADMIN'), shoesController.delete)

module.exports = router