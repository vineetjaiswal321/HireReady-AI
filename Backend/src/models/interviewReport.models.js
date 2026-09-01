import mongoose from "mongoose"




const technicalQuestionSchema=new mongoose.Schema({
    question : {
        type : String, 
        required: true
    },
    intention : {
        type : String,
        required : true
    },
    answer : {
        type : String,
        required : true
    }
}, {_id : false})

const behavioralQuestionSchema=new mongoose.Schema({
    question : {
        type : String, 
        required: true
    },
    intention : {
        type : String,
        required : true
    },
    answer : {
        type : String,
        required : true
    }
}, {_id : false})

const skillsGapSchema=new mongoose.Schema({
    skill : {
        type : String, 
        required: true
    },
    severity : {
        type : String,
        enum : ["low", "medium", "high"],
        required : true
    }
}, {_id : false})


const preparationPlanSchema=new mongoose.Schema({
    day : {
        type : Number, 
        required: true
    },
    focus : {
        type : String,
        required : true
    },
    tasks : [{
        type : String,
        required : true
    }]
}, {_id : false})



const interviewReportSchema=new mongoose.Schema({
    experienceLevel: {
        type: String
    },

    interviewType: {
        type: String
    },
    jobDescription : {
        type : String,
        required : true
    },
    resume :{
        type : String
    },
    selfDescription: {
        type: String
    },
    matchScore : {
        type : Number,
        min : 0,
        max : 100
    },
    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGaps : [skillsGapSchema],
    preparationPlan : [preparationPlanSchema],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title: {
        type : String,
        required : true
    },
    pdf: {
        url: {
            type: String,
            default: null
        },

        publicId: {
            type: String,
            default: null
        },

        generatedAt: {
            type: Date,
            default: null
        }
    }

}, {timestamps : true})

export const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);