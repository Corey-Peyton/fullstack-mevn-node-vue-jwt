const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
// const app = require('./../index');

chai.use(chaiHttp);

describe('API ENDPOINT TESTING', () => {
    it('GET Agama', (done) => {
        chai.request('http://localhost:8800').get('/agama/view').end((err, res) => {
            expect(err).to.be.null,
            expect(res).to.have.response.status(200)
            done();
        })
    })
});