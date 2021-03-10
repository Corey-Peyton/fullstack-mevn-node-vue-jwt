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

describe('Test API GET Data Detail Prestasi', () => {

    it('GET All Data Detail Prestasi but User Not Login', (done) => {
        chai.request(app).get('/detailprestasi/view').end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Detail Prestasi', (done) => {
        chai.request(app).get('/detailprestasi/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Detail Prestasi by ID but User Not Login', (done) => {   
        let id_detailprestasi = 1;        
        chai.request(app).get(`/detailprestasi/view/${id_detailprestasi}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Detail Prestasi by ID', (done) => {   
        let id_detailprestasi = 2;        
        chai.request(app).get(`/detailprestasi/view/${id_detailprestasi}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('POST Data Detail Prestasi but User Not Login', (done) => {
        chai.request(app).post(`/detailprestasi/add`)
            .send({
                'id_siswa': 'SSW050221001', 
                'jenis_prestasi': '3', 
                'tingkat_prestasi': '2', 
                'nama_prestasi': 'Juara 1 menikung gebetan teman', 
                'tahun': '2021',
                'penyelenggara': 'Kantor Cabang Semesta'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Detail Prestasi', (done) => {
        chai.request(app).post(`/detailprestasi/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_siswa': 'SSW050221001', 
                'jenis_prestasi': '3', 
                'tingkat_prestasi': '2', 
                'nama_prestasi': 'Juara 1 menikung gebetan teman', 
                'tahun': '2021',
                'penyelenggara': 'Kantor Cabang Semesta'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Detail Prestasi but User Not Login', (done) => {
        chai.request(app).put(`/detailprestasi/update`)
            .send({
                'id_siswa': 'SSW050221001', 
                'jenis_prestasi': '3', 
                'tingkat_prestasi': '2', 
                'nama_prestasi': 'Juara 1 menikung gebetan teman', 
                'tahun': '2021',
                'penyelenggara': 'Kantor Cabang Semesta'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Detail Prestasi', (done) => {
        chai.request(app).put(`/detailprestasi/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_detailprestasi': 3,
                'id_siswa': 'SSW050221001', 
                'jenis_prestasi': '3', 
                'tingkat_prestasi': '2', 
                'nama_prestasi': 'Juara 1 menikung gebetan teman baiknya', 
                'tahun': '2021',
                'penyelenggara': 'Kantor Cabang Semesta'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Detail Prestasi but User Not Login', (done) => {
        let id_detailprestasi = 1;
        chai.request(app).delete(`/detailprestasi/delete/${id_detailprestasi}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Detail Prestasi', (done) => {
        let id_detailprestasi = 1;
        chai.request(app).delete(`/detailprestasi/delete/${id_detailprestasi}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})