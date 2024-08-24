const { error } = require('console');
const researcherController = require('../controllers/researcher.controller');
const multer = require('multer');
const path = require('path');
// multer configuration which is middleware that process multipart/form data. It must store file in memory as buffer, indicate filesize limits, and verify mimietype and extname/file path, and finally indicate whether to accept the file or not
const verifyUpload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: 5*1024*1024},
    fileFilter: function(req,file,cb){
        const fileTypes = /jpg|jpeg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname.toLocaleLowerCase()));
        if(mimetype && extname){
            cb(null, true)
        }
        else{
            cb(`Error: Issue with filetype upload. Ensure filetype is ${fileTypes}`)
        }
    }
})
exports.module = app =>{
    app.post('/api/registerResearcher/', verifyUpload('profileImage'), researcherController.registerResearcher, (error, res, req, next) =>{
        if(error instanceof multer.MulterError){
            res.status(400).json({error:`error in file upload`})
        }else if(error){
            res.status(500).json({error:`unknown error has occurred`})
        }
    });
}