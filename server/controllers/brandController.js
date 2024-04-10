const {Brand, Device, Shoes, Type} = require("../models/models");
const ApiError = require('../error/ApiError')
const {Op} = require("sequelize");

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        let {page, limit, search} = req.query
        const queryParameters = {}
        let additionalParameters = {}
        if (limit) {
            page = page || 1
            let offset = page * limit - limit
            additionalParameters = {offset, limit}
        }
        if (search && search.trim().length !== 0) {
            queryParameters.name = {[Op.iLike]: '%' + search.trim() + '%'}
        }
        additionalParameters.order = [['createdAt', 'asc']]
        const brands = await Brand.findAndCountAll({
            where: queryParameters,
            ...additionalParameters
        })

        return res.json(brands)
    }

    async update(req, res) {
        const {id} = req.params
        const {name} = req.body
        const brandToBeUpdated = await Brand.findOne({where: {id}})
        await brandToBeUpdated.update({name})
        await brandToBeUpdated.save()

        return res.json(brandToBeUpdated)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            Brand.destroy({where: {id}})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        return res.status(200).json({})
    }
}

module.exports = new BrandController()