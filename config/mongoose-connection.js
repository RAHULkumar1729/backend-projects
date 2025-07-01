const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const dbgr = require('debug')("development:mongoose")

mongoose.connect(process.env.MOONGO_URL)
.then(()=>{dbgr('database connected')})
.catch((err)=>{
    console.log("DB error",err)
    dbgr(`there is an error while connecting db ${err}`)})

module.exports = mongoose.connection;

//for running debug use first 
//  $env:DEBUG="development:*"
//  $env:DEBUG="" to stop showing 