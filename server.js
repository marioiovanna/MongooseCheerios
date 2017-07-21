
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static("public"));
mongoose.Promise = Promise;

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

var connectDb = process.env.MONGODB_URI || "mongodb://localhost/urlRepo";

mongoose.connect(connectDb);
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});
db.once("open", function() {
    console.log("Mongoose connection successful.");
});

app.listen(port, function (req) {
    console.log("listening on port", port);
});

var routes = require('./controller/controller.js')(app);
