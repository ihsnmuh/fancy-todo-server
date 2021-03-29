const { Todo } = require('../models/')

class TodosController {

  static getTodos(req, res){
    Todo.findAll()
      .then((Todos) => {
        res.status(200).json(Todos)
      })
      .catch((err) => {
        res.staus(500).json({message: err.message})
      })
  }
  
  static postTodos(req, res){

    let newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }

    Todo.create(newTodo)
      .then((todo) => {
        res.status(201).json(todo)
      })
      .catch((err) => {
        res.staus(500).json({message: err.message})
      })
  }

}


module.exports = { TodosController }