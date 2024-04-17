const {Brand} = require("../models/models");
const {Op} = require("sequelize");
const ApiError = require("../error/ApiError");

class BrandService {
    async create(name) {
        const brand = await Brand.create({name})
        return brand
    }

    async getAll(body) {
        let {page, limit, search} = body
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

        return brands
    }

    async update(id, name) {
        const brandToBeUpdated = await Brand.findOne({where: {id}})
        await brandToBeUpdated.update({name})
        await brandToBeUpdated.save()

        return brandToBeUpdated
    }

    async delete(id) {
        Brand.destroy({where: {id}})
    }
}

module.exports = new BrandService()