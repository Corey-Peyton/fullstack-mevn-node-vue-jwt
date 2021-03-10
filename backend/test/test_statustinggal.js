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

describe('Test API GET Data Status Tinggal', () => {

    it('GET All Data Status Tinggal but User Not Login', (done) => {
        chai.request(app).get('/statustinggal/view').end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Status Tinggal', (done) => {           
        chai.request(app).get('/statustinggal/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Status Tinggal by ID but User Not Login', (done) => {   
        let id_statustinggal = 'PSW050221001';        
        chai.request(app).get(`/statustinggal/view/${id_statustinggal}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Status Tinggal by ID', (done) => {   
        let id_statustinggal = 2;        
        chai.request(app).get(`/statustinggal/view/${id_statustinggal}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_statustinggal': 2, 'status_tinggal': 'Bersama Orang Tua'})
            done();
        })
    })

    it('POST Data Status Tinggal but User Not Login', (done) => {
        chai.request(app).post(`/statustinggal/add`)
            .send({
                'status_tinggal': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Status Tinggal', (done) => {
        chai.request(app).post(`/statustinggal/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'status_tinggal': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Status Tinggal but User Not Login', (done) => {
        chai.request(app).put(`/statustinggal/update`)
            .send({
                'id_statustinggal': 3,
                'status_tinggal': 'Test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Status Tinggal', (done) => {
        chai.request(app).put(`/statustinggal/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_statustinggal': 3,
                'status_tinggal': 'Test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Status Tinggal but User Not Login', (done) => {
        let id_statustinggal = 1;
        chai.request(app).delete(`/statustinggal/delete/${id_statustinggal}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Status Tinggal', (done) => {
        let id_statustinggal = 1;
        chai.request(app).delete(`/statustinggal/delete/${id_statustinggal}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})