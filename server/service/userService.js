const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserService {
    async registration(body) {
        const {email, password, role} = body
        if (!email || !password) {
            throw new Error('not correct email or password')
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            throw new Error('user with such email already exists')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)

        return token
    }

    async login(body) {
        const {password, email} = body
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw new Error('email or password is not found')
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            throw new Error('password is not correct')
        }
        const token = generateJwt(user.id, user.email, user.role)

        return token
    }

    async check(user) {
        const token = generateJwt(user.id, user.email, user.role)
        return token
    }
}

module.exports = new UserService()