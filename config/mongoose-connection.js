const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MOONGO_URL)
.then(()=>{console.log('database connected')})
.catch((err)=>{console.log(`there is an error while connecting db ${err}`)})

module.exports = mongoose.connection;