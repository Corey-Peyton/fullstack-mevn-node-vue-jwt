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

describe('Test API Data Ibu', () => {

    it('GET All Data Ibu but User Not Login', (done) => {           
        chai.request(app).get('/ibu/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Ibu params Not Null', (done) => {
        chai.request(app).get('/ibu/view?nama_ibu=a&id_pendidikan=a&id_pekerjaan=a').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })
    it('GET All Data Ibu params Null', (done) => {
        chai.request(app).get('/ibu/view?nama_ibu=&id_pendidikan=&id_pekerjaan=').set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET Data Ibu by ID but User Not Login', (done) => {
        let id_ibu = "PRF030221002";
        chai.request(app).get(`/ibu/view/${id_ibu}`).end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data Ibu by ID', (done) => {
        let id_ibu = 'PRF030221002';
        chai.request(app).get(`/ibu/view/${id_ibu}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_ibu': 'PRF030221002', 'nama_ibu': 'Sari', 'nik': '123456789', 'tgl_lahir': '1998-04-03', 'id_pendidikan': 1, 'id_pekerjaan': 1, 'id_penghasilan': 1, 'id_disabilitas': 1})
            done();
        })
    })

    it('GET Data Ibu by Last ID', (done) => {
        chai.request(app).get(`/ibu/viewlast`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
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
                'id_ibu': 'PRF030221003',
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
                'id_ibu': 'PRF030221003',
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
        let id_ibu = 'PRF030221001';
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