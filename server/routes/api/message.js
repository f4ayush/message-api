const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fileReadWrite = require("../../model/fileReadWrite");
const filepath = path.resolve(__dirname + "/../../messages.json");

// Gets All Messages
router.get("/", (req, res) => {
  fileReadWrite
    .readMessage()
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server error" });
    });
});

// Add a new director
router.post("/", (req, res) => {
  fileReadWrite
    .readMessage()
    .then((data) => {
      let messages = JSON.parse(data);
      let newMessage = {};
      newMessage.id = uuidv4();
      newMessage.text = req.body.text;
      newMessage.updatedOn = "";
      newMessage.createdOn = new Date();
      messages.push(newMessage);
      return fileReadWrite.writeMessage(messages);
    })
    .then(() => {
      res.status(200).json({ message: "Message saved successfully!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server error" });
    });
});

// Get the message with given ID
router.get("/:id", (req, res) => {
  fileReadWrite
    .readMessage()
    .then((data) => {
      let messages = JSON.parse(data);
      let requiredMessage = messages.filter((message) => {
        if (message.id == req.params.id) {
          return message;
        }
      });
      if (requiredMessage.length == 0) {
        res.status(404).json({ message: "No mesaage found" });
      } else {
        res.send(requiredMessage);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server error" });
    });
});

//  to update
router.put("/:id", (req, res) => {
  fileReadWrite
    .readMessage()
    .then((data) => {
      let messages = JSON.parse(data);
      messages.forEach((message) => {
        if (message.id == req.params.id) {
          message.text = req.body.text;
          message.updatedOn = new Date();
        }
      });

      return fileReadWrite.writeMessage(messages);
    })
    .then(() => {
      res.status(200).json({ message: "Message updated successfully!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "internal server error" });
    });
});

router.use((req, res, next) => {
  res.status(404).json({ message: "Api not found" });
});

module.exports = router;
