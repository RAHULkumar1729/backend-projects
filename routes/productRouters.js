const express = require('express')
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("hey ProductRouter is working")
})

module.exports = router;   