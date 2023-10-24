const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET || 'testScret', {expiresIn: '1h'}, (err, token) => {
            if(err) reject(err)
            resolve(token)
        })
    })
}

class AuthController {
    async register (request, response, next){
        const { email, password, fullname, birthDate, cellphone } = request.body
            try {
                let user = await User.findOne({email})
                if(user){
                    return response.status(400).json({
                        message: 'User already exists'
                    })
                }
                
                user= new User({
                email, password, fullname, birthDate, cellphone    
                })
        
                await user.save()
                
                const payload = {
                    userId: user.id
                }
                const token = await generateToken({payload})


                response.status(201).json({
                    email, password, fullname, birthDate, cellphone, token
                })

            } catch (error) {
                console.log(error)
                response.status(500).json({
                    message: 'Internal server error'
                })
            }
        }

    async login (request, response, next){
        const { email, password } = request.body
        try {
            let user = await User.findOne({email})
            if(!user){
                return response.status(400).json({
                    message: 'Invalid credentials'
                })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return response.status(400).json({
                    message: 'Invalid credentials'
                })
            }
            const payload = {
                userId: user.id,
                email: user.email,
                fullname: user.fullname,
                birthDate: user.birthDate,
            }
            const token = await generateToken({userId: user.id})
            response.json({token, ...payload})
        } catch (error) {
            console.log(error)
            response.status(500).json({
                message: 'Internal server error'
            })
        }
    }

    }

module.exports = new AuthController()