const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

// base route test
describe("Base Route GET /", function() {
    it('base route should be accessible', function(done) {
        chai.request(app)
            .get("/")
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            })
    })
    it('should return my details', function(done) {
        chai.request(app)
            .get("/")
            .end(function(err, res) {
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.should.have.property('status').equal('success');

                done();
            })
    })
})

// validate route test
describe("Validation Route POST /validate-rule", function() {
    it('validation route should be accessible', function(done) {
        chai.request(app)
            .post('/validate-rule')
            .send({})
            .end(function(err, res) {
                res.should.have.status(400);

                done();
            })
    })
    it('validation route should validate successfully', function(done) {
        let data = {
            "rule": {
                "field": "a",
                "condition": "eq",
                "condition_value": 9
            },
            "data": { "a": 9 }
        };
        chai.request(app)
            .post('/validate-rule')
            .send(data)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.should.have.property('status').equal('success');

                done();
            })
    })

    it('validation route should fail for missing data field', function(done) {
        let data = {
            "rule": {
                "field": "ab",
                "condition": "eq",
                "condition_value": 9
            },
            "data": { "a": 9 }
        };
        chai.request(app)
            .post('/validate-rule')
            .send(data)
            .end(function(err, res) {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').equal('field ab is missing from data.');
                res.body.should.have.property('data');
                res.body.should.have.property('status').equal('error');

                done();
            })
    })

    it('validation route should validate nested rule', function(done) {
        let data = {
            "rule": {
                "field": "card.name",
                "condition": "contains",
                "condition_value": "ing"
            },
            "data": { "card": { "name": "king" } }
        };
        chai.request(app)
            .post('/validate-rule')
            .send(data)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                res.body.should.have.property('status').equal('success');

                done();
            })
    })
})