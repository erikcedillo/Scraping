//require dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//set up port
var PORT = process.env.PORT || 3000;
// Initialize Express
var app = express();
//set up express router
var router = express.Router();

//require routes file pass our router object
require("./config/routes")(router);

//designate public folder as static directory
app.use(express.static(__dirname + "/public"));

//connect handlebars to express app
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));

//have every request go thru router middleware
app.use(router);

//if deployed use deployed database.  Otherwise use local mongoHeadLines database
var db = process.env.MONODB_URI || "mongodb://localhost/mongoHeadLines";

//connect mongoose to our database
mongoose.connect(db, function(error) {
  //log errors connecting w mongo
  if (error) {
    console.log(error);
  }
  //or log success message
  else {
    console.log("mongoose connection successful")
  }
});

//listen on the port
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});