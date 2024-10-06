const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ResearcherSchema = mongoose.Schema({
    // username, discipline, researchStatus, email, password, profile image
    firstName: {
        type: String,
        required: [true, 'a username is required'],
        minlength: [2, "Your username must be two characters or more"]
    },
    lastName: {
        type: String,
        required: [true, 'a username is required'],
        minlength: [2, "Your username must be two characters or more"]
    },
    userName: {
        type: String,
        minlength: [2, "Your username must be two characters or more"]
    },    
    email:{
        type:String,
        required: [true, "An email is required to sign up"],
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
    },
    password:{
        type: String,
        required: [true,"Please provide a password"],
        minlength: [8, 'your password must be 8 characters or longer'],
    },
    discipline:{
        type: [String],
        required: [true, 'We use this to help build connections with other researchers and influence how our AI system works with you'],
    },
    researcherStatus: {
        type: [String],
        enum: ['undergraduate', 'postdoc','grad student','instructor/professor','research specialist'],
        required: [true, "We use this to help build connections with other researchers and influence how our AI system works with you"],
        minItem: [1, 'You must select at least one status'],
    },

    profileImage:{
        type: Buffer
    },
    createdAt: Date,
    updatedAt: Date,
}, {timestamps: true})

// save modeled function/middleware

ResearcherSchema.pre('save', async function(next){
    try{
        const hashedPw = await bcrypt.hash(this.password, 12);
        this.password = hashedPw;
    }catch(err){
        console.log(err, 'error caught in back-end during save')
    }
    next()
})

// virtual fields
ResearcherSchema.virtual('confirmPassword')
    .get(() =>(this._confirmPassword))
    .set(value => this._confirmPassword = value)

// Middleware
ResearcherSchema.pre('validate', function(next){
    if(this.password !== this._confirmPassword){
        this.invalidate('confirmPassword', 'Passwords must match')
    }
    next();
})


module.exports = mongoose.model("Researcher", ResearcherSchema);