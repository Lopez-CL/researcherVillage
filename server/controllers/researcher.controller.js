const Researcher = require('../models/researcher.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const KEY = process.env.APP_KEY

module.exports.registerResearcher = async (req,res) =>{
    try{
        const newResearcher = await Researcher.create(req.body);
        const userToken = jwt.sign({_id: newResearcher._id, email: newResearcher.email}, KEY)
        res.status(201).cookie('userToken', userToken,{httpOnly: true}).json({successMessage: 'Research registered', user: newResearcher})
    }catch(error){
        res.status(400).json(error)
    }
};

