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

describe('Test API Data Wali', () => {

    it('GET All Data Wali but User Not Login', (done) => {           
        chai.request(app).get('/wali/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Wali', (done) => {           
        chai.request(app).get('/wali/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Wali by ID but User Not Login', (done) => {
        let id_wali = "PRW030221001";
        chai.request(app).get(`/wali/view/${id_wali}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Wali by ID', (done) => {
        let id_wali = "PRW030221001";
        chai.request(app).get(`/wali/view/${id_wali}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_wali': 'PRW030221001', 'nama_wali': 'Tejo', 'jenis_kelamin': 'L', 'nik': '1234567891', 'tgl_lahir': '1998-04-03', 'id_pendidikan': 3, 'id_pekerjaan': 2, 'id_penghasilan': 1, 'id_disabilitas': 1})
            done();
        })
    })

    it('POST Data Wali but User Not Login', (done) => {
        chai.request(app).post(`/wali/add`)
            .send({
                'id_wali': 'PRW030221007',
                'jenis_kelamin': 'L',
                'nama_wali': 'Paijo',
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

    it('POST Data Wali', (done) => {
        chai.request(app).post(`/wali/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_wali': 'PRW030221007',
                'jenis_kelamin': 'L',
                'nama_wali': 'Paijo',
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

    it('PUT Data Wali but User Not Login', (done) => {
        chai.request(app).put(`/wali/update`)
            .send({
                'id_wali': 'PRW030221002',
                'jenis_kelamin': 'L',
                'nama_wali': 'Paijo',
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

    it('PUT Data Wali', (done) => {
        chai.request(app).put(`/wali/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_wali': 'PRW030221002',
                'jenis_kelamin': 'L',
                'nama_wali': 'Paijo',
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

    it('DELETE Data Wali but User Not Login', (done) => {
        let id_wali = 'PRW030221007';
        chai.request(app).delete(`/wali/delete/${id_wali}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Wali', (done) => {
        let id_wali = 'PRW030221007';
        chai.request(app).delete(`/wali/delete/${id_wali}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

});