const express = require('express')
const ProblemController = require('../controllers/problemController')

const router = express.Router()

router.get('/:id', ProblemController.getOne)
router.post('/', ProblemController.create)

module.exports = router