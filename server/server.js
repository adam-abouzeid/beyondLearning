import express from "express";
import items from "./data/items.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/items", (req, res) => {
  res.json(items);
});

app.get("/api/items/:id", (req, res) => {
  const item = items.find((item) => item._id === parseInt(req.params.id));
  res.json(item);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
