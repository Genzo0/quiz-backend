const Question = require('../models/Question')
const asyncHandler = require('express-async-handler')

const getAllQuestion = asyncHandler(async (req, res) => {
  const questions = await Question.find().lean()

  //confirm data
  if (!questions?.length) {
    return res.status(400).json({ message: 'Question not found' })
  }

  res.json(questions)
})

const getAllQuestionByQuiz = asyncHandler(
  asyncHandler(async (req, res) => {
    const id = req.params.id
    const questions = await Question.find({ quiz: id }).lean()

    if (!questions?.length) {
      return res
        .status(400)
        .json({ message: 'Question for this quiz not found' })
    }

    res.json(questions)
  })
)

const getQuestionByQuiz = asyncHandler(async (req, res) => {
  const id = req.params.id
  const idQuestion = req.params.idQuestion

  const question = await Question.findOne({ _id: idQuestion, quiz: id }).lean()

  if (!question) {
    return res.status(400).json({ message: 'Question not found' })
  }

  res.json(question)
})

const createNewQuestion = asyncHandler(async (req, res) => {
  const {
    quiz,
    questionTitle,
    option_1,
    option_2,
    option_3,
    option_4,
    correct_answer,
    attachment_url,
    max_score,
    time
  } = req.body

  //confirm data
  if (
    !quiz ||
    !questionTitle ||
    !option_1 ||
    !option_2 ||
    !option_3 ||
    !option_4 ||
    !correct_answer
  ) {
    return res.status(400).json({
      message:
        'Quiz, question, option 1, option 2, option 3, option 4, and correct_answer required'
    })
  }

  const question = await Question.create({
    quiz,
    questionTitle,
    option_1,
    option_2,
    option_3,
    option_4,
    correct_answer,
    attachment_url,
    max_score,
    time
  })

  //check success
  if (question) {
    return res.status(201).json({
      message: `New Question with question ${question.questionTitle} added`
    })
  } else {
    return res.status(400).json({ message: 'Invalid data received' })
  }
})

const updateQuestion = asyncHandler(async (req, res) => {
  const {
    id,
    quiz,
    questionTitle,
    option_1,
    option_2,
    option_3,
    option_4,
    correct_answer,
    attachment_url,
    max_score,
    time
  } = req.body

  if (
    !id ||
    !quiz ||
    !questionTitle ||
    !option_1 ||
    !option_2 ||
    !option_3 ||
    !option_4 ||
    !correct_answer ||
    !max_score ||
    !time
  ) {
    return res.status(400).json({
      message:
        'Quiz, question, option 1, option 2, option 3, option 4, correct_answer, max_score, and time required'
    })
  }

  //check question exists
  const question = await Question.findById(id).exec()
  if (!question) {
    return res.status(400).json({ message: 'Question not found' })
  }

  question.quiz = quiz
  question.questionTitle = questionTitle
  question.option_1 = option_1
  question.option_2 = option_2
  question.option_3 = option_3
  question.option_4 = option_4
  question.correct_answer = correct_answer
  question.max_score = max_score
  question.time = time

  if (attachment_url) {
    question.attachment_url = attachment_url
  }

  const updatedQuestion = await question.save()
  res.json({
    message: `question with question '${question.questionTitle}' updated`
  })
})

const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    return res.status(400).json({ message: 'Question ID required' })
  }

  //check question exists
  const question = await Question.findById(id).exec()
  if (!question) {
    return res.status(400).json({ message: 'Question not found' })
  }

  const result = await question.deleteOne()

  const reply = `Question with id ${result._id} deleted`

  res.json(reply)
})

module.exports = {
  getAllQuestion,
  getAllQuestionByQuiz,
  getQuestionByQuiz,
  createNewQuestion,
  updateQuestion,
  deleteQuestion
}
