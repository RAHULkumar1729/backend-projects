const {express,router,cookie,jwt,bcrypt,path,Joi} = require('../utils/backend-utils')
const userModel = require('../models/user-model')
const {generateToken} = require('../utils/generate-token')
const {registerUser,loginUser} = require('../controller/userAuthController')

router.use(express.json())
router.use(express.urlencoded({extended:true}))
router.use(express.static(path.join(__dirname,'public')))
router.use(cookie())



router.get('/',(req,res)=>{
    res.send("hey userRouter is working")
})
router.post('/register',registerUser)
router.post('/login',loginUser)

module.exports = router;