## Node.js Challenge Documentation
 # Author: venuste Niyodusaba
 Version: 1.1.0
 Date: 15 September 2025
 # Challenge 1: JSON Flattener & Rebuilder
 Goal:- Flatten nested JSON into dot-notation key–value pairs.- Rebuild flat JSON back into original nested structure.
 Usage:
 node transformer.js flatten input.json flat.json --pretty
 node transformer.js rebuild flat.json rebuilt.json --pretty
 Example Input:
 {
 "name": "Alice",
 "roles": ["admin", "editor"],
 "address": { "city": "Paris", "zip": 75001 }
 }
 Flattened:
 {
 "name": "Alice",
 "roles.0": "admin",
 "roles.1": "editor",
 "address.city": "Paris",
 "address.zip": 75001
 }
 Rebuilt:
 {
 "name": "Alice",
 "roles": ["admin", "editor"],
 "address": { "city": "Paris", "zip": 75001 }
 }
# Challenge 2: Array Query CLI (Mini MongoDB)
 Goal:- Filter, sort, group, count, and get unique values from JSON arrays.
 Usage:
 node query.js filter age>25 data.json
 node query.js sort name asc data.json
 node query.js group city data.json
 node query.js count data.json
 node query.js unique city data.json
 Sample Data:
 [
 { "name": "Alice", "age": 25, "city": "Paris" },
 { "name": "Bob", "age": 30, "city": "Paris" },
 { "name": "Charlie", "age": 22, "city": "London" },
 { "name": "David", "age": 35, "city": "Kigali" },
 { "name": "Eve", "age": 29, "city": "London" }
 ]
 Examples: 
 Filter: node query.js filter age>25 sample_data.json
 Sort:   node query.js sort age desc sample_data.json
 Group:  node query.js group city sample_data.json
 Count:  node query.js count sample_data.json
 Unique: node query.js unique city sample_data.json