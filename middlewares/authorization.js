const { Todo } = require("../models");

async function authorize(req, res, next) {
  // ambil velue id params untuk id post yang mau di cek
  // ambil value dari UserId dari post kita bandingkan dengan id user yang login
  // kalo sama next
  // kalo ngga dapet error unauthorized

  try {
    const id = Number(req.params.id);
    const foundTodo = await Todo.findByPk(id);
    if (foundTodo) {
      if (foundTodo.UserId === req.loggedUser.id) {
        next();
      } else {
        throw { name: "Unauthorized" };
      }
    } else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorize;
