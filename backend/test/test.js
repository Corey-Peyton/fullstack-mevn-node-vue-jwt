const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('./../index');

chai.use(chaiHttp);

describe('API Agama Testing', () => {

    let token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcm1hZGkiLCJ1c2VySWQiOiJjZmU3MGI3YS1iMDg3LTQ4ZmYtODM5Yy05MGFkNDYyMjU5YzIiLCJpYXQiOjE2MTQ3MzgyMzUsImV4cCI6MTYxNDgyNDYzNX0.i0AqZcgG-on4AvWSYFQLmozIEDzvTFCfxfPb1lMuu00;
    let username = null;
    let password = null;

    before(function(done) {
        chai.request(app)
        .post('/login')
        .send({ "permadi": username, "permadi": password })
        .end(function(err, res) {
            token2 = res.body.token;
            done();
        });
    });

    it('GET All Agama', (done) => {
        // chai.request(app).get('/agama/view').set('Authorization', 'Bearer ' + token).end((err, res) => {   
        // chai.request(app).get('/agama/view').set(token,{ type: 'bearer' }).end((err, res) => {         
        chai.request(app).get('/agama/view').set({ "Authorization": `Bearer ${token}` }).end((err, res) => {  
            expect(err).to.be.null,
            expect(res).to.have.be.status(200)
            done();
        })
    })
});