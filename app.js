// let rp = require("request-promise");
let express = require("express");
let app = express();

app.get("/", (req, res) => {
  res.send("Started");
});

app.listen(7000, console.log("Camping app listening on PORT: 7000"));
