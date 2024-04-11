const ApiError = require("../error/ApiError");
const novaPostApiService = require('../service/novaPostApiService')

class NovaPostApiController {
    async getRegions(req, res, next) {
        try {
            return res.json(await novaPostApiService.getRegions())
        } catch (e) {
            return next(ApiError.badRequest(e))
        }
    }

    async getCitiesByRegion(req, res, next) {
        try {
            const {regionId} = req.query
            return res.json(await novaPostApiService.getCitiesByRegion(regionId))
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async getDepartmentsByCity(req, res, next) {
        try {
            const {cityId} = req.query
            return res.json(await novaPostApiService.getDepartmentsByCity(cityId))
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new NovaPostApiController()