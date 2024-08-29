const Researcher = require('../models/researcher.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const KEY = process.env.APP_KEY

// register & create a Researcher
// Steps: module export, (try create, user token, response), catch error response
module.exports.registerResearcher = async (req,res) =>{
    const {userName, discipline, researcherStatus, email, password} = req.body;
    try{
        const newResearcher = await Researcher.create({
            userName,
            discipline: JSON.parse(discipline),
            researcherStatus: JSON.parse(researcherStatus),
            email,
            password,
            profileImage: req.file.buffer
        })
        const userToken = jwt.sign({_id: newResearcher._id, email: newResearcher.email}, KEY);
        res.status(201).cookie('userToken', userToken,{httpOnly:true}).json({successMessage: 'Researcher created and registered'});
    }catch(err){
        res.status(400).json({err: 'Issue with registration'})
    }
}

// Authenticate/Validate on Login
// Steps: module export, ( find, if not found(err res)else try(compare pw, user token, response)), catch error response

module.exports.loginResearcher = async (req, res) =>{
    const foundResearcher = await Researcher.findOne({email:req.body.email});
    if(!foundResearcher){
        res.status(400).json({errMessage: 'Invalid Email or Password'})
    }else{
        try{
            const pwConfirm = await bcrypt.compare(req.body.password, foundResearcher.password)
            if(!pwConfirm){
                return res.status(400).json({errMessage: 'Invalid Email or Password'})
            }
            const userToken = jwt.sign({_id: foundResearcher._id, email: foundResearcher.email}, KEY);
            let researcherObj = foundResearcher.toObject();
            if(researcherObj.profileImage && researcherObj.profileImage.data){
                researcherObj.profileImage = Buffer.from(researcherObj.profileImage.data).toString('base64');
            }
            return res.status(201).cookie('userToken', userToken,{httpOnly:true}).json({successMessage:'Logged Researcher in',
                researcherData: researcherObj
            })
        }catch(err){
            res.status(400).json({err: 'Invalid Email or Password'})
        }
    }
}

// logout (clear cookie send message)

module.exports.logoutResearcher = (req,res)=>{
    res.clearCookie('userToken');
    res.json({msg: 'researcher logged out'})
};