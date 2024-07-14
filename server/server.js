const express = require('express');
const app = express();
const cors = require('cors');
const MYPORT = 8000;
const cookieParser = require('cookie-parser')

require('./config/mongoose.config');
require('dotenv').config();


app.use(express.json(), express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin:'http://localhost:3000'
}))

app.listen(MYPORT, () => console.log(`Server fired on ${MYPORT}!`));