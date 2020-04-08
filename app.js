// let rp = require("request-promise");
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const camps = [
  {
    name: "Havasu Falls",
    img:
      "https://images.unsplash.com/photo-1501685464075-e03a174b61de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Niagara Falls",
    img:
      "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80",
  },
  {
    name: "Yosemite",
    img:
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/camp", (req, res) => {
  res.render("camps.ejs", { camps });
});

app.get("/camp/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/camp", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCamp = { name: name, img: image };
  camps.push(newCamp);
  res.redirect("/camp");
});

app.listen(7000, console.log("Camping app listening on PORT: 7000"));
