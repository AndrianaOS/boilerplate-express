let express = require("express");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function middleware(request, response, next) {
  let string = request.method + " " + request.path + " - " + request.ip;
  console.log(string);
  next();
});

console.log("Hello World");

// app.get("/", (request, response) => {
//   response.send("Hello Express");
// });

app.get("/", function (request, response) {
  const absolutePath = __dirname + "/views/index.html";
  response.sendFile(absolutePath);
});

app.get(
  "/now",
  function (request, response, next) {
    request.time = new Date().toString();
    next();
  },
  function (request, response) {
    response.json({ time: request.time });
  }
);

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else res.json({ message: "Hello json" });
});

app.get("/:word/echo", function (request, response) {
  const word = request.params.word;
  response.json({ echo: `${word}` });
});

app
  .route("/name")
  .get(function (request, response) {
    const first = request.query.first;
    const last = request.query.last;
    response.json({ name: `${first} ${last}` });
  })
  .post(function (request, response) {
    const first = request.body.first;
    const last = request.body.last;
    response.json({ name: `${first} ${last}` });
  });

module.exports = app;
