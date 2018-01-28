var loggly = require("node-loggly-bulk")
var logglyUsername = process.env.loggly_user;
var logglyPassword = process.env.loggly_password;
var logglyToken = process.env.loggly_token;


var logger = loggly.createClient({
    token: logglyToken,
    subdomain: "rdavidson",
    auth: {
        username: logglyUsername,
        password: logglyPassword
    }
  });

exports.log = function(logData){

    logData = new Date().toUTCString() + " " + logData;
    
        if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "debug"){    
        console.log(logData);
        }
        else{
            if(logglyToken != null && logglyPassword != null && logglyUsername != null){    
                logger.log(logData);
            }
            else{
                console.log(logData);
            }
        }
};


