const jwt = require("jsonwebtoken");
const userModel = require('../models/user-model')


module.exports = async function(req,res,next){
    let token = req.cookies.token
    if(!token){
        req.flash("error","You need to login first")
        res.redirect('/')
    }
    try{
        let decode = jwt.verify(token,process.env.JWT_SECRET)
        let user = await userModel.findOne({email:decode.email}).select('-password')
        //select('-password') is to not get the password as it is login
        //and getting password from middleware is dangerous
        //so select('-password')->take all except password 
        req.user = user
        next()
    }catch(err){
        res.flash("error","something went wrong")
        res.redirect('/')
    }
}
