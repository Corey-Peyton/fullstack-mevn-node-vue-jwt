let chai = require('chai');
let chaiHttp = require('chai-http');
const { response } = require('express');
let expect = chai.expect;
let app = require('./../index');

chai.use(chaiHttp);

let token = '';

describe('Test Register User', () => {

    it('User already in database', (done) => {
        chai.request(app).post('/sign-up')
            .send({
                'username': 'permadi',
                'password': 'permadi',
                'password_repeat': 'permadi'
            })
            .end((err, res) => {
                expect(res).to.have.be.status(409)
                done();
            })
    })

    it('Username less than 3 character', (done) => {
        chai.request(app).post('/sign-up')
            .send({
                'username': 'te',
                'password': 'testtest',
                'password_repeat': 'testtest'
            })
            .end((err, res) => {
                expect(res).to.have.be.status(400)
                done();
            })
    })

    it('Password less than 6 character', (done) => {
        chai.request(app).post('/sign-up')
            .send({
                'username': 'test',
                'password': 'test',
                'password_repeat': 'test'
            })
            .end((err, res) => {
                expect(res).to.have.be.status(400)
                done();
            })
    })

    it('Password and repeat password dont match', (done) => {
        chai.request(app).post('/sign-up')
            .send({
                'username': 'test',
                'password': 'testtest',
                'password_repeat': 'test'
            })
            .end((err, res) => {
                expect(res).to.have.be.status(400)
                done();
            })
    })

    it('User successfully register', (done) => {
        chai.request(app).post('/sign-up')
            .send({
                'username': 'test',
                'password': 'testtest',
                'password_repeat': 'testtest'
            })
            .end((err, res) => {
                expect(res).to.have.be.status(201)
                done();
            })
    })

    it('Delete user by username', (done) => {
        let username = "test";
        chai.request(app).delete(`/users/delete/${username}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})

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

    it('User not in database', (done) => {
        chai.request(app).post('/login')
            .send({
                'username': '.',
                'password': '.'
            })
            .end((err, res) => {
                expect(res).to.have.be.status(401)
                done();
            })
    })

    it('User in database but wrong password', (done) => {
        chai.request(app).post('/login')
            .send({
                'username': 'permadi',
                'password': 'permadi2'
            })
            .end((err, res) => {
                expect(res).to.have.be.status(401)
                done();
            })
    })

})

describe('Test API Data Agama', () => {

    it('GET All Data Agama but User Not Login', (done) => {           
        chai.request(app).get('/agama/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Agama', (done) => {           
        chai.request(app).get('/agama/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Agama by ID but User Not Login', (done) => {
        let id_agama = 1;
        chai.request(app).get(`/agama/view/${id_agama}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Agama by ID', (done) => {
        let id_agama = 3;
        chai.request(app).get(`/agama/view/${id_agama}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body.values); 
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_agama': 3, 'agama': 'Katholik'})
            done();
        })
    })

    it('POST Data Agama but User Not Login', (done) => {
        chai.request(app).post(`/agama/add`)
            .send({
                'agama': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Agama', (done) => {
        chai.request(app).post(`/agama/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'agama': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Agama but User Not Login', (done) => {
        chai.request(app).put(`/agama/update`)
            .send({
                'id_agama': 1,
                'agama': 'Islam 2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Agama', (done) => {
        chai.request(app).put(`/agama/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_agama': 1,
                'agama': 'Islam 2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Agama but User Not Login', (done) => {
        let id_agama = 1;
        chai.request(app).delete(`/agama/delete/${id_agama}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Agama', (done) => {
        let id_agama = 1;
        chai.request(app).delete(`/agama/delete/${id_agama}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
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

    it('GET Data Ayah by ID but User Not Login', (done) => {
        let id_ayah = "PRM030221001";
        chai.request(app).get(`/ayah/view/${id_ayah}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Ayah by ID', (done) => {
        let id_ayah = "PRM030221001";
        chai.request(app).get(`/ayah/view/${id_ayah}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_ayah': 'PRM030221001', 'nama_ayah': 'Suprani', 'nik': '1234567891', 'tgl_lahir': '1980-09-01', 'id_pendidikan': 2, 'id_pekerjaan': 2, 'id_penghasilan': 1, 'id_disabilitas': 1})
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

    it.skip('PUT Data Ayah but User Not Login', (done) => {
        chai.request(app).put(`/ayah/update`)
            .send({
                'id_ayah': 'PRM030221006',
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

    it.skip('PUT Data Ayah', (done) => {
        chai.request(app).put(`/ayah/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_ayah': 'PRM030221006',
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

    it.skip('DELETE Data Ayah but User Not Login', (done) => {
        let id_ayah = 'PRM030221006';
        chai.request(app).delete(`/ayah/delete/${id_ayah}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it.skip('DELETE Data Ayah', (done) => {
        let id_ayah = 'PRM030221006';
        chai.request(app).delete(`/ayah/delete/${id_ayah}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})

describe('Test API Data Ibu', () => {

    it('GET All Data Ibu but User Not Login', (done) => {           
        chai.request(app).get('/ibu/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it.skip('GET All Data Ibu', (done) => {           
        chai.request(app).get('/ibu/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Ibu by ID but User Not Login', (done) => {
        let id_ibu = "PRF030221001";
        chai.request(app).get(`/ibu/view/${id_ibu}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Ibu by ID', (done) => {
        let id_ibu = 'PRF030221001';
        chai.request(app).get(`/ibu/view/${id_ibu}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_ibu': 'PRF030221001', 'nama_ibu': 'Surti', 'nik': '1234567891', 'tgl_lahir': '1998-04-03', 'id_pendidikan': 3, 'id_pekerjaan': 2, 'id_penghasilan': 1, 'id_disabilitas': 1})
            done();
        })
    })

    it('POST Data Ibu but User Not Login', (done) => {
        chai.request(app).post(`/ibu/add`)
            .send({
                'id_ibu': 'PRF030221006',
                'nama_ibu': 'Lastri',
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

    it('POST Data Ibu', (done) => {
        chai.request(app).post(`/ibu/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_ibu': 'PRF030221006',
                'nama_ibu': 'Lastri',
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

    it('PUT Data Ibu but User Not Login', (done) => {
        chai.request(app).put(`/ibu/update`)
            .send({
                'id_ibu': 'PRF030221006',
                'nama_ibu': 'Lastri Sulastri',
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

    it('PUT Data Ibu', (done) => {
        chai.request(app).put(`/ibu/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_ibu': 'PRF030221006',
                'nama_ibu': 'Lastri Sulastri',
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

    it('DELETE Data Ibu but User Not Login', (done) => {
        let id_ibu = 'PRF030221006';
        chai.request(app).delete(`/ibu/delete/${id_ibu}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Ibu', (done) => {
        let id_ibu = 'PRF030221006';
        chai.request(app).delete(`/ibu/delete/${id_ibu}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

});

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

    it('PUT Data Wali', (done) => {
        chai.request(app).put(`/wali/update`).set('Authorization', `Bearer ${token}`)
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

    it.skip('GET Data Siswa by ID', (done) => {
        let id_siswa = "SSW050221001";
        chai.request(app).get(`/siswa/view/${id_siswa}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_siswa': 'SSW050221001',
            'nama_lengkap': 'Muhammad Nur Ilham',
            'jenis_kelamin': 'L',
            'nisn': '1234567891',
            'nik': '1234567891',
            'tmp_lahir': 'Serang',                
            'tgl_lahir': '2008-04-16',
            'id_agama': '1',
            'kewarganegaraan': 'WNI',
            'id_disabilitas': '1',
            'alamat_lengkap': 'Kp. Kadomas',
            'id_kelurahan': '1',
            'nama_dusun': 'Kadomas',
            'no_rt': '001',
            'no_rw': '001',
            'id_statustinggal': '2',
            'id_transportasi': '1',
            'no_kps': NULL,
            'id_pip': NULL,
            'no_kks': NULL,
            'no_akta': '1234567891',
            'id_bank': NULL,
            'id_ayah': 'PRM030221001',
            'id_ibu': 'PRF030221001',
            'id_wali': NULL,
            'no_telp': '1234567891',
            'no_hp': '1234567891',
            'email': 'siswa1@gmail.com'})
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

describe('Test API Data Siswa Keluar', () => {

    it('GET All Data Siswa Keluar but User Not Login', (done) => {           
        chai.request(app).get('/siswakeluar/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Siswa Keluar', (done) => {           
        chai.request(app).get('/siswakeluar/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Siswa Keluar by ID but User Not Login', (done) => {
        let id_siswakeluar = "SWK050221001";
        chai.request(app).get(`/siswa/view/${id_siswakeluar}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it.skip('GET Data Siswa Keluar by ID', (done) => {
        let id_siswakeluar = "SWK050221001";
        chai.request(app).get(`/siswa/view/${id_siswakeluar}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_siswakeluar': 'SWK050221001', 'id_siswa': 'SSW050221001', 'id_jenisalasan': 1, 'tgl_keluar': '2021-02-21', 'keterangan': ''})
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
                'id_siswa': 'SSW050221001',
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
                'id_siswakeluar': 'SWK050221005',
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

describe('Test API GET Data Bank', () => {

    it('GET All Data Bank but User Not Login', (done) => {           
        chai.request(app).get('/bank/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Bank', (done) => {           
        chai.request(app).get('/bank/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Bank by ID but User Not Login', (done) => {   
        let id_bank = 1;        
        chai.request(app).get(`/bank/view/${id_bank}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Bank by ID', (done) => {   
        let id_bank = 1;        
        chai.request(app).get(`/bank/view/${id_bank}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_bank': 1, 'nama_bank': 'BCA', 'norek': '123456789', 'atas_nama': 'Maria Ismi'})
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
        let id_disabilitas = 1;        
        chai.request(app).get(`/disabilitas/view/${id_disabilitas}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_disabilitas': 1, 'status_disabilitas': 'Tidak'})
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
        let id_jenisalasan = 1;        
        chai.request(app).get(`/jenisalasan/view/${id_jenisalasan}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_jenisalasan': 1, 'alasan': 'Lulus'})
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

    it.skip('GET Data Kelurahan by ID', (done) => {   
        let id_kelurahan = 1;        
        chai.request(app).get(`/kelurahan/view/${id_kelurahan}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_kelurahan': 1, 'id_kecamatan': 1, 'kelurahan': 'Antapani Kidul', 'kode_pos': '39152'})
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

})

describe('Test API GET Data Pendidikan', () => {

    it('GET All Data Pendidikan but User Not Login', (done) => {           
        chai.request(app).get('/pendidikan/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Pendidikan', (done) => {           
        chai.request(app).get('/pendidikan/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
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

})

describe('Test API GET Data PIP', () => {

    it('GET All Data PIP but User Not Login', (done) => {
        chai.request(app).get('/pip/view').end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data PIP', (done) => {           
        chai.request(app).get('/pip/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

})

describe('Test API GET Data Priodik Siswa', () => {

    it('GET All Data Priodik Siswa but User Not Login', (done) => {
        chai.request(app).get('/priodiksiswa/view').end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Priodik Siswa', (done) => {           
        chai.request(app).get('/priodiksiswa/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
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

})

describe('Test API GET Data Status Tinggal', () => {

    it('GET All Data Status Tinggal but User Not Login', (done) => {
        chai.request(app).get('/statustinggal/view').end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Status Tinggal', (done) => {           
        chai.request(app).get('/statustinggal/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

})

describe('Test API GET Data Transportasi', () => {

    it('GET All Data Transportasi but User Not Login', (done) => {
        chai.request(app).get('/transportasi/view').end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Transportasi', (done) => {
        chai.request(app).get('/transportasi/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

})