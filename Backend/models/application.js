const { application } = require('express');
const mongoose = require('mongoose');
const validator = require('validator');

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email'],
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    coverletter: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    resume: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['Job Seeker'],
            required: true
        }
    },
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['Employer'],
            required: true
        }
    }
}, { collection: 'Application' });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;