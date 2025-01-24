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
// Steps: Using mongoose schema, finding research object and confirming password match,after which a jwt is generated and binary image data is stringified and passed along with the remaining researcher data via cookies for dynamic, authenticated, personalized UI
module.exports.authenticateResearcher = async (req, res) =>{
    const foundResearcher = Researcher.findOne({email:req.body.email})
    if(!foundResearcher){
        return res.status(400).json({err: 'Invalid email or password.'})
        
    }
    try{
        const hashedPWMatch = await bcrypt.compare(req.body.password, foundResearcher.password)
        if(!hashedPWMatch){
            return res.status(400).json({err: 'Invalid email or password.'})
        }else if(hashedPWMatch){
            const userToken = jwt.sign({_id:foundResearcher._id, email: foundResearcher.email},KEY);
            const researcherObj = foundResearcher.toObject();
            researcherObj.profileImage && researcherObj.profileImage.data?
            researcherObj.profileImage = Buffer.from(foundResearcher.profileImage.data).toString('base64'):''
            return res.status(201).cookie('userToken', userToken, {httpOnly:true}).json({successMessage: 'Researcher Found & Authenticated', researcherObj: researcherObj})
        }
    }catch(err){
        res.status(400).json({err: 'Invalid email or password.'})
    }
}

// logout (clear cookie send message)

module.exports.logoutResearcher = (req,res)=>{
    res.clearCookie('userToken');
    res.json({msg: 'researcher logged out'})
};