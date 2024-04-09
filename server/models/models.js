const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketShoes = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Shoes = sequelize.define('shoes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})

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

const ShoesInfo = sequelize.define('shoes_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

Shoes.hasMany(ShoesSizes, {as: 'sizes'})
ShoesSizes.belongsTo(Shoes)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketShoes)
BasketShoes.belongsTo(Basket)

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
    Basket,
    BasketShoes,
    ShoesSizes,
    Shoes,
    Type,
    Brand,
    Rating,
    ShoesInfo,
    TypeBrand
}