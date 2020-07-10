let mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

const data = [
  {
    name: "Havasu Falls",
    description: "Lorem ipsum dolor sit amet.",
    img:
      "https://images.unsplash.com/photo-1501685464075-e03a174b61de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Niagara Falls",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Yosemite",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, modi!",
    img:
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Redwood",
    description: "Lorem ipsum dolor sit.",
    img:
      "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1006&q=80",
  },
  {
    name: "Lake Tahoe",
    description: "Lorem, ipsum dolor.",
    img:
      "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Mt Charleston",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad repudiandae facere ratione voluptate temporibus.",
    img:
      "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
];

function seedDB() {
  // remove all campgrounds
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("Campgrounds are removed!");

    // add a few camps
    data.forEach(function (seed) {
      Campground.create(seed, function (err, camp) {
        if (err) {
          console.log(err);
        } else {
          console.log("camp added");
          // create a camp comment
          Comment.create(
            {
              text: "This place is great but I wish there was a free wifi",
              author: "Ashley",
            },
            function (err, comment) {
              if (err) {
                console.log(err);
              } else {
                camp.comments.push(comment);
                camp.save();
                console.log("comment created");
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
