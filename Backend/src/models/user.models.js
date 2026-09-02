import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username: {
        type : String,
        unique : true,
        required : true 
    },

    email : {
        type : String,
        unique : true, 
        required : true 
    }, 
    name : {
        type : String
    },
    phone : {
        type : String
    },
    location : {
        type : String
    },
    bio : {
        type : String
    },
    profileImage : {
        type : String
    },
    socialLinks : {
        github: String,
        linkedin: String,
        portfolio: String,
        twitter: String,
        devto: String,
        medium: String
    },
    codingProfiles: {
        leetcode: String,
        geeksforgeeks: String,
        codechef: String,
        codeforces: String,
        codingninjas: String
    },
    skills: {
        languages: [String],
        frontend: [String],
        backend: [String],
        databases: [String],
        tools: [String]
    },
    education: [{
        institution: String,
        degree: String,
        field: String,
        startYear: Number,
        endYear: Number,
        grade: String
    }],
    experience: [{
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        currentlyWorking: Boolean,
        description: String
    }],
    projects: [{
        name: String,
        description: String,
        technologies: [String],
        githubUrl: String,
        liveUrl: String,
        role: String
    }],
    achievements: [{
        title: String,
        description: String,
        date: Date
    }],
    settings: {
        // AI behaviour
        personalizedPreparation: {
            type: Boolean,
            default: true,
        },
        
        aiSuggestions: {
            type: Boolean,
            default: true,
        },
        
        adaptiveDifficulty: {
            type: Boolean,
            default: true,
        },
        
        followUpQuestions: {
            type: Boolean,
            default: true,
        },
        
        showHints: {
            type: Boolean,
            default: false,
        },

        detailedFeedback: {
            type: Boolean,
            default: true,
        },
        
        // Notifications
        interviewReminders: {
            type: Boolean,
            default: true,
        },
        
        preparationReminders: {
            type: Boolean,
            default: true,
        },
        
        jobRecommendations: {
            type: Boolean,
            default: true,
        },
        
        profileSuggestions: {
            type: Boolean,
            default: true,
        },
        
        // Privacy
        profileVisibility: {
            type: String,
            enum: ["Public", "Private"],
            default: "Private",
        },
        
        showSocialLinks: {
            type: Boolean,
            default: true,
        },

        showCodingProfiles: {
            type: Boolean,
            default: true,
        },

        // Appearance
        theme: {
            type: String,
            enum: ["Dark", "Light", "System"],
            default: "Dark",
        },
    },
    
    password : {
        type :String,
        required : true
    },

    resetPasswordToken: {
        type: String,
        default: null
    },

    resetPasswordExpires: {
        type: Date,
        default: null
    },
}, {timestamps : true});

export const User = mongoose.model("User", userSchema);