var request = require("request");
var cheerio = require("cheerio");
var util = require("util");
var logger = require("./../app/logglyLogger"); //add loggly logger
var resultArray = [];

exports.sendSearchRequest = function(requestString, requestUrl){

    logger.log("URL: " + requestUrl);
    logger.log("Search: " + requestString);
    var searchUrl = util.format(requestUrl, requestString);

    //logger.log("Search url: " + searchUrl);    
    
    logger.log("Requesting search results");
    logger.log("Search url: " + searchUrl);

request(searchUrl, function (err, res, html) {

    logger.log("Entered request");

    if (!err && res.statusCode == 200) {
        
        logger.log("Success");
        logger.log(html);
    var $ = cheerio.load(html);
    var i = 0;
    $('.CoveoResultLink[class=CoveoResultList]').each(function(index, element){
        if(i < 10){
        var url = element.attr('href');
        var title = element.html;
        
        logger.log(url.toString() + title.toString());
        var resultJSON = {
            URL: url,
            Title: title
        }
        logger.log(resultJSON);
        array.push(resultJSON);
        i++;
    }
    else logger.log("Failed request: " + err);
    })

    if(err) return err;
   
  }
  else {
      logger.log("Err: " + res.statusCode);
  }
});

if(resultArray.length > 0){
    return resultArray
}
else {
    var fail  = { 
        message: "Failed"
    }
    return fail;
}
}
