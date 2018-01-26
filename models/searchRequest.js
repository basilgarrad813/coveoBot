var request = require("request");
var util = require("util");
var querystring = require("querystring");
var http = require("http");
var logger = require("./../app/logglyLogger"); //add loggly logger
var request = require("request");
var jsonQuery = require("json-query");
var resultArray = {};


var coveo_api_key = process.env.COVEO_API_KEY || '9cb3d8f0-1ed4-4747-8908-41db5183834d';

exports.sendAPICall = function(searchTerm, callback){


  var options = {
    uri: 'https://platform.cloud.coveo.com/rest/search/v2?organizationId=landeskprod',
    method: 'POST',
    json: {
      "q" : "@jiveparentplaces=\"Endpoint Manager and Endpoint Security\" @sysdocumenttype=\"document\"" + searchTerm,
      "numberOfResults" : 5
    }
  };

  request(options, function (err, res, body){
      if (!err && res.statusCode == 200) { 
        //logger.log("Response body: " + body);
      resultArray = { 
          "response_type" : "in_channel",
          "text" : "Here are the top 5 results for " + searchTerm,
          "attachments": []
      };
      for(var i = 0; i < body.results.length; i++){       

        var searchResult = body.results[i];
        var result = {};
        result.fallback = searchResult.title;
        result.title = searchResult.title;
        result.title_link = searchResult.uri;
        result.text = searchResult.excerpt;

        resultArray.attachments.push(result);
             
          //logger.log("Result #" + (i + 1) + ": " + resultArray[i]);     
      }
      //logger.log(resultArray[0]);
        //logger.log(JSON.stringify(body));
        //return body;
      }      
    //return err.statusCode
    callback(err, resultArray);
    }
    
  ).auth( null, null, true, coveo_api_key);
};
