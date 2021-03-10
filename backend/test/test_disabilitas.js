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

describe('Test API GET Data Disabilitas', () => {

    it('GET All Data Disabilitas but User Not Login', (done) => {           
        chai.request(app).get('/disabilitas/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Disabilitas', (done) => {           
        chai.request(app).get('/disabilitas/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Disabilitas by ID but User Not Login', (done) => {   
        let id_disabilitas = 1;        
        chai.request(app).get(`/disabilitas/view/${id_disabilitas}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Disabilitas by ID', (done) => {   
        let id_disabilitas = 2;        
        chai.request(app).get(`/disabilitas/view/${id_disabilitas}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_disabilitas': 2, 'status_disabilitas': 'Netra'})
            done();
        })
    })

    it('POST Data Disabilitas but User Not Login', (done) => {
        chai.request(app).post(`/disabilitas/add`)
            .send({
                'status_disabilitas': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Disabilitas', (done) => {
        chai.request(app).post(`/disabilitas/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'status_disabilitas': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Disabilitas but User Not Login', (done) => {
        chai.request(app).put(`/disabilitas/update`)
            .send({
                'id_disabilitas': 3,
                'status_disabilitas': 'Test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Disabilitas', (done) => {
        chai.request(app).put(`/disabilitas/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_disabilitas': 3,
                'status_disabilitas': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Disabilitas but User Not Login', (done) => {
        let id_disabilitas = 1;
        chai.request(app).delete(`/disabilitas/delete/${id_disabilitas}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Disabilitas', (done) => {
        let id_disabilitas = 1;
        chai.request(app).delete(`/disabilitas/delete/${id_disabilitas}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})