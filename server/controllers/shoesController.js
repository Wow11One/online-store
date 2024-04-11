const uuid = require('uuid')
const path = require('path')
const {Shoes, ShoesInfo, Brand, Type, ShoesSizes} = require('../models/models')
const ApiError = require('../error/ApiError')
const {SORT_CRITERIA} = require("../utils/consts")
const {Op} = require("sequelize")
const shoeService = require('../service/shoesService')

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
            order = 'createdAt asc'
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

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const shoes = await shoeService.getOne(id)
            return res.json(shoes)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getSortCriteria(req, res) {
        return res.json(SORT_CRITERIA)
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            let {name, brandId, typeId, price, sizes, info} = req.body
            info = JSON.parse(info)

            if (req.files) {
                const {img} = req.files
                let fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                await shoesToBeUpdated.update({img: {fileName}})
            }


            const shoesToBeUpdated = await Shoes.findOne({where: {id}})
            await shoesToBeUpdated.update({name, brandId, typeId, price})

            let currentShoesInfo = await ShoesInfo
                .findAll({where: {shoId: id}})

            for (const infoId of currentShoesInfo.map(item => item.id)) {
                if (!info.map(item => item.id).includes(infoId)) {
                    await ShoesInfo.destroy({where: {id: infoId}})
                } else {
                    info = info.filter(item => item.id !== infoId)
                }
            }
            if (info.length !== 0) {
                for (const item of info) {
                    await ShoesInfo.create({
                        title: item.title,
                        description: item.description,
                        shoId: id
                    })
                }
            }
            await shoesToBeUpdated.save()

            return res.json(shoeService.getOne(id))
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            await Shoes.destroy({where: {id}})

        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message))
        }
        return res.status(200).json({})
    }
}

module.exports = new ShoesController()