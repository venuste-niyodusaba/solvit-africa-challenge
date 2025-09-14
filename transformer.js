
const fs = require("fs");
const path = require("path");

function readJSON(filePath) {

  try {
    const data = fs.readFileSync(filePath,"utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading/parsing JSON from ${filePath}:`, err.message);
    process.exit(1);
  }
}

function writeJSON(filePath, data, pretty = false, minify = false) {
  try {
    let json;
    if (pretty) {
      json = JSON.stringify(data, null, 2);
    } else if (minify) {
      json = JSON.stringify(data);
    } else {
      json = JSON.stringify(data, null, 2); 
    }
    fs.writeFileSync(filePath, json, "utf-8");
    console.log(`Output written to ${filePath}`);
  } catch (err) {
    console.error(`Error writing JSON to ${filePath}:`, err.message);
    process.exit(1);
  }
}

function flattenJSON(obj, prefix = "", result = {}) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    let newKey = prefix ? `${prefix}.${key}` : key;

    if (obj[key] !== null && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      flattenJSON(obj[key], newKey, result);
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

function rebuildJSON(flatObj) {
  let result = {};
  for (let flatKey in flatObj) {
    const keys = flatKey.split(".");
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = flatObj[flatKey];
      } else {
        if (!acc[k] || typeof acc[k] !== "object") acc[k] = {};
      }
      return acc[k];
    }, result);
  }
  return result;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error(" Usage: node transformer.js <flatten|rebuild> <input.json> <output.json> [--pretty|--minify]");
    process.exit(1);
  }

  const command = args[0];
  const inputFile = path.resolve(args[1]);
  const outputFile = path.resolve(args[2]);
  const pretty = args.includes("--pretty");
  const minify = args.includes("--minify");

  const data = readJSON(inputFile);

  let result;
  if (command === "flatten") {
    result = flattenJSON(data);
  } else if (command === "rebuild") {
    result = rebuildJSON(data);
  } else {
    console.error(`Unknown command: ${command}`);
    process.exit(1);
  }

  writeJSON(outputFile, result, pretty, minify);
}

main();
