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

describe('Test API Data Agama', () => {

    it('GET All Data Agama but User Not Login', (done) => {  
        chai.request(app).get('/agama/view').end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(401)
            done();
        })
    })

    it('GET All Data Agama params Not Null', (done) => {           
        chai.request(app).get('/agama/view?agama=Islam').set('Authorization', `Bearer ${token}`)
            // .send({
            //     'agama': 'test'
            // })
            .end((err, res) => {  
            // console.log(res.body);
            expect(res).to.have.be.status(200)
            done();
        })
    })

    it('GET All Data Agama params Null', (done) => {           
        chai.request(app).get('/agama/view?agama=').set('Authorization', `Bearer ${token}`)
            // .send({
            //     'agama': 'test'
            // })
            .end((err, res) => {  
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