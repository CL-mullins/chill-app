const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);

const User = require("../models/user");

describe("User", function () {
  // login
  it("should not be able to login if they have not registered", function (done) {
    agent
      .post("/auth/login", { username: "wrong@wrong.com", password: "nope" })
      .end(function (err, res) {
        res.status.should.be.equal(401);
        done();
      });
  });
  // signup
  it("should be able to signup", function (done) {
    User.findOneAndRemove({ username: "testone" }, function () {
      agent
        .post("/auth/sign-up")
        .send({ username: "testone", password: "password" })
        .end(function (err, res) {
          console.log(res.body);
          res.should.have.status(200);
          agent.should.have.cookie("nToken");
          done();
        });
    });

    // login
    it('should be able to login', function (done) {
        agent
        .post('/login')
        .send({ username: 'testone', password: 'password' })
        .end(function (err, res) {
            res.should.have.status(200);
            agent.should.have.cookie('nToken');
            done();
        });
    });

    it('Should authenticate admin status', function() {
      // foo
    });

    it('Should allow admins to add stores to DB', function() {
    // foo
    });
  });
  after(function () {
    agent.close();
  });
});