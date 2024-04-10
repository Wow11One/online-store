const {Type, Device, Brand} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Op} = require("sequelize");

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json({type})
    }

    async getAll(req, res) {
        let {page, limit, search} = req.query
        const queryParameters = {}
        let additionalParams = {}
        if (limit) {
            console.log()
            page = page || 1
            let offset = page * limit - limit
            additionalParams = {offset, limit}
        }
        if (search && search.trim().length !== 0) {
            queryParameters.name = {[Op.iLike]: '%' + search.trim() + '%'}
        }
        additionalParams.order = [['createdAt', 'asc']]
        const types = await Type.findAndCountAll({
            where: queryParameters,
            ...additionalParams
        })

        return res.json(types)
    }

    async update(req, res, next) {
        const {id} = req.params
        const {name} = req.body
        const typeToBeUpdated = await Type.findOne({where: {id}})
        await typeToBeUpdated.update({name})
        await typeToBeUpdated.save()

        return res.json(typeToBeUpdated)
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