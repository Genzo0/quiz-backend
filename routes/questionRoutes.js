const express = require('express')
const router = express.Router()
const questionController = require('../controllers/questionController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router
  .route('/')
  .get(questionController.getAllQuestion)
  .post(questionController.createNewQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion)

router.route('/:id').get(questionController.getAllQuestionByQuiz)
router.route('/:id/:idQuestion').get(questionController.getQuestionByQuiz)

module.exports = router
