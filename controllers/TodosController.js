const { Todo } = require("../models/");

class TodosController {
  static getTodos(req, res) {
    Todo.findAll()
      .then((Todos) => {
        res.status(200).json(Todos);
      })
      .catch((err) => {
        res.staus(500).json({ message: "Internal Server Error" });
      });
  }

  static postTodos(req, res) {
    let newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: req.loggedUser.id,
    };

    Todo.create(newTodo)
      .then((todo) => {
        res.status(201).json(todo);
      })
      .catch((err) => {
        // console.log(err.name, "<<<<<<<<<<<<<<<<<<");
        if (err.name === "SequelizeValidationError") {
          res.status(400).json({ message: err.message });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
  }

  static getTodosbyId(req, res) {
    let id = req.params.id;

    Todo.findByPk(id)
      .then((todo) => {
        if (!todo) {
          res.status(404).json({ message: "Not Found" });
        }

        res.status(200).json(todo);
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  }

  static putTodosbyId(req, res) {
    let updateTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
    };

    Todo.update(updateTodo, {
      where: { id: +req.params.id },
      returning: true,
    })
      .then((todo) => {
        if (!todo) {
          res.status(404).json({ message: "Not Found" });
        } else {
          res.status(200).json(todo[1][0]);
        }
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          res.status(400).json({ message: err.message });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
  }

  static patchTodosbyId(req, res) {
    let updateStatusTodo = {
      status: req.body.status,
    };

    Todo.update(updateStatusTodo, {
      where: { id: +req.params.id },
      returning: true,
    })
      .then((todo) => {
        if (!todo) {
          res.status(404).json({ message: "Not Found" });
        } else {
          res.status(200).json(todo[1][0]);
        }
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          res.status(400).json({ message: err.message });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      });
  }

  static deleteTodosbyId(req, res) {
    Todo.destroy({
      where: { id: +req.params.id },
    })
      .then((todo) => {
        if (!todo) {
          res.status(404).json({ message: "Not Found" });
        } else {
          res.status(200).json({ message: "todo success to delete" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
      });
  }
}

module.exports = { TodosController };
