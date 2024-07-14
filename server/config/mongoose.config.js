const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/researcher_db',{
    useNewUrlParser: true,
    unifiedTypology: true,
})
    .then(() => console.log("Connection to the researcher database established!"))
    .catch(err => console.log(err, 'Issue with connecting to researcher database'));
