require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const path = require("path");

const server = express();

// Connect Database
connectDB();

// Init Middleware
server.use(express.json());

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
