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

describe('Test API GET Data Siswa Masuk', () => {

    it('GET All Data Siswa Masuk but User Not Login', (done) => {
        chai.request(app).get('/siswamasuk/view').end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Siswa Masuk', (done) => {           
        chai.request(app).get('/siswamasuk/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Siswa Masuk by ID but User Not Login', (done) => {   
        let id_siswamasuk = 'SWM050221002';        
        chai.request(app).get(`/siswamasuk/view/${id_siswamasuk}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Siswa Masuk by ID', (done) => {   
        let id_siswamasuk = 'SWM050221002';       
        chai.request(app).get(`/siswamasuk/view/${id_siswamasuk}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            // expect(res.body.values).to.deep.include({'id_siswamasuk': 'SWM050221002', 'id_siswa': 'SSW050221002', 'jenis_daftar': '1', 'tgl_masuk': '2021-02-11', 'nis': '122', 'no_ujian': '123', 'no_ujian': '123', 'no_skhus': '123'})
            done();
        })
    })

    it('GET Data Siswa Masuk by Last ID', (done) => {   
        chai.request(app).get(`/siswamasuk/viewlast`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            // expect(res.body.values).to.deep.include({'id_siswamasuk': 'SWM050221002', 'id_siswa': 'SSW050221002', 'jenis_daftar': '1', 'tgl_masuk': '2021-02-11', 'nis': '122', 'no_ujian': '123', 'no_ujian': '123', 'no_skhus': '123'})
            done();
        })
    })

    it('POST Data Siswa Masuk but User Not Login', (done) => {
        chai.request(app).post(`/siswamasuk/add`)
            .send({
                'id_siswamasuk': 'SWM050221010',
                'id_siswa': 'SSW050221002',
                'jenis_daftar': '1',
                'tgl_masuk': '2021-02-11',
                'nis': '122',
                'no_ujian': '123',
                'no_ujian': '123',
                'no_skhus': '123'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Siswa Masuk', (done) => {
        chai.request(app).post(`/siswamasuk/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_siswamasuk': 'SWM050221011',
                'id_siswa': 'SSW050221099',
                'jenis_daftar': '1',
                'tgl_masuk': '2021-02-11',
                'nis': '122',
                'no_ijasah': '123',
                'no_ujian': '123',
                'no_skhus': '123'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Siswa Masuk but User Not Login', (done) => {
        chai.request(app).put(`/siswamasuk/update`)
            .send({
                'id_siswamasuk': 'SWM050221002',
                'id_siswa': 'SSW050221001',
                'jenis_daftar': '1',
                'tgl_masuk': '2021-02-11',
                'nis': '122',
                'no_ujian': '123',
                'no_ujian': '123',
                'no_skhus': '123'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Siswa Masuk', (done) => {
        chai.request(app).put(`/siswamasuk/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_siswamasuk': 'SWM050221002',
                'id_siswa': 'SSW050221001',
                'jenis_daftar': '1',
                'tgl_masuk': '2021-02-11',
                'nis': '122',
                'no_ujian': '123',
                'no_ujian': '123',
                'no_skhus': '123'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Siswa Masuk but User Not Login', (done) => {
        let id_siswamasuk = 'SWM050221001';
        chai.request(app).delete(`/siswamasuk/delete/${id_siswamasuk}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Siswa Masuk', (done) => {
        let id_siswa = 'SSW050221099';
        chai.request(app).delete(`/siswamasuk/delete/${id_siswa}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})