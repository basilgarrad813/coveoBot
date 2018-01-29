// Unit tests for server.js

var server = require("../server");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
var api = "http://localhost:5001/api/v1";

chai.use(chaiHttp);

describe("/GET ping", () => {
  it("it should GET a ping response", function(done){
    check(done, function(){
      chai
      .request(api)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal("all is well");
      });
    });    
  });
});

function check( done, f ) {
  try {
    f();
    done();
  } catch( e ) {
    done( e );
  }
}