const express = require('express');
const cloudinary = require('cloudinary');
const { jwtAuthMiddleware } = require('../auth/jwt');
const Application = require('../models/application');
const Job = require('../models/job');
const router = express.Router();

// apply for a job by job seeker
router.post('/apply', jwtAuthMiddleware, async(req, res)=>{
    const { _id, role } = req.user;
    if(role === 'Employer') {
        return res.status(400).json({ error: "You cannot apply for a job being an Employer." });
    }

    const { name, email, phone, coverletter, address, jobId } = req.body;
    if(!name || !email || !phone || !coverletter || !address || !jobId) {
        return res.status(400).json({ error: "Please fill all the required fields." });
    }

    // check for file - null or undefined || there is no file
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ error: "Resume file required." });
    }

    // check for the file formats
    const { resume } = req.files;
    const allowedFileFormats = ['image/png', 'image/jpeg', 'image/webp'];
    if(!allowedFileFormats.includes(resume.mimetype)) {
        return res.status(400).json({ error: "Invalid file type. Please upload a PNG file." });
    }

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(resume.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
        return res.status(500).json({ error: "Failed to upload Resume to Cloudinary" });
    }

    try {
        // find the job by jobId
        const job = await Job.findById(jobId);
        if(!job) {
            return res.status(400).json({ error: "Oops, Could not find the job!" });
        }

        // create applicant id
        const applicantID = {
            user: _id,
            role: 'Job Seeker'
        };

        // create employer id
        const employerID = {
            user: job.postedBy,
            role: 'Employer'
        };

        const applicationData = {
            name: name,
            email: email,
            phone: phone,
            coverletter: coverletter,
            address: address,
            resume: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            },
            applicantID: applicantID,
            employerID: employerID
        };

        const application = new Application(applicationData);
        const response = await application.save();

        res.status(200).json({
            message: "Application submitted successfully!",
            response: response
        });
    } catch(err) {
        res.status(500).json({ error: `Internal server error : ${err}` });
    }
});

// Job seeker can delete a job which he/she has applied in
router.delete('/delete/:application_id', jwtAuthMiddleware, async(req, res)=>{
    const { role } = req.user;
    if (role === 'Employer') {
        return res.status(400).json({ error: "You cannot delete this application." });
    }

    try {
        const { application_id } = req.params;
        const application = await Application.findById(application_id);
        if(!application) {
            return res.status(400).json({ error: "Oops, application not found!" });
        }

        const response = await application.deleteOne();
        res.status(200).json({
            messages:  `Application deleted successfully!`,
            response: response
        });
    } catch(err) {
        res.status(500).json({ message: `Internal server error ${err}` });
    }
});

// get all the applications of job seeker
router.get('/my-applications', jwtAuthMiddleware, async(req, res)=>{
    const { _id, role } = req.user;
    if (role === 'Employer') {
        return res.status(400).json({ error: "You cannot access these resources." });
    }

    try {
        const applications = await Application.find({ "applicantID.user": _id });
        res.status(200).json({
            messages:  `You have applied for ${applications.length} jobs.`,
            Applications: applications
        });
    } catch(err) {
        res.status(500).json({ message: `Internal server error ${err}` });
    }
});

// get all the applications received by employer
router.get('/employer/all', jwtAuthMiddleware, async(req, res)=>{
    const { _id, role } = req.user;
    if (role === 'Job Seeker') {
        return res.status(400).json({ error: "You cannot access these resources." });
    }

    try {
        const applications = await Application.find({ "employerID.user": _id });
        res.status(200).json({
            messages:  `You have received ${applications.length} job applicatios.`,
            Applications: applications
        });
    } catch(err) {
        res.status(500).json({ message: `Internal server error ${err}` });
    }
});

module.exports = router;