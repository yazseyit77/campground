// let rp = require("request-promise");
let express = require("express");
let bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const camps = [
  {
    name: "Havasu Falls",
    img:
      "https://images.unsplash.com/photo-1501685464075-e03a174b61de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Niagara Falls",
    img:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Yosemite",
    img:
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Redwood",
    img:
      "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1006&q=80",
  },
  {
    name: "Lake Tahoe",
    img:
      "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Mt Charleston",
    img:
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/camp", (req, res) => {
  res.render("camps.ejs", { camps });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/camp", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCamp = { name: name, img: image };
  if (newCamp.name !== "") {
    camps.push(newCamp);
  }
  res.redirect("/camp");
});

app.listen(7000, console.log("Camping app listening on PORT: 7000"));
