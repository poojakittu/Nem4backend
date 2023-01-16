const express = require("express");

const { connection } = require("./db");

const { userRoutes } = require("./Routes/User.routes");

const { postRoutes } = require("./Routes/Post.routes");

const { authenticate } = require("./middleware/authentication.middleware");

require("dotenv").config();

const app = express();



app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/users", userRoutes);

// app.use(authenticate);

app.use("/posts", postRoutes);


app.listen(process.env.port, async () => {
  try {

    await connection;
    console.log("connect to db");
  } catch (err) {
    console.log("Error while connecting to DB");

    console.log(err);

  }
  console.log(`Server running at ${process.env.port}`);
});
