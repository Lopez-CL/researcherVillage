const researcherController = require('../controllers/researcher.controller');
const multer = require('multer');
const path = require('path');
// the following is an instance of multer that can be used to process multi-part form data. Specifically, we're placing this middle here as a way to catch and verify the file upload triggered by the register and update routes.
const verifyUpload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5*1014*1024},
    fileFilter: function(req,file,cb){
        if (file){
            const fileType = /png|jpg|jpeg/;
            const mimetype = fileType.test(file.mimetype);
            const extname = fileType.test(path.extname(file.originalname.toLocaleLowerCase()))
            if(mimetype && extname){
                return cb(null, true)
            }else{
                return cb(new Error (`Error: Issue with file upload, please ensure that image is the correct file size and/or filetype: ${fileType}`))
            }
        }else {
            cb(new Error('No file provided')); // Handle missing file case
        }
    }
})
module.exports = app =>{
    // executes the file check to before we pass the data to the controller to update the database
    app.post('/api/registerResearcher', verifyUpload.single('profileImage'), researcherController.registerResearcher, (error,req,res,next)=>{
        if(error instanceof multer.MulterError){
            res.status(400).json({errorMsg: error})
        }else if(error){
            res.status(500).json({error:error.message});
        }
    })
    app.get('/api/loginResearcher', researcherController.authenticateResearcher);
}