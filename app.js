var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    port = process.env.PORT || 3000,
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

// seedDB(); //seed the database
//connect to our server
// mongoose.connect("mongodb://localhost:27017/yelp_camp_v11", {useNewUrlParser: true, useUnifiedTopology: true});
//we can connect to the right database using env variables - one set to local db and the other configured on heroku to be our hosted db
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});
//tell app to use body parser
app.use(bodyParser.urlencoded({extended: true}));
//so we don't have to write .ejs at the end of files we are rendering
app.set("view engine", "ejs");
//tell app to serve public assets
app.use(express.static(__dirname + "/public"));
//tell app to user method override to allow us to user PUT and DELETE requests
app.use(methodOverride("_method"));
//telling app to use the flash
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setting up variables that are common to all files
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//tell app to use the route files, along with first argument of how each route path starts
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, function () {
    console.log("Server Has Started!");
  });