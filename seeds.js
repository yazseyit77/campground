let mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

const data = [
  {
    name: "Havasu Falls",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam earum laudantium nihil aliquid ducimus nisi minima voluptatem labore? Officiis impedit, vero recusandae magni distinctio similique.",
    img:
      "https://images.unsplash.com/photo-1501685464075-e03a174b61de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Niagara Falls",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque voluptates quae laboriosam sint quis ipsam, tempora, adipisci dolorum vero beatae dolore, facilis assumenda? Excepturi enim doloribus minima perferendis eos deleniti reiciendis nihil ut?",
    img:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Yosemite",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus recusandae ipsam deserunt modi repellendus at, doloremque numquam sapiente quisquam. Rerum officiis vel blanditiis necessitatibus. Reiciendis nostrum officiis assumenda similique debitis ipsa nesciunt optio velit sint, at nihil odit est tenetur sapiente quis et possimus?",
    img:
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Redwood",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus recusandae ipsam deserunt modi repellendus at, doloremque numquam sapiente quisquam. Rerum officiis vel blanditiis necessitatibus. Reiciendis nostrum officiis assumenda similique debitis ipsa nesciunt optio velit sint, at nihil odit est tenetur sapiente quis et possimus?",
    img:
      "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1006&q=80",
  },
  {
    name: "Lake Tahoe",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique odit laboriosam quae suscipit culpa harum, rerum nobis eaque doloremque voluptatum ad, voluptatibus soluta sed laborum id exercitationem ullam ex fugit aliquam! Saepe eum eligendi, distinctio expedita earum eaque fugit.",
    img:
      "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
  {
    name: "Mt Charleston",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum hic ratione fuga exercitationem quam optio. Nobis quae quibusdam nemo quia cumque, perferendis maiores suscipit magnam, placeat voluptatibus minima, saepe non sint veritatis fuga illum eligendi! Saepe, cumque tempore.",
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
