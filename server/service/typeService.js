const {Type} = require('../models/models')
const {Op} = require('sequelize')

class TypeService {
    async create(name) {
        return await Type.create({name})
    }

    async getAll(body) {
        let {page, limit, search} = body
        const queryParameters = {}
        let additionalParams = {}
        if (limit) {
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

        return types
    }

    async update(id, name) {
        const typeToBeUpdated = await Type.findOne({where: {id}})
        await typeToBeUpdated.update({name})
        await typeToBeUpdated.save()

        return typeToBeUpdated
    }

    async delete(id) {
        await Type.destroy({where: {id}})
    }
}

module.exports = new TypeService()