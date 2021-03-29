const router = require('express').Router()
const TodosRouter = require('./todos')

// define end point
router.use('/todos', TodosRouter)


module.exports = router