// Unit tests for server.js

var server = require("../server");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
var api = "http://localhost:5001/api/v1";

chai.use(chaiHttp);

describe("/GET ping", () => {
  it("it should GET a ping response", function(done){
    chai
      .request(api)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.equal("all is well");
        done();
      });
  });
});

describe("/POST test search", () => {
  it('it should POST a search "mocha" and return "mocha"', function(done){
      setTimeout(function(){
          check(done, function(){
            chai
            .request(api)
            .post("/search/epm")
            .set("content-type", "application/x-www-form-urlencoded")
            .send({ text: "mocha" })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.message.should.equal(!null);
              done();
          });
      }, 3000);    
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
