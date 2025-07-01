const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken(user){
    return jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:'1D'})
}

module.exports.generateToken = generateToken;
