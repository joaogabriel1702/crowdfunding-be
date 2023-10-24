const mongoose = require('mongoose')

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        city: String,
        uf: String,
        neighborhood: String
    },
    imageURL: String,
    deadLine: {
        type: Date,
        default: () => Date.now() + 3 * 24 * 60 * 60 * 1000
    },
    pix: String,
    solutions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Solution'}],
})

const Problem = mongoose.model('Problem', ProblemSchema)
module.exports = Problem