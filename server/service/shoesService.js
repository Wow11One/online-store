const {Shoes, ShoesInfo, ShoesSizes, Brand, Type} = require("../models/models")

class ShoesService {
    async getOne(id) {
        const shoes = await Shoes.findOne({
            where: {id},
            include: [
                {model: ShoesInfo, as: 'info'},
                {model: ShoesSizes, as: 'sizes'},
                {model: Brand, as: 'brand'},
                {model: Type, as: 'type'}
            ],
            order: [[{model: ShoesSizes, as: 'sizes'}, 'sizeValue', 'asc']]
        })
        console.log(shoes)
        if (!shoes) {
            throw new Error('no such shoes')
        }

        return shoes
    }
}


module.exports = new ShoesService()
