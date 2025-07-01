const express = require('express')
const router = express.Router();
const ownerModel = require('../models/owners-model')

router.get('/',(req,res)=>{
    res.send("hey OwnerRouter is working")
})

if(process.env.NODE_ENV === "development"){
    router.post('/create',async (req,res)=>{
        let owners = await ownerModel.find()
        if(owners.length > 0){
            return res
            .status(500)
            .send("You don't have permission to create owner more")
        }
        let {username,email,password} = req.body;

        let createdOwner = await ownerModel.create({
            username,
            email,
            password
        })
        res.send(createdOwner)
    })
}

module.exports = router;