const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./handlers/error_handler");
const validateQuery = require("./validators/query_validator");
const fParse = require("./foodco_parser");
const fetch = require("node-fetch");
const url =
  "https://www.fazerfoodco.fi/modules/json/json/Index?costNumber=0083&language=fi";
const app = express();
const PORT = process.env.PORT || 3000;

const logger = morgan("dev");
app.use(logger);

// GET for menus
app.get("/menus/", validateQuery(["today", "tomorrow"]), (req, res) => {
  res.send({ today: req.query.today, tomorrow: req.query.tomorrow });
});

app.get("/", function(req, res, next) {
  const err = new Error("Page Not Found");
  err.statusCode = 404;
  next(err);
});

app.get("/error", (req, res) => {
  throw new err(500);
});

fetch(url)
  .then(res => {
    console.log(res.status, res.statusText);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.lof(err));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
