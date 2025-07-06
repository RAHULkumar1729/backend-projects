const express = require('express')
const app = express()
const cookie = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')
const expressSession = require('express-session')
const flash = require('connect-flash')
const ownersRoutes = require('./routes/ownersRoutes')
const usersRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRouters')
const indexRoutes = require('./routes/index')

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({extended:true}))
app.use(
  expressSession({
    resave: false,//prevent saving session back if nothing was changed
    saveUninitialized: false,//Avoid storing session for unathurizated user
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {
      httpOnly: true, // Prevent client-side JS access to the cookie
      secure: false, // Set to true in production (HTTPS only)
      maxAge: 1000 * 60 * 60, // 1 hour session
    },
  })
);
app.use(flash())


app.use('/',indexRoutes)
app.use('/owner',ownersRoutes)
app.use('/user',usersRoutes)
app.use('/product',productRoutes)

app.listen(3000)