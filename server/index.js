const mysql = require("mysql");
const fs = require("fs");
const config = require("./config.js");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const filepath = path.resolve(__dirname + "/messsages.json");
const PORT = process.env.PORT || config.port;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Messages Api Project");
});

app.use("/api/message", require("./routes/api/message"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Api not found" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error!" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
