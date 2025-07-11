const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedin')

router.get('/',(req,res)=>{
    let error = req.flash("error")
    res.render('index',{error})
});

router.get('/shop',isLoggedIn,(req,res)=>{
    res.render('shop')
})

module.exports = router;