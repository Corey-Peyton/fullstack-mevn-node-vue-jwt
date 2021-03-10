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

describe('Test API GET Data Kecamatan', () => {

    it('GET All Data Kecamatan but User Not Login', (done) => {           
        chai.request(app).get('/kecamatan/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Kecamatan', (done) => {           
        chai.request(app).get('/kecamatan/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Kecamatan by ID but User Not Login', (done) => {   
        let id_kecamatan = 1;        
        chai.request(app).get(`/kecamatan/view/${id_kecamatan}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Kecamatan by ID', (done) => {   
        let id_kecamatan = 1;        
        chai.request(app).get(`/kecamatan/view/${id_kecamatan}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_kecamatan': 1, 'kecamatan': 'Selupu Rejang'})
            done();
        })
    })

    it('POST Data Kecamatan but User Not Login', (done) => {
        chai.request(app).post(`/kecamatan/add`)
            .send({
                'kecamatan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Kecamatan', (done) => {
        chai.request(app).post(`/kecamatan/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'kecamatan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Kecamatan but User Not Login', (done) => {
        chai.request(app).put(`/kecamatan/update`)
            .send({
                'id_kecamatan': 2,
                'kecamatan': 'test2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Kecamatan', (done) => {
        chai.request(app).put(`/kecamatan/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_kecamatan': 2,
                'kecamatan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Kecamatan but User Not Login', (done) => {
        let id_kecamatan = 2;
        chai.request(app).delete(`/kecamatan/delete/${id_kecamatan}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Kecamatan', (done) => {
        let id_kecamatan = 3;
        chai.request(app).delete(`/kecamatan/delete/${id_kecamatan}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})