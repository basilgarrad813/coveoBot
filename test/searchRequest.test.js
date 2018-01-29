// Unit tests for server.js

var server = require("../server");
var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
var api = "http://localhost:5001/api/v1";

chai.use(chaiHttp);

describe("EPM search test", () => {
  it('it should POST a search "Data Analytics" and return a valid response', function(done){
      setTimeout(function(){
          check(done, function(){
            chai
            .request(api)
            .post("/search/epm")
            .set("content-type", "application/x-www-form-urlencoded")
            .send({ text: "Data Analytics" })
            .end((err, res) => {
                res.should.have.status(200);

              res.body.message.should.equal(!null);
          });
      }, 3000);    
      });
  });
});

describe("Global search test", () => {
  it('it should POST a search "Data Analytics" and return a valid response', function(done){
      setTimeout(function(){
          check(done, function(){
            chai
            .request(api)
            .post("/search/all")
            .set("content-type", "application/x-www-form-urlencoded")
            .send({ text: "Data Analytics" })
            .end((err, res) => {
            //console.log(res.body);
            res.should.have.status(200);
              res.body.message.should.equal(!null);
              
          });
      }, 3000);    
      });
  });
});

describe("Service Desk search test", () => {
  it('it should POST a search "workspaces" and return a valid response', function(done){
      setTimeout(function(){
          check(done, function(){
            chai
            .request(api)
            .post("/search/sd")
            .set("content-type", "application/x-www-form-urlencoded")
            .send({ text: "workspaces" })
            .end((err, res) => {
            //console.log(res.body);
              res.should.have.status(200);
              res.body.message.should.equal(!null);
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
    console.log(e);

      done( e );
    }
  }
