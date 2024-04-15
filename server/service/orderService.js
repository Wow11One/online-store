const {Order, ShoesSizes, Shoes, OrderShoesSizes, User} = require('../models/models')
const {Op} = require("sequelize");
const {DELIVERY_TYPE_NOVA_POST} = require("../utils/consts");

const addToBasket = (basket, orderId) => {
    basket = JSON.parse(basket)
    basket.forEach(item => {
        OrderShoesSizes.create({
            shoesSizeId: item.id,
            orderId,
            amount: item.amount
        })
    })
}

class OrderService {
    async create({
                     userId,
                     userName,
                     userSurname,
                     comment,
                     deliveryType,
                     address,
                     paymentType,
                     basket
                 }) {
        try {
            address = JSON.parse(address)
            const order = await Order.create({
                userId,
                userName,
                userSurname,
                comment,
                deliveryType,
                paymentType,
                ...address
            })

            addToBasket(basket, order.id)

            return order
        } catch (e) {
            return e
        }
    }

    async create({
                     userId,
                     userName,
                     userSurname,
                     comment,
                     deliveryType,
                     address,
                     paymentType,
                     basket
                 }) {
        try {
            address = JSON.parse(address)
            const order = await Order.create({
                userId,
                userName,
                userSurname,
                comment,
                deliveryType,
                paymentType,
                ...address
            })
            basket = JSON.parse(basket)
            basket.forEach(item => {
                OrderShoesSizes.create({
                    shoesSizeId: item.id,
                    orderId: order.id,
                    amount: item.amount
                })
            })

            return order
        } catch (e) {
            return e
        }
    }

    async getAll(limit, page, search, state) {
        try {
            let generalParams = {}
            let queryParams = {}
            if (limit) {
                page = page || 1
                let offset = limit * (page - 1)
                generalParams = {offset, limit}
            }
            generalParams.order = [['createdAt', 'desc']]
            generalParams.include = [
                {
                    model: User, as: 'user'
                }
            ]

            if (state && state.trim().length !== 0) {
                queryParams = {...queryParams, state}
            }
            console.log(state)
            if (search && search.trim().length !== 0) {
                search = '%' + search.trim() + '%'
                queryParams = {
                    ...queryParams,
                    [Op.or]: [
                        {userName: {[Op.iLike]: search}},
                        {userSurname: {[Op.iLike]: search}}
                    ]
                }
            }
            const orders = await Order.findAndCountAll({...generalParams, where: queryParams})

            return orders
        } catch (e) {
            return e
        }
    }

    async getOne(id) {
        try {
            const order = await Order.findOne({
                where: {id},
                include: [
                    {
                        model: OrderShoesSizes,
                        include: [
                            {model: ShoesSizes, include: [Shoes]}
                        ]
                    },
                    {
                        model: User
                    }
                ]
            })

            return order
        } catch (e) {
            return e
        }
    }

    async update({
                     id,
                     userName,
                     userSurname,
                     comment,
                     deliveryType,
                     address,
                     paymentType,
                     basket,
                     state
                 }) {
        try {
            address = JSON.parse(address)
            let order = await Order.findOne({where: {id}})
            if (deliveryType === DELIVERY_TYPE_NOVA_POST) {
                address.address = null
            } else {
                address.postRegion = null
                address.postCity = null
                address.postDepartment = null
            }
            order.update({
                userName,
                userSurname,
                comment,
                deliveryType,
                paymentType,
                state,
                ...address
            })
            await OrderShoesSizes.destroy({where: {orderId: id}})

            addToBasket(basket, order.id)

            return order
        } catch (e) {
            return e
        }
    }
}

module.exports = new OrderService()