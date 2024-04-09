const uuid = require('uuid')
const path = require('path')
const {Shoes, ShoesInfo, Brand, Type, ShoesSizes} = require('../models/models')
const ApiError = require('../error/ApiError')
const {SORT_CRITERIA} = require("../utils/consts");
const {Op} = require("sequelize")

class ShoesController {
    async create(req, res, next) {
        try {
            console.log(req.body)
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const shoes = await Shoes.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ShoesInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: shoes.id
                    })
                )
            }

            return res.json(shoes)
        } catch (e) {
            next(ApiError.badRequest(e))
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, page, limit, search, order} = req.query

        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices
        if (!order || order.trim().length === 0) {
            order = SORT_CRITERIA[0]
        }
        const orderSplit = order.split(' ')
        order = [orderSplit[0], orderSplit[1]]

        const queryParameters = {}
        if (brandId) {
            queryParameters.brandId = brandId
        }
        if (typeId) {
            queryParameters.typeId = typeId
        }
        if (search && search.trim().length !== 0) {
            queryParameters.name = {[Op.iLike]: '%' + search.trim() + '%'}
        }

        devices = await Shoes.findAndCountAll({
            where: queryParameters,
            limit,
            offset,
            order: [order],
            include: [
                Brand,
                Type
            ]
        })

        return res.json(devices);
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Shoes.findOne({
            where: {id},
            include: [
                {model: ShoesInfo, as: 'info'},
                {model: ShoesSizes, as: 'sizes'},
                {model: Brand, as: 'brand'},
                {model: Type, as: 'type'}
            ],
            order: [[{model: ShoesSizes, as: 'sizes'}, 'sizeValue', 'asc']]
        })

        return res.json(device)
    }

    async getSortCriteria(req, res) {
        return res.json(SORT_CRITERIA)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            Shoes.destroy({where: {id}})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        return res.status(200).json({})
    }
}

module.exports = new ShoesController()