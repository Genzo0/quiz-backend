const express = require('express')
const router = express.Router()
const quizController = require('../controllers/quizController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router
  .route('/')
  .get(quizController.getAllQuiz)
  .post(quizController.createNewQuiz)
  .delete(quizController.deleteQuiz)
  .patch(quizController.updateQuiz)

router.route('/:id').get(quizController.getQuizById)

module.exports = router
