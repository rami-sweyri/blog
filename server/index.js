require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const path = require("path");
const cors = require("cors");

const server = express();

// Connect Database
connectDB();

// Init Middleware
server.use(express.json());

// Init Cors
var corsOptions = {
  origin: "http://localhost:3000",
};
server.use(cors(corsOptions));

server.options("/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length,Server,Date,access-control-allow-methods,access-control-allow-origin"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,DELETE,OPTIONS,PATCH"
  );
  res.send("send some thing whatever");
});

// Define Routes
server.use("/api/posts", require("./routes/post"));
server.use("/api/comments", require("./routes/comment"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  server.use(express.static("client/build"));

  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = server;
