const path = require("path");
const filepath = path.resolve(__dirname + "/../messages.json");
const fs = require("fs");

exports.readMessage = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.writeMessage = (messages) => {
  // fs.writeFileSync(filepath, jsonString);
  return new Promise((resolve, reject) => {
    const jsonString = JSON.stringify(messages);
    fs.writeFile(filepath, jsonString, (err) => {
      if (err) {
        reject(err);
        console.log(err);
      } else {
        resolve("Messages saved successfully");
      }
    });
  });
};
