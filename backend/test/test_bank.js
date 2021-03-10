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
        let id_bank = 2;        
        chai.request(app).get(`/bank/view/${id_bank}`).set('Authorization', `Bearer ${token}`).end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            expect(res.body.values).to.deep.include({'id_bank': 2, 'nama_bank': 'Mandiri', 'norek': '123456789', 'atas_nama': 'Maria'})
            done();
        })
    })

    it('POST Data Bank but User Not Login', (done) => {
        chai.request(app).post(`/bank/add`)
            .send({
                'bank': 'test'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('POST Data Bank', (done) => {
        chai.request(app).post(`/bank/add`).set('Authorization', `Bearer ${token}`)
            .send({
                'nama_bank': 'test',
                'norek': '123456789',
                'atas_nama': 'Maria'
            })
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('PUT Data Bank but User Not Login', (done) => {
        chai.request(app).put(`/bank/update`)
            .send({
                'id_bank': 2,
                'nama_bank': 'Bank 2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('PUT Data Bank', (done) => {
        chai.request(app).put(`/bank/update`).set('Authorization', `Bearer ${token}`)
            .send({
                'id_bank': 3,
                'nama_bank': 'Bank 2'
            })
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('DELETE Data Bank but User Not Login', (done) => {
        let id_bank = 1;
        chai.request(app).delete(`/bank/delete/${id_bank}`)
            .end((err, res) => { 
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('DELETE Data Bank', (done) => {
        let id_bank = 1;
        chai.request(app).delete(`/bank/delete/${id_bank}`).set('Authorization', `Bearer ${token}`)
            .end((err, res) => { 
            // console.log(res.body); 
            expect(res).to.have.be.status(200)
            done();
        })
    })

})