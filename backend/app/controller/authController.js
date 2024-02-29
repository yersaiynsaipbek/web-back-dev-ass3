const authService = require('../services/authService')
const jwtGenerator = require('../utils/jwt/jwt')
const HttpStatus = require('http-status')

exports.login = async(req,res) =>{
    const {username, password} = req.body

    const valid = await authService.authenticate(username,password)

    if (valid) {
        const token = await jwtGenerator.createToken(username)
        res.cookie("jwt-token", token)
        res.status(HttpStatus.OK).json({
            token: token
        })
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({
            message: "Your username or password is incorrect"
        })
    }
}

exports.register = async(req,res)=> {
    const {username, password} = req.body

    const registeredUserData = await authService.authorization(username, password)

    if(registeredUserData == null) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: "I'm so sorry. We have some problem in our server. Try it again later."
        })
    }

    res.status(HttpStatus.CREATED).json({
        message: "Successfully!"
    })
}