const router = require("express").Router();
const TodosRouter = require("./todos");
const UserRouter = require("./user");

// define end point
router.use("/user", UserRouter);

router.use("/todos", TodosRouter);

module.exports = router;
