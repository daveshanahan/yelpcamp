var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis aliquet metus quis consectetur. Praesent consectetur dictum mi sit amet consequat. Aenean consectetur semper malesuada. Etiam elit tellus, consectetur quis dictum sed, lobortis vitae neque. Ut non fermentum ligula. Nullam porttitor dictum arcu, a semper lectus ullamcorper quis. Morbi at tincidunt quam, vel aliquet felis. Nullam ex sem, aliquam pretium magna ut, fringilla faucibus quam. Phasellus semper elementum nulla a vehicula. In vitae tincidunt odio, ut malesuada purus. Sed porttitor rutrum risus, non venenatis lorem porttitor vitae."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis aliquet metus quis consectetur. Praesent consectetur dictum mi sit amet consequat. Aenean consectetur semper malesuada. Etiam elit tellus, consectetur quis dictum sed, lobortis vitae neque. Ut non fermentum ligula. Nullam porttitor dictum arcu, a semper lectus ullamcorper quis. Morbi at tincidunt quam, vel aliquet felis. Nullam ex sem, aliquam pretium magna ut, fringilla faucibus quam. Phasellus semper elementum nulla a vehicula. In vitae tincidunt odio, ut malesuada purus. Sed porttitor rutrum risus, non venenatis lorem porttitor vitae."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis aliquet metus quis consectetur. Praesent consectetur dictum mi sit amet consequat. Aenean consectetur semper malesuada. Etiam elit tellus, consectetur quis dictum sed, lobortis vitae neque. Ut non fermentum ligula. Nullam porttitor dictum arcu, a semper lectus ullamcorper quis. Morbi at tincidunt quam, vel aliquet felis. Nullam ex sem, aliquam pretium magna ut, fringilla faucibus quam. Phasellus semper elementum nulla a vehicula. In vitae tincidunt odio, ut malesuada purus. Sed porttitor rutrum risus, non venenatis lorem porttitor vitae."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
}

module.exports = seedDB;