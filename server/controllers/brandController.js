const ApiError = require('../error/ApiError')
const brandService = require('../service/brandService')

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const brand = await brandService.create(name)
            return res.json(brand)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await brandService.getAll(req.query)
            return res.json(brands)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {name} = req.body
            const result = await brandService.update(id, name)
            return res.json(result)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            await brandService.delete(id)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
        return res.status(200).json({})
    }
}

module.exports = new BrandController()