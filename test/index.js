// test/index.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it } = require('mocha');
const app = require('../server');

// CHAI MIDDLEWEAR
chai.use(chaiHttp);

const agent = chai.reqeust.agent(app);

const should = chai.should();

describe('site', function () {
    it('Should have home page', function(done) {
        agent
            .get('/')
            .end(function (err, res) {
                if (err) {
                    return done (err);
                }
                res.should.have.status(200);
                return done(); // Call done if test completed successfully
            })
    });



    it('Should incremenet queue', function() {
        // foo
    });

    it('Should assign users queue numbers', function () {
        // buz
    });

    it('Should let users know when it is their turn', function() {
        // foo
    });
after(function () {
    agent.close();
    });  
});