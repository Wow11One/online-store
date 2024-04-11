const {Shoes, ShoesInfo, ShoesSizes, Brand, Type} = require("../models/models")

class ShoesService {
    async getOne(id) {
        const shoes = Shoes.findOne({
            where: {id},
            include: [
                {model: ShoesInfo, as: 'info'},
                {model: ShoesSizes, as: 'sizes'},
                {model: Brand, as: 'brand'},
                {model: Type, as: 'type'}
            ],
            order: [[{model: ShoesSizes, as: 'sizes'}, 'sizeValue', 'asc']]
        })

        return shoes
    }
}


module.exports = new ShoesService()
