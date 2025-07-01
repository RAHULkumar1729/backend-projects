const express = require('express')
const app = express()
const cookie = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')
const ownersRoutes = require('./routes/ownersRoutes')
const usersRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRouters')

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({extended:true}))

app.use('/owner',ownersRoutes)
app.use('/user',usersRoutes)
app.use('/product',productRoutes)
app.get('/',(req,res)=>{
    res.render('index',{error:""})
})

app.listen(3000)