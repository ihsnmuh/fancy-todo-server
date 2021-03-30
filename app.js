if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes");
const errHandler = require("./middlewares/errHandler");

app.use(express.json());

app.use(express.urlencoded({ extended: false })); //kalo false untuk string dan array dan true bisa apa saja

app.use(router);

app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
