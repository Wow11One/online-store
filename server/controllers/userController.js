const ApiError = require('../error/ApiError')
const userService = require('../service/userService')


class UserController {
    async registration(req, res, next) {
        try {
            return res.json({token: await userService.registration(req.body)})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            return res.json({token: await userService.login(req.body)})
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        try {
            return res.json({token: await userService.check(req.user)})
        } catch (e) {
            console.log(e.message)
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()