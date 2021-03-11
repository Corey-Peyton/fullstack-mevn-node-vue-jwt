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

describe('Test API Data Ayah', () => {

    it('GET All Data Ayah but User Not Login', (done) => {           
        chai.request(app).get('/ayah/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Ayah', (done) => {           
        chai.request(app).get('/ayah/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Ayah Last ID', (done) => {           
        chai.request(app).get('/ayah/viewlast').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Ayah by ID but User Not Login', (done) => {
        let id_ayah = "PRM030221001";
        chai.request(app).get(`/ayah/view/${id_ayah}`).end((err, res) => {
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Ayah by ID', (done) => {
        let id_ayah = "PRM030221002";
        chai.request(app).get(`/ayah/view/${id_ayah}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_ayah': 'PRM030221002', 'nama_ayah': 'prayitno', 'nik': '1234567891', 'tgl_lahir': '1980-09-01', 'id_pendidikan': 3, 'id_pekerjaan': 2, 'id_penghasilan': 1, 'id_disabilitas': 1})
            done();
        })
    })

    it('POST Data Ayah but User Not Login', (done) => {
        chai.request(app).post(`/ayah/add`)
            .send({
                'id_ayah': 'PRM030221006',
                'nama_ayah': 'Piyu',
                'nik': '1234567891',
                'tgl_lahir': '1980-09-01',
                'id_pendidikan': '2',
                'id_pekerjaan': '2',
                'id_penghasilan': '2',
                'id_disabilitas': '2'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Ayah', (done) => {
        chai.request(app).post(`/ayah/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_ayah': 'PRM030221006',
                'nama_ayah': 'Piyu',
                'nik': '1234567891',
                'tgl_lahir': '1980-09-01',
                'id_pendidikan': '2',
                'id_pekerjaan': '2',
                'id_penghasilan': '2',
                'id_disabilitas': '2'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Ayah but User Not Login', (done) => {
        chai.request(app).put(`/ayah/update`)
            .send({
                'id_ayah': 'PRM030221003',
                'nama_ayah': 'Fadly',
                'nik': '1234567891',
                'tgl_lahir': '1980-09-01',
                'id_pendidikan': '2',
                'id_pekerjaan': '2',
                'id_penghasilan': '2',
                'id_disabilitas': '2'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Ayah', (done) => {
        chai.request(app).put(`/ayah/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_ayah': 'PRM030221004',
                'nama_ayah': 'Fadly',
                'nik': '1234567891',
                'tgl_lahir': '1980-09-01',
                'id_pendidikan': '2',
                'id_pekerjaan': '2',
                'id_penghasilan': '2',
                'id_disabilitas': '2'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Ayah but User Not Login', (done) => {
        let id_ayah = 'PRM030221006';
        chai.request(app).delete(`/ayah/delete/${id_ayah}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Ayah', (done) => {
        let id_ayah = 'PRM030221001';
        chai.request(app).delete(`/ayah/delete/${id_ayah}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})