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

describe('Test API Data Siswa', () => {

    it('GET All Data Siswa but User Not Login', (done) => {           
        chai.request(app).get('/siswa/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Siswa', (done) => {           
        chai.request(app).get('/siswa/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Siswa by ID but User Not Login', (done) => {
        let id_siswa = "SSW050221001";
        chai.request(app).get(`/siswa/view/${id_siswa}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Siswa by ID', (done) => {
        let id_siswa = "SSW050221001";
        chai.request(app).get(`/siswa/view/${id_siswa}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            // expect(res.body.values).to.deep.include({'id_siswa': 'SSW050221001',
            // 'nama_lengkap': 'Muhammad Nur Ilham',
            // 'jenis_kelamin': 'L',
            // 'nisn': '1234567891',
            // 'nik': '1234567891',
            // 'tmp_lahir': 'Serang',                
            // 'tgl_lahir': '2008-04-16',
            // 'id_agama': '1',
            // 'kewarganegaraan': 'WNI',
            // 'id_disabilitas': '1',
            // 'alamat_lengkap': 'Kp. Kadomas',
            // 'id_kelurahan': '1',
            // 'nama_dusun': 'Kadomas',
            // 'no_rt': '001',
            // 'no_rw': '001',
            // 'id_statustinggal': '2',
            // 'id_transportasi': '1',
            // 'no_kps': NULL,
            // 'id_pip': NULL,
            // 'no_kks': NULL,
            // 'no_akta': '1234567891',
            // 'id_bank': NULL,
            // 'id_ayah': 'PRM030221001',
            // 'id_ibu': 'PRF030221001',
            // 'id_wali': NULL,
            // 'no_telp': '1234567891',
            // 'no_hp': '1234567891',
            // 'email': 'siswa1@gmail.com'})
            done();
        })
    })

    it('POST Data Siswa but User Not Login', (done) => {
        chai.request(app).post(`/siswa/add`)
            .send({
                'id_siswa': 'SSW050221017',
                'nama_lengkap': 'Akbar',
                'jenis_kelamin': 'L',
                'nisn': '1234567891',
                'nik': '2',
                'tmp_lahir': 'Bandung',                
                'tgl_lahir': '2021-03-01',
                'id_agama': '1',
                'kewarganegaraan': 'WNI',
                'id_disabilitas': '1',
                'alamat_lengkap': 'Bandung',
                'id_kelurahan': '1',
                'nama_dusun': 'Bandung Barat',
                'no_rt': '001',
                'no_rw': '001',
                'id_statustinggal': '1',
                'id_transportasi': '1',
                'no_kps': '111',
                'id_pip': '1',
                'no_kks': '111',
                'no_akta': '111',
                'id_bank': '1',
                'id_ayah': 'PRM030221001',
                'id_ibu': 'PRF030221001',
                'id_wali': 'PRW030221001',
                'no_telp': '08888888',
                'no_hp': '08888888',
                'email': 'k@gmail.com'
            })
            .end((err, res) => {
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Siswa', (done) => {
        chai.request(app).post(`/siswa/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_siswa': 'SSW050221017',
                'nama_lengkap': 'Akbar',
                'jenis_kelamin': 'L',
                'nisn': '1234567891',
                'nik': '2',
                'tmp_lahir': 'Bandung',                
                'tgl_lahir': '2021-03-01',
                'id_agama': '1',
                'kewarganegaraan': 'WNI',
                'id_disabilitas': '1',
                'alamat_lengkap': 'Bandung',
                'id_kelurahan': '1',
                'nama_dusun': 'Bandung Barat',
                'no_rt': '001',
                'no_rw': '001',
                'id_statustinggal': '1',
                'id_transportasi': '1',
                'no_kps': '111',
                'id_pip': '1',
                'no_kks': '111',
                'no_akta': '111',
                'id_bank': '1',
                'id_ayah': 'PRM030221001',
                'id_ibu': 'PRF030221001',
                'id_wali': 'PRW030221001',
                'no_telp': '08888888',
                'no_hp': '08888888',
                'email': 'k@gmail.com'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Siswa but User Not Login', (done) => {
        chai.request(app).put(`/siswa/update`)
            .send({
                'id_siswa': 'SSW050221017',
                'nama_lengkap': 'Akbar Maulana',
                'jenis_kelamin': 'L',
                'nisn': '1234567891',
                'nik': '2',
                'tmp_lahir': 'Bandung',                
                'tgl_lahir': '2021-03-01',
                'id_agama': '1',
                'kewarganegaraan': 'WNI',
                'id_disabilitas': '1',
                'alamat_lengkap': 'Bandung',
                'id_kelurahan': '1',
                'nama_dusun': 'Bandung Barat',
                'no_rt': '001',
                'no_rw': '001',
                'id_statustinggal': '1',
                'id_transportasi': '1',
                'no_kps': '111',
                'id_pip': '1',
                'no_kks': '111',
                'no_akta': '111',
                'id_bank': '1',
                'id_ayah': 'PRM030221001',
                'id_ibu': 'PRF030221001',
                'id_wali': 'PRW030221001',
                'no_telp': '08888888',
                'no_hp': '08888888',
                'email': 'k@gmail.com'
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
                'id_siswa': 'SSW050221002',
                'nama_lengkap': 'Akbar Maulana',
                'jenis_kelamin': 'L',
                'nisn': '1234567891',
                'nik': '2',
                'tmp_lahir': 'Bandung',                
                'tgl_lahir': '2021-03-01',
                'id_agama': '1',
                'kewarganegaraan': 'WNI',
                'id_disabilitas': '1',
                'alamat_lengkap': 'Bandung',
                'id_kelurahan': '1',
                'nama_dusun': 'Bandung Barat',
                'no_rt': '001',
                'no_rw': '001',
                'id_statustinggal': '1',
                'id_transportasi': '1',
                'no_kps': '111',
                'id_pip': '1',
                'no_kks': '111',
                'no_akta': '111',
                'id_bank': '1',
                'id_ayah': 'PRM030221001',
                'id_ibu': 'PRF030221001',
                'id_wali': 'PRW030221001',
                'no_telp': '08888888',
                'no_hp': '08888888',
                'email': 'k@gmail.com'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Siswa but User Not Login', (done) => {
        let id_siswa = 'SSW050221017';
        chai.request(app).delete(`/siswa/delete/${id_siswa}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Siswa', (done) => {
        let id_siswa = 'SSW050221017';
        chai.request(app).delete(`/siswa/delete/${id_siswa}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

});