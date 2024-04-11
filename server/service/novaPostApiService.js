const {NOVA_POST_API_URL} = require("../utils/consts")


const fetchData = async (parameters) => {
    const res = await fetch(NOVA_POST_API_URL, {
        method: 'POST',
        body: JSON.stringify(parameters)
    })
    const body = await res.json()

    return body.data
}

class NovaPostApiService {
    async getRegions() {
        const parameters = {
            modelName: 'Address',
            calledMethod: 'getAreas',
        }
        const data = await fetchData(parameters)
        const res = data.map(region => {
            return {
                id: region.Ref,
                name: region.Description === 'АРК'
                    ? region.Description
                    : region.Description + ' область'
            }
        })

        return res
    }

    async getCitiesByRegion(regionId) {
        if (!regionId) {
            throw new Error('region cant be null')
        }
        const parameters = {
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: {
                AreaRef: regionId
            }
        }
        const data = await fetchData(parameters)
        const res = data.map(city => {
            return {
                id: city.Ref,
                name: city.Description
            }
        })

        return res
    }

    async getDepartmentsByCity(cityId) {
        if (!cityId) {
            throw new Error('cityId cant be null')
        }
        const parameters = {
            modelName: 'Address',
            calledMethod: 'getWarehouses',
            methodProperties: {
                CityRef: cityId
            }
        }
        const data = await fetchData(parameters)
        const res = data.map(city => {
            return {
                id: city.Ref,
                name: city.Description
            }
        })

        return res
    }
}

module.exports = new NovaPostApiService()