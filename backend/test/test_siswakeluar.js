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

describe('Test API Data Siswa Keluar', () => {

    it('GET All Data Siswa Keluar but User Not Login', (done) => {           
        chai.request(app).get('/siswakeluar/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Siswa Keluar params Not Null', (done) => {           
        chai.request(app).get('/siswakeluar/view?nama_lengkap=a&jenis_kelamin=a&jenis_alasan=a').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET All Data Siswa Keluar params  Null', (done) => {           
        chai.request(app).get('/siswakeluar/view?nama_lengkap=&jenis_kelamin=&jenis_alasan=').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Siswa Keluar by ID but User Not Login', (done) => {
        let id_siswakeluar = "SWK050221001";
        chai.request(app).get(`/siswakeluar/view/${id_siswakeluar}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Siswa Keluar by ID', (done) => {
        let id_siswa = "SSW050221001";
        chai.request(app).get(`/siswakeluar/view/${id_siswa}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            // expect(res.body.values).to.deep.include({'id_siswakeluar': 'SWK050221001', 'id_siswa': 'SSW050221001', 'id_jenisalasan': 1, 'tgl_keluar': '2021-02-21', 'keterangan': ''})
            done();
        })
    })

    it('GET Data Siswa Keluar by Last ID', (done) => {
        chai.request(app).get(`/siswakeluar/viewlast`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            // expect(res.body.values).to.deep.include({'id_siswakeluar': 'SWK050221001', 'id_siswa': 'SSW050221001', 'id_jenisalasan': 1, 'tgl_keluar': '2021-02-21', 'keterangan': ''})
            done();
        })
    })

    it('POST Data Siswa Keluar but User Not Login', (done) => {
        chai.request(app).post('/siswakeluar/add')
            .send({
                'id_siswakeluar': 'SWK050221005',
                'id_siswa': 'SSW050221001',
                'id_jenisalasan': '1',
                'tgl_keluar': '2021-02-11',
                'keterangan': ''
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Siswa Keluar', (done) => {
        chai.request(app).post(`/siswakeluar/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_siswakeluar': 'SWK050221005',
                'id_siswa': 'SSW050221099',
                'id_jenisalasan': '1',
                'tgl_keluar': '2021-02-11',
                'keterangan': ''
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Siswa Keluar but User Not Login', (done) => {
        chai.request(app).put(`/siswakeluar/update`)
            .send({
                'id_siswakeluar': 'SWK050221002',
                'id_siswa': 'SSW050221001',
                'id_jenisalasan': '2',
                'tgl_keluar': '2021-02-11',
                'keterangan': ''
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Siswa', (done) => {
        chai.request(app).put(`/siswa/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_siswakeluar': 'SWK050221005',
                'id_siswa': 'SSW050221001',
                'id_jenisalasan': '2',
                'tgl_keluar': '2021-02-11',
                'keterangan': ''
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Siswa Keluar but User Not Login', (done) => {
        let id_siswakeluar = 'SWK050221005';
        chai.request(app).delete(`/siswakeluar/delete/${id_siswakeluar}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Siswa Keluar', (done) => {
        let id_siswakeluar = 'SWK050221005';
        chai.request(app).delete(`/siswakeluar/delete/${id_siswakeluar}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

});