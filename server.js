// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var logger = require("./app/logglyLogger"); //add loggly logger

var search = require("./models/searchRequest");

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure loggly

var port = process.env.PORT || 5001; // set our port

var router = express.Router();

router.use(function(req, res, next) {

  logger.log("A request was recieved");

  next();
});

// test route to make sure everything is working
router.get("/", function(req, res) {
  //console.log("Checking server");
  res.json({ message: "all is well" });
});

router
  .route("/search")

  .all(function(req, res) {
    logger.log("Someone hit the root of search: " + req.body.toString());
    res.sendStatus(400);
  });

router
  .route("/search/epm")

  .post(function(req, res) {
    //if (req.body.token != process.env.VERIFICATIONTOKEN) res.sendStatus(401); //verify request is from Slack using verification token

    var result;

    var requestUrl = "https://landeskcommunity.force.com/customers/CommunitySearch#q=%s&t=All&f:@commonproductgroupname=[LANDESK]&f:@commonproductname=[Management and Security]&f:@commonversion=[9.6,2016,2017]&f:@commonlanguage=[English]" 
    var requestString = req.body.text.replace(/<.*>/, "");

    logger.log("The following string was searched: " + requestString);

    result = search.sendSearchRequest(requestString, requestUrl);

    res.send(result);

  });

//set route to use /api/v1 prefix
app.use("/api/v1", router);

app.listen(port);
logger.log("Listening on port " + port);
