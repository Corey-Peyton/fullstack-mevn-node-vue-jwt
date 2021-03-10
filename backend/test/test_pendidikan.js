let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
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
                expect(res).to.have.be.status(200)
                done();
            })
    })

})

describe('Test API GET Data Pendidikan', () => {

    it('GET All Data Pendidikan but User Not Login', (done) => {           
        chai.request(app).get('/pendidikan/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Pendidikan', (done) => {           
        chai.request(app).get('/pendidikan/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Pendidikan by ID but User Not Login', (done) => {   
        let id_pendidikan = 1;        
        chai.request(app).get(`/pendidikan/view/${id_pendidikan}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Pendidikan by ID', (done) => {   
        let id_pendidikan = 2;        
        chai.request(app).get(`/pendidikan/view/${id_pendidikan}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_pendidikan': 2, 'pendidikan': 'Putus SD'})
            done();
        })
    })

    it('POST Data Pendidikan but User Not Login', (done) => {
        chai.request(app).post(`/pendidikan/add`)
            .send({
                'pendidikan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Pendidikan', (done) => {
        chai.request(app).post(`/pendidikan/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'pendidikan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Pendidikan but User Not Login', (done) => {
        chai.request(app).put(`/pendidikan/update`)
            .send({
                'id_pendidikan': '3',
                'pendidikan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Pendidikan', (done) => {
        chai.request(app).put(`/pendidikan/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_pendidikan': '3',
                'pendidikan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Pendidikan but User Not Login', (done) => {
        let id_pendidikan = 1;
        chai.request(app).delete(`/pendidikan/delete/${id_pendidikan}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Pendidikan', (done) => {
        let id_pendidikan = 1;
        chai.request(app).delete(`/pendidikan/delete/${id_pendidikan}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})