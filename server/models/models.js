const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const {
    ORDER_STATUS_NEW,
    ORDER_STATUS_IN_PROCESS,
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_COMPLETED, PAYMENT_TYPE_UPON_RECEIPT, PAYMENT_TYPE_ONLINE, DELIVERY_TYPE_NOVA_POST,
    DELIVERY_TYPE_COURIER
} = require("../utils/consts");

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})
const Order = sequelize.define('order', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        states: {
            type: DataTypes.ENUM,
            values: [
                ORDER_STATUS_NEW,
                ORDER_STATUS_IN_PROCESS,
                ORDER_STATUS_CANCELLED,
                ORDER_STATUS_COMPLETED
            ],
            allowNull: false,
            defaultValue: ORDER_STATUS_NEW
        },
        userName: {type: DataTypes.STRING, allowNull: false, field: 'user_name'},
        userSurname: {type: DataTypes.STRING, allowNull: false, field: 'user_surname'},
        comment: {type: DataTypes.STRING, allowNull: false},
        paymentType: {
            type: DataTypes.ENUM,
            values: [
                PAYMENT_TYPE_UPON_RECEIPT,
                PAYMENT_TYPE_ONLINE
            ],
            allowNull: false,
            field: 'payment_type'
        },
        deliveryType: {
            type: DataTypes.ENUM,
            values: [
                DELIVERY_TYPE_NOVA_POST,
                DELIVERY_TYPE_COURIER
            ],
            allowNull: false,
            field: 'delivery_type'
        },
        address: {type: DataTypes.STRING},
        postRegion: {type: DataTypes.STRING, field: 'post_region'},
        postCity: {type: DataTypes.STRING, field: 'post_city'},
        postDepartment: {type: DataTypes.STRING, field: 'post_department'}
    }
)
const OrderShoesSizes = sequelize.define('order_shoes_sizes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER, allowNull: false, min: 1}
})

const Shoes = sequelize.define('shoes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
});

const ShoesSizes = sequelize.define('shoes_sizes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sizeValue: {type: DataTypes.DOUBLE, allowNull: false}
})


const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

const ShoesInfo = sequelize.define('shoes_infos', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

Shoes.hasMany(ShoesSizes, {as: 'sizes'})
ShoesSizes.belongsTo(Shoes)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderShoesSizes)
OrderShoesSizes.belongsTo(Order)

ShoesSizes.hasMany(OrderShoesSizes)
OrderShoesSizes.belongsTo(ShoesSizes)

Type.hasMany(Shoes, {onDelete: 'CASCADE'})
Shoes.belongsTo(Type)

Brand.hasMany(Shoes, {onDelete: 'CASCADE'})
Shoes.belongsTo(Brand)

Shoes.hasMany(Rating)
Rating.belongsTo(Shoes)

Shoes.hasMany(ShoesInfo, {as: 'info'})
ShoesInfo.belongsTo(Shoes)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    ShoesSizes,
    Shoes,
    Type,
    Brand,
    Rating,
    ShoesInfo,
    TypeBrand,
    Order,
    OrderShoesSizes
}