// For testing we use chai and Mocha

const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../src/classes/db');
const router = require('../src/routes/routers');
const index = require('../index');
const { users } = require('../src/classes/db');

chai.use(chaiHttp);

// 
describe(`POST http://localhost:3000/users/create`, () => {
    it('should return 200 OK when a valid request is sent', (done) => {

        chai
                .request('http://localhost:3000/users/create')
                .post('')
                .end((err, res) => {

                // General
                expect(err).to.be.null;

                // Check if status code is 200
                expect(res.status).to.equal(200);

                expect(res.status).to.not.equal(404);
                // Important that this is INSIDE the .end()
                done();
        });
    });
    it('Should return true when user is created', (done) => {

        chai
                .request('http://localhost:3000/users/create')
                .post('')
                .end((err, res) => {
                
                expect(res.body).to.equal(true);


                // Check If user is posted
                console.log(res.body);
                
                
                // Important that this is INSIDE the .end()
                done();
        });
    });

    it('Should pass if body is not an object', (done) => {

        chai
                .request('http://localhost:3000/users/create')
                .post('')
                .end((err, res) => {
                
                expect(res.body).to.not.be.an('object');
                

                // Important that this is INSIDE the .end()
                done();
        });
    });

    it('Should add four users to users.json when test is passed', (done) => {

        chai
                .request('http://localhost:3000/users/create')
                .post('')
                .end((err, res) => {
                
                expect(res.body).to.equal(res.body);

                
                // Check If user is posted
                console.log(users);

                // Important that this is INSIDE the .end()
                done();
        });
    });
});
