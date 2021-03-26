const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const { authMiddleware } = require("./src/middlewares/authUser");

// router files
const authRouter = require("./src/routes/auth.routes");
const userRouter = require("./src/routes/user.routes");
const challengeRouter = require("./src/routes/challenge.routes");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");
const middlewares = require("./src/middlewares");
const Role = db.role;

db.mongoose
  .connect(`${dbConfig.URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to Atlas MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Lokal  application." });
});

// routes
app.use("/api", authRouter);
app.use("/api", userRouter);
// app.use("/api", authMiddleware, challengeRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  // add some code which needs to be intialiazed on server start

  console.log(" SERVER STARTED");
}
