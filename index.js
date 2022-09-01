let projectData = {};
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000 || process.env.PORT;
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
console.log(path.join(__dirname, "/website"));
app.use(express.static(path.join(__dirname, "/website")));
app.use(cors());
app.use(jsonParser);

app.post("/insertdata", urlencodedParser, function (req, res, next) {
  if (req.body) {
    projectData = req.body;
    res.send("done !");
  }
  next();
});
app.get("/getmostrecentdata", urlencodedParser, function (req, res, next) {
  res.send(projectData);
});

app.listen(port, () => {
  console.log("server is listening !");
});
