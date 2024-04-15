const Router = require('express')
const router = new Router()
const novaPostApiController = require('../controllers/novaPostApiController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/regions', novaPostApiController.getRegions)
router.get('/cities', novaPostApiController.getCitiesByRegion)
router.get('/departments', novaPostApiController.getDepartmentsByCity)

router.get('/regions/:id', novaPostApiController.getRegionById)
router.get('/cities/:id', novaPostApiController.getCityById)
router.get('/departments/:id', novaPostApiController.getDepartmentById)

module.exports = router