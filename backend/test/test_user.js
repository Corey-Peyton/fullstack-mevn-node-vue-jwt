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