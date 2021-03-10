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

describe('Test API GET Data Kelurahan', () => {

    it('GET All Data Kelurahan but User Not Login', (done) => {           
        chai.request(app).get('/kelurahan/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Kelurahan', (done) => {           
        chai.request(app).get('/kelurahan/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Kelurahan by ID but User Not Login', (done) => {   
        let id_kelurahan = 1;        
        chai.request(app).get(`/kelurahan/view/${id_kelurahan}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Kelurahan by ID', (done) => {   
        let id_kelurahan = 2;        
        chai.request(app).get(`/kelurahan/view/${id_kelurahan}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_kelurahan': 2, 'id_kecamatan': 2, 'kelurahan': 'Antapani Kulon', 'kode_pos': '40291'})
            done();
        })
    })

    it('POST Data Kelurahan but User Not Login', (done) => {
        chai.request(app).post(`/kelurahan/add`)
            .send({
                'id_kecamatan': 2,
                'kelurahan': 'Antapani Kidul',
                'kode_pos': '39152'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Kelurahan', (done) => {
        chai.request(app).post(`/kelurahan/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_kecamatan': 2,
                'kelurahan': 'Antapani Kidul',
                'kode_pos': '39152'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Kelurahan but User Not Login', (done) => {
        chai.request(app).put(`/kelurahan/update`)
            .send({
                'id_kelurahan': 3,
                'id_kecamatan': 2,
                'kelurahan': 'Antapani Kidul',
                'kode_pos': '39152'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Kelurahan', (done) => {
        chai.request(app).put(`/kelurahan/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_kelurahan': 3,
                'id_kecamatan': 2,
                'kelurahan': 'Antapani Kidul',
                'kode_pos': '39152'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Kelurahan but User Not Login', (done) => {
        let id_kelurahan = 1;
        chai.request(app).delete(`/kelurahan/delete/${id_kelurahan}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Kelurahan', (done) => {
        let id_kelurahan = 1;
        chai.request(app).delete(`/kelurahan/delete/${id_kelurahan}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})