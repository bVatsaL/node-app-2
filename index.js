const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 3004;

const app = express();
app.use(bodyParser.json({
  extended: true,
}));

app.use(cors());

let items = [];

app.get("/api", (req, res) => {
  res.json({data: items});
});

app.post("/api", (req, res) => {
  const body = req.body;
  items.push(body.item);
  res.json({data: items});
});

app.delete("/api/clear", (req, res) => {
  items = [];
  res.json({data: items});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
