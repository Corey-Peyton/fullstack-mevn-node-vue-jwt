let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let app = require('./../index');

chai.use(chaiHttp);

let token = '';

describe('Test Login User', () => { 

    it('User should be in database', (done) => {
        chai.request(app).post('/login')
            .send({
                'username': 'permadi',
                'password': 'permadi'
            })
            .end((err, res) => {
                // console.log(res.body);
                // console.log(res.body.token);
                expect(res.body).to.have.property('token');
                token = res.body.token;
                expect(err).to.be.null,
                expect(res).to.have.be.status(200)
                done();
            })
    })

    it('User not in database', (done) => {
        chai.request(app).post('/login')
            .send({
                'username': '.',
                'password': '.'
            })
            .end((err, res) => {
                expect(err).to.be.null,
                expect(res).to.have.be.status(401)
                done();
            })
    })

});

describe('Test API Agama', () => {

    it('GET All Data Agama', (done) => {           
        chai.request(app).get('/agama/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(err).to.be.null,
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Agama by ID', (done) => {
        let id_agama = 1;
        chai.request(app).get(`/agama/view/${id_agama}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body); 
            expect(err).to.be.null,
            expect(res).to.have.be.status(200)
            done();
        })
    })

});