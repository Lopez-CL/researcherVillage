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
    college:{
        type: String
    },
    major:{
        type: String
    },
    title:{
        type: String
    },
    bio:{
        type: String,
        maxLength: [350,"Only 350 characters for this! Less is more with bios we say!"]
    },
    discipline:{
        type: [String],
        enum: ["Physics",
            "Quantum Mechanics",
            "Astrophysics",
            "Biology",
            "Molecular Biology",
            "Genetics",
            "Ecology",
            "Chemistry",
            "Organic Chemistry",
            "Biochemistry",
            "Geology",
            "Meteorology",
            "Oceanography",
            "Environmental Science",
            "Sociology",
            "Cultural Anthropology",
            "Psychology",
            "Developmental Psychology",
            "Cognitive Psychology",
            "Political Science",
            "International Relations",
            "Economics",
            "Macroeconomics",
            "Microeconomics",
            "Linguistics",
            "Archaeology",
            "Human Geography",
            "Mathematics",
            "Algebra",
            "Calculus",
            "Statistics",
            "Logic",
            "Data Science",
            "Computer Science",
            "Artificial Intelligence",
            "Cryptography",
            "Information Theory",
            "History",
            "Art History",
            "Philosophy",
            "Ethics",
            "Literature",
            "Classical Studies",
            "Theology",
            "Religious Studies",
            "Cultural Studies",
            "Film Studies",
            "Musicology",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electrical Engineering",
            "Aerospace Engineering",
            "Biomedical Engineering",
            "Chemical Engineering",
            "Software Engineering",
            "Materials Science",
            "Robotics",
            "Nanotechnology",
            "Environmental Engineering",
            "Medicine",
            "Nursing",
            "Pharmacology",
            "Epidemiology",
            "Public Health",
            "Dentistry",
            "Physical Therapy",
            "Veterinary Medicine",
            "Nutrition",
            "Neuroscience",
            "Biotechnology",
            "Cybersecurity",
            "Urban Studies",
            "Sustainability Studies",
            "Climate Science",
            "Machine Learning",
            "Bioinformatics",
            "Space Science",
            "Game Design",
            "Cognitive Science",
            "Business Administration",
            "Marketing",
            "Finance",
            "Human Resource Management",
            "Operations Management",
            "Entrepreneurship",
            "Supply Chain Management",
            "Organizational Behavior",
            "Pedagogy",
            "Curriculum Design",
            "Educational Technology",
            "Special Education",
            "Educational Psychology",
            "Fine Arts",
            "Performing Arts",
            "Graphic Design",
            "Photography",
            "Creative Writing",
            "Theater Studies"
]
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
        const hashedPW = await bcrypt.hash(this.password,12);
        this.password = hashedPW;
    }catch(err){
        console.log(err,"Issue with registration credentials");
    }
    next();
})

// virtual fields
ResearcherSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)


// Middleware
ResearcherSchema.pre('validate', function(next){
    if(this._confirmPassword !== this.password){
            this.invalidate("Passwords do not match: Back-End Error")
        }
    next();
    })


module.exports = mongoose.model("Researcher", ResearcherSchema);