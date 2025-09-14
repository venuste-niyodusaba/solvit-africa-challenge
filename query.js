

const fs = require("fs");
const path = require("path");

function readJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading parsing JSON from ${filePath}:", err.message);
    process.exit(1);
  }
}

function applyFilters(data, filters) {
  return data.filter((item) => {
    return filters.every((cond) => {
      const match = cond.match(/^(\w+)([<>]=?|=)(.+)$/);
      if (!match) return false;
      let [, field, operator, value] = match;

      if (!isNaN(value)) value = Number(value);

      const itemVal = item[field];

      switch (operator) {
        case ">": return itemVal > value;
        case "<": return itemVal < value;
        case ">=": return itemVal >= value;
        case "<=": return itemVal <= value;
        case "=": return itemVal == value;
        default: return false;
      }
    });
  });
}
function sortData(data, field, order = "asc") {
  return data.sort((a, b) => {
    if (a[field] === undefined) return 1; 
    if (b[field] === undefined) return -1;

    if (a[field] < b[field]) return order === "asc" ? -1 : 1;
    if (a[field] > b[field]) return order === "asc" ? 1 : -1;
    return 0;
  });
}

function groupData(data, field) {
  return data.reduce((acc, item) => {
    const key = item[field] || "undefined";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

function countData(data) {
  return data.length;
}

function uniqueData(data, field) {
  const values = data.map((item) => item[field]);
  return [...new Set(values)];
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Usage: node query.js <command> [options] data.json");
    process.exit(1);
  }

  const command = args[0];
  const filePath = path.resolve(args[args.length - 1]);
  const data = readJSON(filePath);

  if (!Array.isArray(data)) {
    console.error(" Data in file must be an array of objects.");
    process.exit(1);
  }

  let result;

  switch (command) {
    case "filter": {
      const filters = args.slice(1, -1);
      result = applyFilters(data, filters);
      break;
    }
    case "sort": {
      const field = args[1];
      const order = args[2] || "asc";
      result = sortData(data, field, order);
      break;
    }
    case "group": {
      const field = args[1];
      result = groupData(data, field);
      break;
    }
    case "count": {
      result = countData(data);
      break;
    }
    case "unique": {
      const field = args[1];
      result = uniqueData(data, field);
      break;
    }
    default:
      console.error(` Unknown command: ${command}`);
      process.exit(1);
  }

  console.log(JSON.stringify(result, null, 2));
}

main();
