const Researcher = require('../models/researcher.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const KEY = process.env.APP_KEY

/*// register & create a Researcher 
    Using the mongoose schema, controller creates a new researcher document, generates a usertoken authenticate and authorize user, and passes json web token and a user objet with a stringified buffer data, so that client can dynamically build personalized UI.
*/
module.exports.registerResearcher = async(req, res) =>{
    const {firstName, lastName, userName, email, password, discipline, researcherStatus} = req.body
    try{
        const newResearcher = await Researcher.create({
            firstName,
            lastName,
            userName,
            email,
            password,
            discipline: JSON.parse(discipline),
            researcherStatus: JSON.parse(researcherStatus),
            profileImage: req.file.buffer})
            const userToken = jwt.sign({_id: newResearcher._id, email: newResearcher.email}, KEY);
            let researchObj = newResearcher.toObject();
            if(researchObj.profileImage && researchObj.profileImage.data){
                researchObj.profileImage = Buffer.from(newResearcher.profileImage.data).toString('base64');
            }
            return res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage:"Researcher successfully created and registered", researcherData: researchObj})
    }catch(err){
        res.status(400).json({err:"Server Error occurred when registering researcher"})
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