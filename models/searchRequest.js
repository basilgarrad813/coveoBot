var request = require("request");
var util = require("util");
var querystring = require("querystring");
var http = require("http");
var logger = require("./../app/logglyLogger"); //add loggly logger
var request = require("request");
var jsonQuery = require("json-query");


var coveo_api_key = process.env.coveo_api_key;

exports.searchEPM = function(searchTerm, callback){
  var resultArray = {};
//logger.log("API KEY " + coveo_api_key);
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
          "text" : "Here are the top 5 results for: " + searchTerm,
          "attachments": []
      };
      for(var i = 0; i < body.results.length; i++){       

        var searchResult = body.results[i];
        var result = {};
        result.fallback = searchResult.title;
        result.title = searchResult.title;
        result.title_link = searchResult.clickUri;
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

exports.searchSD = function(searchTerm, callback){

  var resultArray = {};


  var options = {
    uri: 'https://platform.cloud.coveo.com/rest/search/v2?organizationId=landeskprod',
    method: 'POST',
    json: {
      "q" : "@sysdocumenttype=\"document\" @jiveparentplaces=\"Ivanti Service Desk and Asset Manager\"" + searchTerm,
      "numberOfResults" : 5
    }
  };
  request(options, function (err, res, body){
    if (!err && res.statusCode == 200) { 
      //logger.log("Response body: " + body);
    resultArray = { 
        "response_type" : "in_channel",
        "text" : "Here are the top 5 results for: " + searchTerm,
        "attachments": []
    };
    for(var i = 0; i < body.results.length; i++){       

      var searchResult = body.results[i];
      var result = {};
      result.fallback = searchResult.title;
      result.title = searchResult.title;
      result.title_link = searchResult.clickUri;
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

exports.searchAll = function(searchTerm, callback){
  var resultArray = {};

  var options = {
    uri: 'https://platform.cloud.coveo.com/rest/search/v2?organizationId=landeskprod',
    method: 'POST',
    json: {
      "q" : "@sysdocumenttype=\"document\"" + searchTerm,
      "numberOfResults" : 10
    }
  };
  request(options, function (err, res, body){
    if (!err && res.statusCode == 200) { 
      //logger.log("Response body: " + body);
    resultArray = { 
        "response_type" : "in_channel",
        "text" : "Here are the top 10 results for: " + searchTerm,
        "attachments": []
    };
    for(var i = 0; i < body.results.length; i++){       

      var searchResult = body.results[i];
      var result = {};
      result.fallback = searchResult.title;
      result.title = searchResult.title;
      result.title_link = searchResult.clickUri;
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
