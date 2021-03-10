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

describe('Test API GET Data Pekerjaan', () => {

    it('GET All Data Pekerjaan but User Not Login', (done) => {           
        chai.request(app).get('/pekerjaan/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Pekerjaan', (done) => {           
        chai.request(app).get('/pekerjaan/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Pekerjaan by ID but User Not Login', (done) => {   
        let id_pekerjaan = 1;        
        chai.request(app).get(`/pekerjaan/view/${id_pekerjaan}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Pekerjaan by ID', (done) => {   
        let id_pekerjaan = 2;        
        chai.request(app).get(`/pekerjaan/view/${id_pekerjaan}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_pekerjaan': 2, 'pekerjaan': 'Nelayan'})
            done();
        })
    })

    it('POST Data Pekerjaan but User Not Login', (done) => {
        chai.request(app).post(`/pekerjaan/add`)
            .send({
                'pekerjaan': '1'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Pekerjaan', (done) => {
        chai.request(app).post(`/pekerjaan/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'pekerjaan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Pekerjaan but User Not Login', (done) => {
        chai.request(app).put(`/pekerjaan/update`)
            .send({
                'id_pekerjaan': '2',
                'pekerjaan': '2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Pekerjaan', (done) => {
        chai.request(app).put(`/pekerjaan/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_pekerjaan': '3',
                'pekerjaan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Pekerjaan but User Not Login', (done) => {
        let id_pekerjaan = 1;
        chai.request(app).delete(`/pekerjaan/delete/${id_pekerjaan}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Pekerjaan', (done) => {
        let id_pekerjaan = 1;
        chai.request(app).delete(`/pekerjaan/delete/${id_pekerjaan}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})