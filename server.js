require("dotenv").config(); //load environment variables

// call dependancies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var logger = require("./app/logglyLogger");
var search = require("./models/searchRequest");

var port = process.env.PORT;
var router = express.Router();

var failedResponse = {
  "response_type" : "in_channel",
  "text" : "Something went wrong"
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware for all requests
router.use(function(req, res, next) { 
  if(process.env.NODE_ENV == "debug")
  logger.log("A request was recieved");
  next();
});

// test route to make sure everything is working
router.get("/", function(req, res) {
  logger.log("Checking server");
  res.json({ message: "all is well" });
});

//epm search route
router
  .route("/search/epm")

  .post(function(req, res) {

    //send an EPM search request

      var requestString = req.body.text.replace(/<.*>/, ""); //remove tags from request
      search.searchEPM(requestString, function(err, result){
      //logger.log("API Result" + result);
        if(!err && result != null){       
          res.status(200).json(result);
        }
        else{
          res.status(200).json(failedResponse);
          logger.log("Error: " + err);
        }
    });
  });

//service desk search route
router 
  .route("/search/sd")

  .post(function(req,res){
    var requestString = req.body.text.replace(/<.*>/, ""); //remove tags from request
    search.searchSD(requestString, function(err, result){
    //logger.log("API Result" + result);
      if(!err && result != null){       
        res.status(200).json(result);
      }
      else{
        res.status(200).json(failedResponse);
        logger.log("Error: " + err);

      }
  });
});

//global search route
router
  .route("search/all")

  .post(function(req, res){
    var requestString = req.body.text.replace(/<.*>/, ""); //remove tags from request
    search.searchAll(requestString, function(err, result){
    //logger.log("API Result" + result);
      if(!err && result != null){       
        res.status(200).json(result);
      }
      else{
        res.status(200).json(failedResponse);
        logger.log("Error: " + err);

      }
  });

});

//set route to use /api/v1 prefix
app.use("/api/v1", router);

app.listen(port);

//logger.log("Listening on port " + port);
