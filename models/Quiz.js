const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    title : {
        type : String, 
        required : true
    },
    author : {
        type : String, 
        required : true
    },
    image_url : {
        type : String,
        default : "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/469/5065/no-image__42269.1665668045.jpg?c=2"
    },
    category : {
        type : String, 
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Quiz', quizSchema)