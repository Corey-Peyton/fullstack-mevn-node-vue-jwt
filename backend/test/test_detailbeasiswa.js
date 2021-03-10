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

describe('Test API GET Data Detail Beaiswa', () => {

    it('GET All Data Detail Beaiswa but User Not Login', (done) => {
        chai.request(app).get('/detailbeasiswa/view').end((err, res) => {
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Detail Beasiswa', (done) => {
        chai.request(app).get('/detailbeasiswa/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Detail Beasiswa by ID but User Not Login', (done) => {   
        let id_detail_beasiswa = 1;        
        chai.request(app).get(`/detailbeasiswa/view/${id_detail_beasiswa}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Detail Beasiswa by ID', (done) => {   
        let id_detail_beasiswa = 2;        
        chai.request(app).get(`/detailbeasiswa/view/${id_detail_beasiswa}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            // expect(res.body.values).to.deep.include({'id_detail_beasiswa': 2, 'id_siswa': 'SSW050221001', 'jenis': 'Sains', 'keterangan': 'Juara 1 matematika murni', 'tahun_mulai': '2020', 'tahun_selesai': '2021'})
            done();
        })
    })

    it('POST Data Detail Beasiswa but User Not Login', (done) => {
        chai.request(app).post(`/detailbeasiswa/add`)
            .send({
                'id_siswa': 'SSW050221001', 
                'jenis': 'Sains', 
                'keterangan': 'Juara 1 matematika murni', 
                'tahun_mulai': '2020', 
                'tahun_selesai': '2021'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Detail Beasiswa', (done) => {
        chai.request(app).post(`/detailbeasiswa/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_siswa': 'SSW050221001', 
                'jenis': 'Sains', 
                'keterangan': 'Juara 1 matematika murni', 
                'tahun_mulai': '2020', 
                'tahun_selesai': '2021'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Detail Beasiswa but User Not Login', (done) => {
        chai.request(app).put(`/detailbeasiswa/update`)
            .send({
                'id_siswa': 'SSW050221003', 
                'jenis': 'Sains', 
                'keterangan': 'Juara 1 matematika tidak murni', 
                'tahun_mulai': '2020', 
                'tahun_selesai': '2021'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Detail Beasiswa', (done) => {
        chai.request(app).put(`/detailbeasiswa/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_siswa': 'SSW050221003', 
                'jenis': 'Sains', 
                'keterangan': 'Juara 1 matematika tidak murni', 
                'tahun_mulai': '2020', 
                'tahun_selesai': '2021'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Detail Beasiswa but User Not Login', (done) => {
        let id_detail_beasiswa = 1;
        chai.request(app).delete(`/detailbeasiswa/delete/${id_detail_beasiswa}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Detail Beasiswa', (done) => {
        let id_detail_beasiswa = 1;
        chai.request(app).delete(`/detailbeasiswa/delete/${id_detail_beasiswa}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})