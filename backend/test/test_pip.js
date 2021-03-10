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

    it('GET Data PIP by ID but User Not Login', (done) => {   
        let id_pip = 1;        
        chai.request(app).get(`/pip/view/${id_pip}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET Data PIP by ID', (done) => {   
        let id_pip = 2;        
        chai.request(app).get(`/pip/view/${id_pip}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_pip': 2, 'id_siswa': 'SSW050221001', 'alasan_layakpip': 'Keluarga Kurang Mampu', 'no_kip': '123456', 'nama_kip': 'Udin'})
            done();
        })
    })

    it('POST Data PIP but User Not Login', (done) => {
        chai.request(app).post(`/pip/add`)
            .send({
                'id_siswa': 'SSW050221001',
                'alasan_layakpip': 'Keluarga Kurang Mampu',
                'no_kip': '123456',
                'nama_kip': 'Udin'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data PIP', (done) => {
        chai.request(app).post(`/pip/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_siswa': 'SSW050221001',
                'alasan_layakpip': 'Keluarga Kurang Mampu',
                'no_kip': '123456',
                'nama_kip': 'Udin'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data PIP but User Not Login', (done) => {
        chai.request(app).put(`/pip/update`)
            .send({
                'id_siswa': 'SSW050221001',
                'alasan_layakpip': 'Keluarga Kurang Mampu',
                'no_kip': '123456',
                'nama_kip': 'Udin'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data PIP', (done) => {
        chai.request(app).put(`/pip/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_pip': 3,
                'id_siswa': 'SSW050221001',
                'alasan_layakpip': 'Keluarga Kurang Mampu',
                'no_kip': '123456',
                'nama_kip': 'Udin'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data PIP but User Not Login', (done) => {
        let id_pip = 1;
        chai.request(app).delete(`/pip/delete/${id_pip}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data PIP', (done) => {
        let id_pip = 1;
        chai.request(app).delete(`/pip/delete/${id_pip}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})