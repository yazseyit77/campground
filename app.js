// let rp = require("request-promise");
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect('mongodb://localhost:27017/campground', { useNewUrlParser: true, useUnifiedTopology: true });


//Schema set up

let campSchema = new mongoose.Schema({
  name: String,
  img: String,
  description: String
})

let Campground = mongoose.model("Campground", campSchema)

// Campground.create({
//   name: "Niagara Falls",
//   img:
//     "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   description: "This is the most beautiful place to camp overnight and enjoy the view with waterfall"
// }, (err, campground) => {
//   if (err) {
//     console.log("OOPS, an error popped up");
//     console.log(err)
//   } else {
//     console.log("New Campground is created")
//     console.log(campground)
//   }
// })

// const camps = [
//   {
//     name: "Havasu Falls",
//     img:
//       "https://images.unsplash.com/photo-1501685464075-e03a174b61de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   },
//   {
//     name: "Niagara Falls",
//     img:
//       "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   },
//   {
//     name: "Yosemite",
//     img:
//       "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   },
//   {
//     name: "Redwood",
//     img:
//       "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1006&q=80",
//   },
//   {
//     name: "Lake Tahoe",
//     img:
//       "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   },
//   {
//     name: "Mt Charleston",
//     img:
//       "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   },
// ];

// main page
app.get("/", (req, res) => {
  res.render("landing.ejs");
});

// index page to display all the camps
app.get("/camps", (req, res) => {
  Campground.find({}, (err, AllCampgrounds) => {
    if (err) {
      console.log(err)
    } else {
      res.render("index.ejs", { camps: AllCampgrounds });
    }
  })
});


// post route, to send data to database and get response
app.post("/camps", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.description;
  const newCamp = { name: name, img: image, description: desc };
  Campground.create(newCamp, (err, newCreated) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/camps");
    }
  })
  // if (newCamp.name !== "") {
  //   camps.push(newCamp);
  // }
});

// create or new page, to create new campground
app.get("/new", (req, res) => {
  res.render("new.ejs");
});

//show route/page
app.get("/camps/:id", (req, res) => {
  //find the camp with given id, show that page
  Campground.findById(req.params.id, (err, foundCamp) => {
    if (err) {
      console.log(err)
    } else {
      res.render("show.ejs", { camp: foundCamp })
    }
  })
})


app.listen(7000, console.log("Camping app listening on PORT: 7000"));
