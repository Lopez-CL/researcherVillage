const researcherController = require('../controllers/researcher.controller');
const multer = require('multer');
const path = require('path');
const path = require('path');
// multer configuration which is middleware that process multipart/form data. It must store file in memory as buffer, indicate filesize limits, and verify mimietype and extname/file path, and finally indicate whether to accept the file or not via a condition
const verifyUpload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5*1024*1024},
    fileFilter: function(req,file, cb){
        if(file){
        const fileTypes = /png|jpg|jpeg/;
        const mimetype = fileTypes.test(req.file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname.toLowerCase()))
        if(mimetype && extname){
            return cb(null,true)
        }else{
            return cb(`Error: Issue with file upload, please ensure correct file size and/or type: ${fileTypes}.`)
        }};
    }
})
// in addtional to route, build the post path and other arguments (verify, call to the register function, and anonymous function)
module.exports = app =>{
    app.post('/api/registerResearcher', verifyUpload.single('profileImage'), researcherController.registerResearcher, (error,req,res,next)=>{
        if(error instanceof multer.MulterError){
            res.status(400).json({errorMsg: error})
        }else if(error){
            res.status(500).json({error:error.message});
        }
    })
    app.post('/api/loginResearcher', researcherController.loginResearcher);
}