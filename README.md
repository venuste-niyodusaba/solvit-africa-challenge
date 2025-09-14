# Node.js Challenge Documentation

## Author
**venuste Niyodusaba**  
**Version:** 1.1.0  
**Date:** 15 September 2025

---

## Challenge 1: JSON Flattener & Rebuilder

### Goal
- **Flatten**: Convert nested JSON objects into flat, dot-notation key–value pairs.
- **Rebuild**: Restore flat dot-notation JSON back to its original nested structure.

### Usage

```bash
# Flatten a nested JSON file
node transformer.js flatten input.json flat.json --pretty

# Rebuild a nested JSON file from a flat version
node transformer.js rebuild flat.json rebuilt.json --pretty
```

### Example

**Input:**
```json
{
  "name": "Alice",
  "roles": ["admin", "editor"],
  "address": { "city": "Paris", "zip": 75001 }
}
```

**Flattened Output:**
```json
{
  "name": "Alice",
  "roles.0": "admin",
  "roles.1": "editor",
  "address.city": "Paris",
  "address.zip": 75001
}
```

**Rebuilt Output:**
```json
{
  "name": "Alice",
  "roles": ["admin", "editor"],
  "address": { "city": "Paris", "zip": 75001 }
}
```

---

## Challenge 2: Array Query CLI (Mini MongoDB)

### Goal
Filter, sort, group, count, and extract unique values from JSON arrays using a simple CLI.

### Usage

```bash
# Filter records by condition
node query.js filter age>25 data.json

# Sort records by a field
node query.js sort name asc data.json

# Group records by a field
node query.js group city data.json

# Count total records
node query.js count data.json

# Get unique values for a field
node query.js unique city data.json
```

### Sample Data

```json
[
  { "name": "Alice", "age": 25, "city": "Paris" },
  { "name": "Bob", "age": 30, "city": "Paris" },
  { "name": "Charlie", "age": 22, "city": "London" },
  { "name": "David", "age": 35, "city": "Kigali" },
  { "name": "Eve", "age": 29, "city": "London" }
]
```

### Examples

- **Filter:**  
  `node query.js filter age>25 sample_data.json`
- **Sort:**  
  `node query.js sort age desc sample_data.json`
- **Group:**  
  `node query.js group city sample_data.json`
- **Count:**  
  `node query.js count sample_data.json`
- **Unique:**  
  `node query.js unique city sample_data.json`

---

Happy coding!