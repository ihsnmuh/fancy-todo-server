const { Todo } = require("../models/");

class TodosController {
  static getTodos(req, res, next) {
    // console.log(req);
    Todo.findAll({ where: { UserId: req.loggedUser.id } }) // sudah benar
      .then((Todos) => {
        res.status(200).json(Todos);
      })
      .catch((err) => {
        next(err);
      });
  }

  static postTodos(req, res, next) {
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
          throw { name: "SequelizeValidationError" };
        } else {
          next(err);
        }
      });
  }

  static getTodosbyId(req, res, next) {
    let id = req.params.id;

    Todo.findByPk(id)
      .then((todo) => {
        if (!todo) {
          throw { name: "NotFound" };
        }
        res.status(200).json(todo);
      })
      .catch((err) => {
        next(err);
      });
  }

  static putTodosbyId(req, res, next) {
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
          throw { name: "NotFound" };
        } else {
          res.status(200).json(todo[1][0]);
        }
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          throw { name: "SequelizeValidationError" };
        } else {
          next(err);
        }
      });
  }

  static patchTodosbyId(req, res, next) {
    let updateStatusTodo = {
      status: req.body.status,
    };

    Todo.update(updateStatusTodo, {
      where: { id: +req.params.id },
      returning: true,
    })
      .then((todo) => {
        if (!todo) {
          throw { name: "NotFound" };
        } else {
          res.status(200).json(todo[1][0]);
        }
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          throw { name: "SequelizeValidationError" };
        } else {
          next(err);
        }
      });
  }

  static deleteTodosbyId(req, res, next) {
    Todo.destroy({
      where: { id: +req.params.id },
    })
      .then((todo) => {
        if (!todo) {
          throw { name: "NotFound" };
        } else {
          res.status(200).json({ message: "todo success to delete" });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = { TodosController };
