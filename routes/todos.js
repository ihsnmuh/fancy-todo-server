const express = require('express')
const router = express.Router()
const { TodosController } = require('../controllers/TodosController')


router.get('/', TodosController.getTodos)
router.post('/', TodosController.postTodos)
// router.get('/:id', TodosController.getTodosbyId)
// router.put('/:id', TodosController.putTodosbyId)
// router.patch('/:id', TodosController.patchTodosbyId)
// router.delete('/:id', TodosController.deleteTodosbyId)




module.exports = router