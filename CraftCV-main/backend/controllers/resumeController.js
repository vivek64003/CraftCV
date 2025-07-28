import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';

export const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        //Default resume structure
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body, // Merge with any additional data provided
        })
        res.status(201).json(newResume);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating resume' });
    }
}

export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updateAt: -1 });
        res.status(200).json(resumes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching resumes' });
    }
}


//Get Resume by ID
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        if (resume.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to access this resume' });
        }
        res.status(200).json(resume);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching resume' });
    }
}

//Update Resume

export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        //Merge the existing resume data with the new data
        Object.assign(resume, req.body);
        // Save the updated resume
        const savedResume = await resume.save();
        res.status(200).json(savedResume);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating resume' });
    }
}


//Delete Resume
export const deleteResume = async (req, res) => {   
    try {
        const  resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        //create a uploads folder and store the resume images there
        const uploadsFolder = path.join(process.cwd(), 'uploads');

        //delete thumbnail function
        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if( fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
            }
        }

        if(resume.profileInfo.profilePreviewUrl){
            const oldProfile = path.join(uploadsFolder,
                 path.basename(resume.profileInfo.profilePreviewUrl));

            if(fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile);
            }
            }

        //Delete the resume from the database
        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })
        if (!deleted) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting resume' });
    }
}


            