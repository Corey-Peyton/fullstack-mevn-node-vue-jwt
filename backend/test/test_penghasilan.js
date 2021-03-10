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

describe('Test API GET Data Penghasilan', () => {

    it('GET All Data Penghasilan but User Not Login', (done) => {           
        chai.request(app).get('/penghasilan/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Penghasilan', (done) => {           
        chai.request(app).get('/penghasilan/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Penghasilan by ID but User Not Login', (done) => {   
        let id_penghasilan = 2;        
        chai.request(app).get(`/penghasilan/view/${id_penghasilan}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Penghasilan by ID', (done) => {   
        let id_penghasilan = 2;        
        chai.request(app).get(`/penghasilan/view/${id_penghasilan}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_penghasilan': 2, 'penghasilan': 'Rp. 500.000 - Rp. 999.999'})
            done();
        })
    })

    it('POST Data Penghasilan but User Not Login', (done) => {
        chai.request(app).post(`/penghasilan/add`)
            .send({
                'penghasilan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Penghasilan', (done) => {
        chai.request(app).post(`/penghasilan/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'penghasilan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Penghasilan but User Not Login', (done) => {
        chai.request(app).put(`/penghasilan/update`)
            .send({
                'id_penghasilan': '3',
                'penghasilan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Pengashilan', (done) => {
        chai.request(app).put(`/penghasilan/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_penghasilan': '3',
                'penghasilan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Penghasilan but User Not Login', (done) => {
        let id_penghasilan = 1;
        chai.request(app).delete(`/penghasilan/delete/${id_penghasilan}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Penghasilan', (done) => {
        let id_penghasilan = 1;
        chai.request(app).delete(`/penghasilan/delete/${id_penghasilan}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})