const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("../client/dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/", "index.html"));
});

const DOMAIN = "localhost";
const PORT = "8080";
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});
