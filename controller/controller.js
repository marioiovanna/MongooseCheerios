
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var path = require('path');

var app = express();

app.set('views', path.join(__dirname, 'public'));


var Notes = require("../models/Notes.js");
var Articles = require("../models/Articles.js");


module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('home');
    });

    app.get("/scrape", function (req, res) {

        var result = [];

        request("https://ebay.com/deals/", function (error, response, html) {

            var $ = cheerio.load(html);

            $("div.slashui-image-cntr").each(function (i, element) {

                result.name = $(this).children().attr('alt');
                result.pic = $(this).children().attr('src');

                var entry = new Articles(result);

                entry.save(function (err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        result.push(doc);
                        // console.log(result)
                    }
                });
            });
            res.render('renderall', {articles: result})

        });
    });

    app.post("/save", function(req, res) {
        Articles.find({})
            .populate("notes")
            .exec(function(error, doc) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(doc);
                }
            });
    });





};
