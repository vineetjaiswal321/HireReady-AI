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

    password : {
        type :String,
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
        hackerrank: String
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
    }]
}, {timestamps : true});

export const User = mongoose.model("User", userSchema);