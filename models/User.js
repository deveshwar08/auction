const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true ,"Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true,"Please enter the password"],
        minlength: [6,"Minimum password length is 6"]
    },
});

//fire a func after an user is added
/*userSchema.post('save',function(doc, next){
    console.log("new user was created and saved",doc);
    next();
});*/

//fire a func before an user is added
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//static method to log in user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password');

    }
    throw Error('Incorrect email');
}


const user = mongoose.model('user',userSchema);
 
module.exports = user;