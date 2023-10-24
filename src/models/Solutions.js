const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const SolutionSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    budgetDeadLine:{
        type: Date,
        default: () => Date.now() + 30 * 24 * 60 * 60 * 1000
    },
    earnedMoney: Number,
    votes: [voteSchema],
})

const Solution = mongoose.model('Solution', SolutionSchema)
module.exports = Solution