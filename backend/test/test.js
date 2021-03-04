let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
let app = require('./../index');

chai.use(chaiHttp);

let token = '';

describe('Test Endpoint API Backend', () => {

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
    
    });

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
    
    });

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
            let id_agama = 1;
            chai.request(app).get(`/agama/view/${id_agama}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
                // console.log(res.body); 
                expect(res).to.have.be.status(200)
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
    
    });

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
                done();
            })
        })
    
        it('POST Data Ayah', (done) => {
            chai.request(app).post(`/ayah/add`).set('Authorization', `Bearer ${token}`)
                .send({
                    'id_ayah': "PRM030221006",
                    'nama_ayah': 'Fadly',
                    'nik': '1234567891',
                    'tgl_lahir': '1980-09-01',
                    'id_pendidikan': 2,
                    'id_pekerjaan': 2,
                    'id_penghasilan': 1,
                    'id_disabilitas': 1
                })
                .end((err, res) => { 
                // console.log(res.body); 
                expect(res).to.have.be.status(200)
                done();
            })
        })
    
        it('PUT Data Ayah but User Not Login', (done) => {
            chai.request(app).put(`/ayah/update`)
                .send({
                    'id_ayah': "PRM030221004",
                    'nama_ayah': 'Piyu',
                    'nik': '1234567891',
                    'tgl_lahir': '1980-09-01',
                    'id_pendidikan': 2,
                    'id_pekerjaan': 2,
                    'id_penghasilan': 1,
                    'id_disabilitas': 1
                })
                .end((err, res) => { 
                // console.log(res.body); 
                expect(res).to.have.be.status(401)
                done();
            })
        })
    
        // it('PUT Data Ayah', (done) => {
        //     chai.request(app).put(`/ayah/update`).set('Authorization', `Bearer ${token}`)
        //         .send({
        //             'id_ayah': "PRM030221004",
        //             'nama_ayah': 'Piyu',
        //             'nik': '1234567891',
        //             'tgl_lahir': '1980-09-01',
        //             'id_pendidikan': 2,
        //             'id_pekerjaan': 2,
        //             'id_penghasilan': 1,
        //             'id_disabilitas': 1
        //         })
        //         .end((err, res) => { 
        //         // console.log(res.body); 
        //         expect(res).to.have.be.status(200)
        //         done();
        //     })
        // })

        it('DELETE Data Ayah but User Not Login', (done) => {
            let id_ayah = "PRM030221001";
            chai.request(app).delete(`/ayah/delete/${id_ayah}`)
                .end((err, res) => { 
                // console.log(res.body); 
                expect(res).to.have.be.status(401)
                done();
            })
        })
    
        it('DELETE Data Ayah', (done) => {
            let id_ayah = "PRM030221001";
            chai.request(app).delete(`/ayah/delete/${id_ayah}`).set('Authorization', `Bearer ${token}`)
                .end((err, res) => { 
                // console.log(res.body); 
                expect(res).to.have.be.status(200)
                done();
            })
        })
    
    });

})

// describe('Test API Data Ibu', () => {

//     it('GET All Data Ibu but User Not Login', (done) => {           
//         chai.request(app).get('/ibu/view').end((err, res) => {  
//             // console.log(res.body);
//             expect(res).to.have.be.status(401)
//             done();
//         })
//     })

//     it('GET All Data Ibu', (done) => {           
//         chai.request(app).get('/ibu/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
//             // console.log(res.body);
//             expect(res).to.have.be.status(200)
//             done();
//         })
//     })

//     it('GET Data Ibu by ID but User Not Login', (done) => {
//         let id_ibu = "PRF030221001";
//         chai.request(app).get(`/ibu/view/${id_ibu}`).end((err, res) => { 
//             // console.log(res.body); 
//             expect(res).to.have.be.status(401)
//             done();
//         })
//     })

//     it('GET Data Ibu by ID', (done) => {
//         let id_ibu = "PRF030221001";
//         chai.request(app).get(`/ibu/view/${id_ibu}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
//             // console.log(res.body); 
//             expect(res).to.have.be.status(200)
//             done();
//         })
//     })

// });

// describe('Test API Data Wali', () => {

//     it('GET All Data Wali but User Not Login', (done) => {           
//         chai.request(app).get('/wali/view').end((err, res) => {  
//             // console.log(res.body);
//             expect(res).to.have.be.status(401)
//             done();
//         })
//     })

//     it('GET All Data Wali', (done) => {           
//         chai.request(app).get('/wali/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
//             // console.log(res.body);
//             expect(res).to.have.be.status(200)
//             done();
//         })
//     })

//     it('GET Data Wali by ID but User Not Login', (done) => {
//         let id_wali = "PRW030221001";
//         chai.request(app).get(`/wali/view/${id_wali}`).end((err, res) => { 
//             // console.log(res.body); 
//             expect(res).to.have.be.status(401)
//             done();
//         })
//     })

//     it('GET Data Wali by ID', (done) => {
//         let id_wali = "PRW030221001";
//         chai.request(app).get(`/wali/view/${id_wali}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
//             // console.log(res.body); 
//             expect(res).to.have.be.status(200)
//             done();
//         })
//     })

// });

// describe('Test API Data Siswa', () => {

//     it('GET All Data Siswa but User Not Login', (done) => {           
//         chai.request(app).get('/siswa/view').end((err, res) => {  
//             // console.log(res.body);
//             expect(res).to.have.be.status(401)
//             done();
//         })
//     })

//     it('GET All Data Siswa', (done) => {           
//         chai.request(app).get('/siswa/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
//             // console.log(res.body);
//             expect(res).to.have.be.status(200)
//             done();
//         })
//     })

//     it('GET Data Siswa by ID but User Not Login', (done) => {
//         let id_siswa = "SSW050221001";
//         chai.request(app).get(`/siswa/view/${id_siswa}`).end((err, res) => { 
//             // console.log(res.body); 
//             expect(res).to.have.be.status(401)
//             done();
//         })
//     })

//     it('GET Data Siswa by ID', (done) => {
//         let id_siswa = "SSW050221001";
//         chai.request(app).get(`/siswa/view/${id_siswa}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
//             // console.log(res.body); 
//             expect(res).to.have.be.status(200)
//             done();
//         })
//     })

// });

// describe('Test API Data Siswa Keluar', () => {

//     it('GET All Data Siswa Keluar but User Not Login', (done) => {           
//         chai.request(app).get('/siswakeluar/view').end((err, res) => {  
//             // console.log(res.body);
//             expect(res).to.have.be.status(401)
//             done();
//         })
//     })

//     it('GET All Data Siswa Keluar', (done) => {           
//         chai.request(app).get('/siswakeluar/view').set('Authorization', `Bearer ${token}`).end((err, res) => {  
//             // console.log(res.body);
//             expect(res).to.have.be.status(200)
//             done();
//         })
//     })

//     it('GET Data Siswa Keluar by ID but User Not Login', (done) => {
//         let id_siswakeluar = "SWK050221001";
//         chai.request(app).get(`/siswa/view/${id_siswakeluar}`).end((err, res) => { 
//             // console.log(res.body); 
//             expect(res).to.have.be.status(401)
//             done();
//         })
//     })

//     it('GET Data Siswa Keluar by ID', (done) => {
//         let id_siswakeluar = "SWK050221001";
//         chai.request(app).get(`/siswa/view/${id_siswakeluar}`).set('Authorization', `Bearer ${token}`).end((err, res) => { 
//             // console.log(res.body); 
//             expect(res).to.have.be.status(200)
//             done();
//         })
//     })

// });