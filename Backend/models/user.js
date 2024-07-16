const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        validate: [validator.isEmail, 'Please provide a valid email'],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, 'Please provide your phone number']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minLength: [8, 'Password must contain at least 8 characters'],
        maxLength: [32, 'Password must not exceed 32 characters']
    },
    role: {
        type: String,
        required: [true, 'Please provide your role'],
        enum: ['Job Seeker', 'Employer']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { collection: 'User' });

// hash the password before saving user info
userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        user.password = hashedPassword;
        next();
    } catch(err) {
        return next();
    }
});

// compare the password
userSchema.methods.comparePassword = async function(password) {
    const isPasswordMatch = await bcrypt.compare(password, this.password);
    return isPasswordMatch;
};

const User = mongoose.model('User', userSchema);
module.exports = User;