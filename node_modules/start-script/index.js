const fs = require("fs");
const path = require("path");

function getStartScript(directory) {
  const packageFile = path.join(directory, "package.json");
  if (fs.existsSync(packageFile)) {
    const { scripts } = require(packageFile);
    if (scripts) {
      return scripts[scriptName];
    }
  }
}

module.exports = (appDirectory = process.cwd()) => {
  return new Promise((resolve, reject) => {
    const startScript = getStartScript(appDirectory);
    if (startScript) {
      const startFile = startScript.replace("node ", "");
      resolve(startFile);
    } else {
      let startFileFound = false;
      ["server.js", "app.js", "index.js"].forEach(fileName => {
        if (fs.existsSync(path.join(process.cwd(), fileName))) {
          startFileFound = true;
          resolve(fileName);
        }
      });

      if (!startFileFound) {
        reject(new Error("No start file found"));
      }
    }
  });
};
