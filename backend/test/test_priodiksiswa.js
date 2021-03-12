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

    it('GET Data Priodik Siswa by ID but User Not Login', (done) => {   
        let id_priodik_siswa = 'PSW050221001';        
        chai.request(app).get(`/priodiksiswa/view/${id_priodik_siswa}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Priodik Siswa by ID', (done) => {   
        let id_priodik_siswa = 'PSW050221001';        
        chai.request(app).get(`/priodiksiswa/view/${id_priodik_siswa}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            // expect(res.body.values).to.deep.include({'id_priodik_siswa': 'PSW050221001', 'id_siswa': 'SSW050221001', 'tinggi_badan': '165', 'berat_badan': '72', 'jarak_kesekolah': '2', 'detail_jarak': '100', 'jml_saudarakandung': '1'})
            done();
        })
    })

    it('GET Data Priodik Siswa by Last ID', (done) => {          
        chai.request(app).get(`/priodiksiswa/viewlast`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('POST Data Priodik Siswa but User Not Login', (done) => {
        chai.request(app).post(`/priodiksiswa/add`)
            .send({
                'id_priodik_siswa': 'PSW050221011',
                'id_siswa': 'SSW050221016',
                'tinggi_badan': '1',
                'berat_badan': '1',
                'jarak_kesekolah': '1',
                'detail_jarak': '1',
                'jml_saudarakandung': '1'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Priodik Siswa', (done) => {
        chai.request(app).post(`/priodiksiswa/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_priodik_siswa': 'PSW050221012',
                'id_siswa': 'SSW050221099',
                'tinggi_badan': '1',
                'berat_badan': '1',
                'jarak_kesekolah': '1',
                'detail_jarak': '1',
                'jml_saudarakandung': '1'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Priodik Siswa but User Not Login', (done) => {
        chai.request(app).put(`/priodiksiswa/update`)
            .send({
                'id_priodik_siswa': 'PSW050221002',
                'id_siswa': 'SSW050221016',
                'tinggi_badan': '1',
                'berat_badan': '1',
                'jarak_kesekolah': '1',
                'detail_jarak': '1',
                'jml_saudarakandung': '1'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Priodik Siswa', (done) => {
        chai.request(app).put(`/priodiksiswa/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_priodik_siswa': 'PSW050221002',
                'id_siswa': 'SSW050221016',
                'tinggi_badan': '1',
                'berat_badan': '1',
                'jarak_kesekolah': '1',
                'detail_jarak': '1',
                'jml_saudarakandung': '1'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Priodik Siswa but User Not Login', (done) => {
        let id_priodik_siswa = 'PSW050221001';
        chai.request(app).delete(`/priodiksiswa/delete/${id_priodik_siswa}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Priodik Siswa', (done) => {
        let id_siswa = 'SSW050221099';
        chai.request(app).delete(`/priodiksiswa/delete/${id_siswa}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})