const {Order, ShoesSizes, Shoes, OrderShoesSizes} = require('../models/models')

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
            const order = await Order.create({
                userId,
                userName,
                userSurname,
                comment,
                deliveryType,
                paymentType,
                ...address
            })

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

    async getAll(limit, page) {
        try {
            let queryParams = {}
            if (limit) {
                page = page || 1
                let offset = limit * (page - 1)
                queryParams = {offset, limit}
            }

            queryParams.order = [['createdAt', 'desc']]
            const orders = await Order.findAndCountAll(queryParams)

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
                    }
                ]
            })

            return order
        } catch (e) {
            return e
        }
    }
}

module.exports = new OrderService()