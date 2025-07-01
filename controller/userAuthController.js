const {bcrypt,Joi} = require('../utils/backend-utils')
const userModel = require('../models/user-model')
const {generateToken} = require('../utils/generate-token')

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required() // don't check length here for security reasons
});

module.exports.registerUser = async function (req,res){
    try{
        let {error} = registerSchema.validate(req.body)
        if(error) return res.status(400).json({message:error.details[0].message})
        
        let {fullname, email, password} = req.body;

        let checkingUser = await userModel.findOne({email})
        if(checkingUser) return res.status(409).json({message:"User already exist"})

        bcrypt.genSalt(10,async (err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                let createdUser = await userModel.create({
                    fullname,
                    email,
                    password:hash
                })
                let token = generateToken(createdUser)
                res.cookie("token", token, {
                  httpOnly: true, // protect against XSS
                  secure: process.env.NODE_ENV === "production", // use HTTPS in production
                  maxAge: 24 * 60 * 60 * 1000, // 1 day
                });
                res.status(201).json({
                    message:"User registed successfully",
                    user:{
                        id:createdUser._id,
                        name:createdUser.fullname,
                        email:createdUser.email
                    }
                })
            })
        })
    }catch(e){
        console.log(e)
    }
}

module.exports.loginUser = async function(req,res){
    try{
        let { error } = loginSchema.validate(req.body);
        if (error)
          return res.status(400).json({ message: error.details[0].message });

        let { email, password } = req.body;

        let loginUser = await userModel.findOne({ email });
        if (!loginUser) res.redirect("/register");

        bcrypt.compare(password, loginUser.password, (err, result) => {
          if (result) {
            let token = generateToken(loginUser);
            res.cookie("token", token, {
                  httpOnly: true, // protect against XSS
                  secure: process.env.NODE_ENV === "production", // use HTTPS in production
                  maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            res.status(201).json({
                message:"user can login successfully"
            })
          } else {
            res.status(404).send(err);  
          }
        });
    }
    catch(err){
        console.log(err)
    }
}