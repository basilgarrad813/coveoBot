var loggly = require("node-loggly-bulk")


const logger = loggly.createClient({
    token: "138c1627-8149-44a0-8c02-ac00536e1cba",
    subdomain: "rdavidson",
    auth: {
        username: "basilgarrad813",
        password: "Robinton813"
    }
  });

exports.log = function(logData){
        logData = new Date().toUTCString() + " " + logData;
        logger.log(logData);
};


