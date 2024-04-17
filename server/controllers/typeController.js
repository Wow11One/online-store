const ApiError = require('../error/ApiError')
const typeService = require('../service/typeService')

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const type = await typeService.create(name)
            return res.json({type})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await typeService.getAll(req.query)
            return res.json(types)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const {name} = req.body
            const result = await typeService.update(id, name)
            return res.json(result)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            typeService.delete(id)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        return res.status(200).json({})
    }
}

module.exports = new TypeController()