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

describe('Test API GET Data Jenis Alasan', () => {

    it('GET All Data Jenis Alasan but User Not Login', (done) => {           
        chai.request(app).get('/jenisalasan/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Jenis Alasan', (done) => {           
        chai.request(app).get('/jenisalasan/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Jenis Alasan by ID but User Not Login', (done) => {   
        let id_jenisalasan = 1;        
        chai.request(app).get(`/jenisalasan/view/${id_jenisalasan}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Jenis Alasan by ID', (done) => {   
        let id_jenisalasan = 2;        
        chai.request(app).get(`/jenisalasan/view/${id_jenisalasan}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_jenisalasan': 2, 'alasan': 'Mutasi'})
            done();
        })
    })

    it('POST Data Jenis Alasan but User Not Login', (done) => {
        chai.request(app).post(`/jenisalasan/add`)
            .send({
                'alasan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Jenis Alasan', (done) => {
        chai.request(app).post(`/jenisalasan/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'alasan': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Jenis Alasan but User Not Login', (done) => {
        chai.request(app).put(`/jenisalasan/update`)
            .send({
                'id_jenisalasan': 1,
                'alasan': 'Test 2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Jenis Alasan', (done) => {
        chai.request(app).put(`/jenisalasan/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_jenisalasan': 3,
                'alasan': 'test 2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Jenis Alasan but User Not Login', (done) => {
        let id_jenisalasan = 1;
        chai.request(app).delete(`/jenisalasan/delete/${id_jenisalasan}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Jenis Alasan', (done) => {
        let id_jenisalasan = 1;
        chai.request(app).delete(`/jenisalasan/delete/${id_jenisalasan}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})