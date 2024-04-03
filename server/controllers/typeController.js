const {Type, Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json({type})
    }

    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            Type.destroy({where: {id}})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        return res.status(200).json({})
    }
}

module.exports = new TypeController()