const express = require("express");
const router = express.Router();
const { TodosController } = require("../controllers/TodosController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const MovieController = require("../controllers/MovieController");
const RandomController = require("../controllers/RandomActivity");

// harus login dulu sebelum akses endpount
router.use(authentication);
router.get("/", TodosController.getTodos);
router.post("/", TodosController.postTodos);

router.get("/movie", MovieController.searchMovies); // 3rd API
router.get("/activity", RandomController.randomActivity); // 3rd API

router.use("/:id", authorization);
router.get("/:id", TodosController.getTodosbyId);
router.put("/:id", TodosController.putTodosbyId);
router.patch("/:id", TodosController.patchTodosbyId);
router.delete("/:id", TodosController.deleteTodosbyId);

module.exports = router;
