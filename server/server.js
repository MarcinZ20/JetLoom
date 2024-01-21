const { Pool } = require("pg");

const client = new Pool({
  user: "marcin",
  host: "localhost",
  database: "jetloomdb",
  password: "jetloom",
  port: 5432, // Default PostgreSQL port
});

client.connect((err) => {
  client.query("SELECT $1::text as message", ["Hello world!"], (err, res) => {
    console.log(err ? err.stack : res.rows[0].message); // Hello World!
    client.end();
  });
});

const express = require("express");
const path = require("path");
const Trip = require("./models/tripModel");
const Review = require("./models/reviewModel");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../dist/jet-loom/browser")));

app.get("/", (req, res) => {
  res.send("Hello World from Node.js server!");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/jet-loom/browser/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
