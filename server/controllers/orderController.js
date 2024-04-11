const orderService = require('../service/orderService')
const ApiError = require("../error/ApiError");

class OrderController {
    async create(req, res, next) {
        try {
            const order = req.body
            return res.json(await orderService.create(order))
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {limit, page} = req.query
            return res.json(await orderService.getAll(limit, page))
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            return res.json(await orderService.getOne(id))
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrderController()