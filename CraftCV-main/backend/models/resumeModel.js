import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String
    },
    template: {
        theme: String,
        colorPlatette: [String],
    },

    profileInfo: {
        profilePreviewUrl: String,
        fullName: String,
        designation: String,
        summary: String,
    },

    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        website: String,
    },

    workExperience: [
        {   
            company: String,
            role: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
        ],

    education: [
        {
            degree: String, 
            institution: String,
            startDate: Date,
            endDate: Date,
        },
    ],
    skills: [
        {
            name: String,
            progress: Number,
        },
    ],

    projects: [
        {
            title: String,
            description: String,
            github: String,
            liveDemo: String,
            
        },
    ],

    certifications: [
        {
            title: String,
            issuer: String,
            year: Date,
        },
    ],

    languages: [
        {
            name: String,
            progress: Number,
        },
    ],

    interests: [String],
    },
    {
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
    }
);

export default mongoose.model("Resume", ResumeSchema);

