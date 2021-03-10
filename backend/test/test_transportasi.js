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

describe('Test API GET Data Transportasi', () => {

    it('GET All Data Transportasi but User Not Login', (done) => {
        chai.request(app).get('/transportasi/view').end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Transportasi', (done) => {
        chai.request(app).get('/transportasi/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Transportasi by ID but User Not Login', (done) => {   
        let id_transportasi = 1;        
        chai.request(app).get(`/transportasi/view/${id_transportasi}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Transportasi by ID', (done) => {   
        let id_transportasi = 3;        
        chai.request(app).get(`/transportasi/view/${id_transportasi}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_transportasi': 3, 'status_transportasi': 'Kendaraan Umum / Angkot / Pete Pete'})
            done();
        })
    })

    it('POST Data Transportasi but User Not Login', (done) => {
        chai.request(app).post(`/transportasi/add`)
            .send({
                'status_transportasi': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Transportasi', (done) => {
        chai.request(app).post(`/transportasi/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'status_transportasi': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Transportasi but User Not Login', (done) => {
        chai.request(app).put(`/transportasi/update`)
            .send({
                'id_transportasi': 2,
                'status_transportasi': 'Test 2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Transportasi', (done) => {
        chai.request(app).put(`/transportasi/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_transportasi': 2,
                'status_transportasi': 'Test 2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Transportasi but User Not Login', (done) => {
        let id_transportasi = 1;
        chai.request(app).delete(`/transportasi/delete/${id_transportasi}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Transportasi', (done) => {
        let id_transportasi = 1;
        chai.request(app).delete(`/transportasi/delete/${id_transportasi}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})