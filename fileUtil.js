const fs = require('fs');

module.exports.checkFileSync = (path, defaultVal) => {
  if(fs.existsSync(path)) return JSON.parse(fs.readFileSync(path));
  
  fs.writeFileSync(path, JSON.stringify(defaultVal, null, "\t"));
  return defaultVal;
}