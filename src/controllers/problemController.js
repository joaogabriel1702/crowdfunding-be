const Problem = require('../models/Problems')

class ProblemController{

    async create(request, response, next){
    try{
        const problem = new Problem(request.body)
        await problem.save()
        return response.status(201).json({
            message: 'Problem created'
        })
        } catch (error){
            return response.status(500).json({
                message: error.message
            })
        }
    }

    async getOne(request, response, next){
        try{
            const problem = await Problem.findById(request.params.id).populate('solutions')
           
            if(!problem){
                return response.status(404).json({
                    message: 'Problem not found'
                })
            }
            const problemObject = problem.toObject()

            if(problemObject.solutions && problemObject.solutions.length > 0){
                problemObject.solutions = problemObject.solutions.map(solution => {
                    const votesCount = solution.votes.length
                    delete solution.votes
                    solution.votesCount = votesCount
                    return solution
                })

                return status(200).json({problemObject})
            }

            }catch (error){
                return response.status(500).json({
                    message: error.message
                })
            }
        } 
}


module.exports = ProblemController