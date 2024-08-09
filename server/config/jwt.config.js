const jwt = require('jsonwebtoken')
const KEY = process.env.APP_KEY

// create token based on token in req, check for token (if ! return error) verify jwt, attach user data to req, next!,
module.exports.authenticate = (req,res, next) =>{
    const token = req.cookies.userToken
    if(!token){
        res.status(401).json({errorMessage:'Researcher not authenticated, please login'})
    }else{
        jwt.verify(token, KEY,(err, payload) =>{
            err? res.status(401).json({verified:false}): next()
        })
    }
}
// other way of writing it perhaps
// module.exports.authenticate = (req,res, next) =>{
//     const token = req.cookies.userToken
//     if(!token){
//         return res.status(401).json({messageErr:'Not Authenticated or Session Expired, please login'})
//     }
//     jwt.verify(token,KEY,(err,payload)=>{
//         if(err){
//             return res.status(401).json({messageErr:'Not Authenticated or Session Expired, please login'})
//         }else{
//             req.user = payload;
//             next();
//         }
//     });
// };