const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    quiz : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Quiz'
    },
    questionTitle : {
        type : String,
        required : true
    },
    option_1 : {
        type : String,
        required : true
    },
    option_2 : {
        type : String, 
        required : true
    },
    option_3 : {
        type : String, 
        required : true
    },
    option_4 : {
        type : String,
        required : true
    },
    correct_answer : {
        type : String,
        required : true
    },
    attachment_url : {
        type : String
    },
    max_score : {
        type : Number,
        default : 100
    },
    time : {
        type : Number,
        default : 20
    }
})

module.exports = mongoose.model('Question', questionSchema)