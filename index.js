import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("ggggggg World!");
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
