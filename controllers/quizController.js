const Quiz = require('../models/Quiz')
const User = require('../models/User')
const Question = require('../models/Question')
const asyncHandler = require('express-async-handler')
const { json } = require('express')

const getAllQuiz = asyncHandler(async (req, res) => {
    const quiz = await Quiz.find().lean()

    //check quiz
    if(!quiz?.length){
        return res.status(400).json({message : "No Quizzes found"})
    }

    res.json(quiz)
})

const getQuizById = asyncHandler(async (req, res) => {
    const id = req.params.id
    
    const quiz = await Quiz.findOne({_id : id}).lean()

    if(!quiz){
        return res.status(400).json({message : "Quiz not found"})
    }
    res.json(quiz)
    }
)

const createNewQuiz = asyncHandler(async (req, res) => {
    const { title, author, category, description, image_url } = req.body
    
    //check quiz
    if(!title || !author || !category || !description){
        return res.status(400).json({message : "Title, author, category, and description required"})
    }

    const quizObject = { title, author, category, description, image_url }
    const quiz = await Quiz.create(quizObject)

    //check success
    if(quiz){
        res.status(201).json({message : `New Quiz with title ${title} added`})
    } else {
        res.status(400).json({message : "Invalid Quiz data received"})
    }
})

const updateQuiz = asyncHandler(async (req, res) => {
    const { id, author, title, image_url, category, description } = req.body

    //check quiz
    if(!id || !author || !title || !image_url || !category || !description){
        return res.status(400).json({message : "All fields required"})
    }

    const quiz = await Quiz.findById(id)

    //check quiz is exists
    if(!quiz){
        return res.status(400).json({message : "Quiz not found"})
    }

    quiz.author = author
    quiz.title = title
    quiz.image_url = image_url
    quiz.category = category
    quiz.description = description

    const updatedQuiz = await quiz.save()

    res.json({message : `${updatedQuiz.title} updated`})
})

const deleteQuiz = asyncHandler(async (req, res) => {
    const { id } = req.body

    //check id 
    if(!id) {
        return res.status(400).json({message : "Quiz id Required"})
    }

    //check quiz have a question
    const question = await Question.findOne({quiz : id}).lean().exec()
    if(question){
        return res.status(400).json({message : "Quiz already has a question"})
    }

    const quiz = await Quiz.findById(id).exec()

    //check quiz is exist
    if(!quiz){
        return res.status(400).json({message : "Quiz not found"})
    }

    const result = await quiz.deleteOne()

    const reply = `Quiz with id ${result._id} deleted`

    res.json({message : reply})
})

module.exports = { getAllQuiz, getQuizById, createNewQuiz, updateQuiz, deleteQuiz }