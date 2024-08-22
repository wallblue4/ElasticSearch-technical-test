const express = require("express");


const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Elasticsearch API está corriendo.");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
