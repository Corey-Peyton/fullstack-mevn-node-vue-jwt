'use strict';

const { json } = require('body-parser');

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const userMiddleware = require('./middleware/users.js');
const loginMiddleware = require('./middleware/login.js');
// import function file response
var response = require('./response');
const db = require('./connection.js');

// module controller exports
module.exports = function(app) {

    var controllerDefault = require('./controller/controller_default');
    var controllerAgama = require('./controller/controller_agama');
    var controllerAyah = require('./controller/controller_ayah');
    var controllerBank = require('./controller/controller_bank');
    var controllerDetailBeasiswa = require('./controller/controller_detailbeasiswa.js');
    var controllerDetailPrestasi = require('./controller/controller_detailprestasi');
    var controllerDisabilitas = require('./controller/controller_disabilitas');
    var controllerIbu = require('./controller/controller_ibu');
    var controllerJenisAlasan = require('./controller/controller_jenisalasan');
    var controllerKecamatan = require('./controller/controller_kecamatan');
    var controllerKelurahan = require('./controller/controller_kelurahan');
    var controllerPekerjaan = require('./controller/controller_pekerjaan');
    var controllerPendidikan = require('./controller/controller_pendidikan');
    var controllerPenghasilan = require('./controller/controller_penghasilan');
    var controllerPIP = require('./controller/controller_pip');
    var controllerPriodikSiswa = require('./controller/controller_priodiksiswa');
    var controllerSiswa = require('./controller/controller_siswa');
    var controllerSiswaKeluar = require('./controller/controller_siswakeluar');
    var controllerSiswaMasuk = require('./controller/controller_siswamasuk');
    var controllerStatusTinggal = require('./controller/controller_statustinggal');
    var controllerTransportasi = require('./controller/controller_transportasi');
    var controllerWali = require('./controller/controller_wali');

    app.route('/secret-route').get(loginMiddleware.isLoggedIn, loginMiddleware.isLoggedIn, (req, res, next) => {
        res.send('This is the secret content. Only logged in users can see that!');
    });

    app.route('/sign-up').post(userMiddleware.validateRegister, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
        )});`,
        (err, result) => {
        if (result.length) {
            return res.status(409).send({
            msg: 'This username is already in use!'
            });
        } else {
            // username is available
            bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send({
                msg: err
                });
            } else {
                // has hashed pw => add to database
                db.query(
                `INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                    req.body.username
                )}, ${db.escape(hash)}, now())`,
                (err, result) => {
                    if (err) {
                    throw err;
                    return res.status(400).send({
                        msg: err
                    });
                    }
                    return res.status(201).send({
                    msg: 'Registered!'
                    });
                }
                );
            }
            });
        }
        }
    );
    });

    // router.post(loginMiddleware.isLoggedIn, '/login', (req, res, next) => {});
    // routes/router.js

    app.route('/login').post((req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
        // user does not exists
        if (err) {
            throw err;
            return res.status(400).send({
            msg: err
            });
        }
    
        if (!result.length) {
            return res.status(401).send({
            msg: 'Username or password is incorrect!'
            });
        }
    
        // check password
        bcrypt.compare(
            req.body.password,
            result[0]['password'],
            (bErr, bResult) => {
            // wrong password
            if (bErr) {
                throw bErr;
                return res.status(401).send({
                msg: 'Username or password is incorrect!'
                });
            }
    
            if (bResult) {
                const token = jwt.sign({
                    username: result[0].username,
                    userId: result[0].id
                },
                'SECRETKEY', {
                    expiresIn: '1d'
                }
                );
    
                db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                );
                return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
                });
            }
            return res.status(401).send({
                msg: 'Username or password is incorrect!'
            });
            }
        );
        }
    );
    });

    // default route
    app.route('/').get(loginMiddleware.isLoggedIn, controllerDefault.index);

    // route view
    // app.route('/agama/view').get(loginMiddleware.isLoggedIn, controllerAgama.viewAgama);
    app.route('/agama/view').get(loginMiddleware.isLoggedIn, controllerAgama.viewAgama);

    app.route('/ayah/view').get(loginMiddleware.isLoggedIn, controllerAyah.viewAyah);

    app.route('/bank/view').get(loginMiddleware.isLoggedIn, controllerBank.viewBank);

    app.route('/detailprestasi/view').get(loginMiddleware.isLoggedIn, controllerDetailPrestasi.viewDetailPrestasi);
    
    app.route('/detailbeasiswa/view').get(loginMiddleware.isLoggedIn, controllerDetailBeasiswa.viewDetailBeasiswa);

    app.route('/disabilitas/view').get(loginMiddleware.isLoggedIn, controllerDisabilitas.viewDisabilitas);

    app.route('/ibu/view').get(loginMiddleware.isLoggedIn, controllerIbu.viewIbu);

    app.route('/jenisalasan/view').get(loginMiddleware.isLoggedIn, controllerJenisAlasan.viewJenisAlasan);

    app.route('/kecamatan/view').get(loginMiddleware.isLoggedIn, controllerKecamatan.viewKecamatan);

    app.route('/kelurahan/view').get(loginMiddleware.isLoggedIn, controllerKelurahan.viewKelurahan);

    app.route('/pekerjaan/view').get(loginMiddleware.isLoggedIn, controllerPekerjaan.viewPekerjaan);

    app.route('/pendidikan/view').get(loginMiddleware.isLoggedIn, controllerPendidikan.viewPendidikan);

    app.route('/penghasilan/view').get(loginMiddleware.isLoggedIn, controllerPenghasilan.viewPenghasilan);

    app.route('/pip/view').get(loginMiddleware.isLoggedIn, controllerPIP.viewPIP);

    app.route('/priodiksiswa/view').get(loginMiddleware.isLoggedIn, controllerPriodikSiswa.viewPriodikSiswa);

    app.route('/siswa/view').get(loginMiddleware.isLoggedIn, controllerSiswa.viewSiswa);

    app.route('/siswakeluar/view').get(loginMiddleware.isLoggedIn, controllerSiswaKeluar.viewSiswaKeluar);

    app.route('/siswamasuk/view').get(loginMiddleware.isLoggedIn, controllerSiswaMasuk.viewSiswaMasuk);

    app.route('/statustinggal/view').get(loginMiddleware.isLoggedIn, controllerStatusTinggal.viewStatusTinggal);

    app.route('/transportasi/view').get(loginMiddleware.isLoggedIn, controllerTransportasi.viewTransportasi);

    app.route('/wali/view').get(loginMiddleware.isLoggedIn, controllerWali.viewWali);

    app.route('/siswa/viewrekap').get(loginMiddleware.isLoggedIn, controllerSiswa.viewRekapSiswa);

    app.route('/siswa/viewtotall').get(loginMiddleware.isLoggedIn, controllerSiswa.viewTotalSiswaL);

    app.route('/siswa/viewtotalp').get(loginMiddleware.isLoggedIn, controllerSiswa.viewTotalSiswaP);

    app.route('/siswa/viewtotal').get(loginMiddleware.isLoggedIn, controllerSiswa.viewTotalSiswa);

    // route view by ID / Primary Key
    app.route('/agama/view/:id_agama').get(loginMiddleware.isLoggedIn, controllerAgama.viewAgamaById);
    
    app.route('/ayah/view/:id_ayah').get(loginMiddleware.isLoggedIn, controllerAyah.viewAyahById);
    
    app.route('/bank/view/:id_bank').get(loginMiddleware.isLoggedIn, controllerBank.viewBankById);

    app.route('/detailbeasiswa/view/:id_detail_beasiswa').get(loginMiddleware.isLoggedIn, controllerDetailBeasiswa.viewDetailBeasiswaById);
    
    app.route('/detailprestasi/view/:id_detailprestasi').get(loginMiddleware.isLoggedIn, controllerDetailPrestasi.viewDetailPrestasiById);

    app.route('/disabilitas/view/:id_disabilitas').get(loginMiddleware.isLoggedIn, controllerDisabilitas.viewDisabilitasById);
    
    app.route('/ibu/view/:id_ibu').get(loginMiddleware.isLoggedIn, controllerIbu.viewIbuById);
    
    app.route('/jenisalasan/view/:id_jenisalasan').get(loginMiddleware.isLoggedIn, controllerJenisAlasan.viewJenisAlasanById);

    app.route('/kecamatan/view/:id_kecamatan').get(loginMiddleware.isLoggedIn, controllerKecamatan.viewKecamatanById);
    
    app.route('/kelurahan/view/:id_kelurahan').get(loginMiddleware.isLoggedIn, controllerKelurahan.viewKelurahanById);

    app.route('/pekerjaan/view/:id_pekerjaan').get(loginMiddleware.isLoggedIn, controllerPekerjaan.viewPekerjaanById);
    
    app.route('/pendidikan/view/:id_pendidikan').get(loginMiddleware.isLoggedIn, controllerPendidikan.viewPendidikanById);
    
    app.route('/penghasilan/view/:id_penghasilan').get(loginMiddleware.isLoggedIn, controllerPenghasilan.viewPenghasilanById);
    
    app.route('/pip/view/:id_pip').get(loginMiddleware.isLoggedIn, controllerPIP.viewPIPById);

    app.route('/priodiksiswa/view/:id_siswa').get(loginMiddleware.isLoggedIn, controllerPriodikSiswa.viewPriodikSiswaById);

    app.route('/siswa/view/:id_siswa').get(loginMiddleware.isLoggedIn, controllerSiswa.viewSiswaById);
    
    app.route('/siswakeluar/view/:id_siswa').get(loginMiddleware.isLoggedIn, controllerSiswaKeluar.viewSiswaKeluarById);
    
    app.route('/siswamasuk/view/:id_siswa').get(loginMiddleware.isLoggedIn, controllerSiswaMasuk.viewSiswaMasukById);
    
    app.route('/statustinggal/view/:id_statustinggal').get(loginMiddleware.isLoggedIn, controllerStatusTinggal.viewStatusTinggalById);
    
    app.route('/transportasi/view/:id_transportasi').get(loginMiddleware.isLoggedIn, controllerTransportasi.viewTransportasiById);
    
    app.route('/wali/view/:id_wali').get(loginMiddleware.isLoggedIn, controllerWali.viewWaliById);

    // route view last ID
    app.route('/ayah/viewlast').get(loginMiddleware.isLoggedIn, controllerAyah.viewAyahLastId);

    app.route('/ibu/viewlast').get(loginMiddleware.isLoggedIn, controllerIbu.viewIbuLastId);

    app.route('/wali/viewlast').get(loginMiddleware.isLoggedIn, controllerWali.viewWaliLastId);

    app.route('/siswa/viewlast').get(loginMiddleware.isLoggedIn, controllerSiswa.viewSiswaLastId);

    app.route('/siswakeluar/viewlast').get(loginMiddleware.isLoggedIn, controllerSiswaKeluar.viewSiswaKeluarLastId);

    app.route('/priodiksiswa/viewlast').get(loginMiddleware.isLoggedIn, controllerPriodikSiswa.viewPriodikSiswaLastId);

    app.route('/siswamasuk/viewlast').get(loginMiddleware.isLoggedIn, controllerSiswaMasuk.viewSiswaMasukLastId);
    
    // route add
    app.route('/agama/add').post(loginMiddleware.isLoggedIn, controllerAgama.addAgama);

    app.route('/ayah/add').post(loginMiddleware.isLoggedIn, controllerAyah.addAyah);

    app.route('/bank/add').post(loginMiddleware.isLoggedIn, controllerBank.addBank);

    app.route('/detailbeasiswa/add').post(loginMiddleware.isLoggedIn, controllerDetailBeasiswa.addDetailBeasiswa);

    app.route('/detailprestasi/add').post(loginMiddleware.isLoggedIn, controllerDetailPrestasi.addDetailPrestasi);

    app.route('/disabilitas/add').post(loginMiddleware.isLoggedIn, controllerDisabilitas.addDisabilitas);

    app.route('/ibu/add').post(loginMiddleware.isLoggedIn, controllerIbu.addIbu);

    app.route('/jenisalasan/add').post(loginMiddleware.isLoggedIn, controllerJenisAlasan.addJenisAlasan);

    app.route('/kecamatan/add').post(loginMiddleware.isLoggedIn, controllerKecamatan.addKecamatan);

    app.route('/kelurahan/add').post(loginMiddleware.isLoggedIn, controllerKelurahan.addKelurahan);

    app.route('/pekerjaan/add').post(loginMiddleware.isLoggedIn, controllerPekerjaan.addPekerjaan);

    app.route('/pendidikan/add').post(loginMiddleware.isLoggedIn, controllerPendidikan.addPendidikan);

    app.route('/penghasilan/add').post(loginMiddleware.isLoggedIn, controllerPenghasilan.addPenghasilan);

    app.route('/pip/add').post(loginMiddleware.isLoggedIn, controllerPIP.addPIP);

    app.route('/priodiksiswa/add').post(loginMiddleware.isLoggedIn, controllerPriodikSiswa.addPriodikSiswa);

    app.route('/siswa/add').post(loginMiddleware.isLoggedIn, controllerSiswa.addSiswa);

    app.route('/siswakeluar/add').post(loginMiddleware.isLoggedIn, controllerSiswaKeluar.addSiswaKeluar);

    app.route('/siswamasuk/add').post(loginMiddleware.isLoggedIn, controllerSiswaMasuk.addSiswaMasuk);

    app.route('/statustinggal/add').post(loginMiddleware.isLoggedIn, controllerStatusTinggal.addStatusTinggal);

    app.route('/transportasi/add').post(loginMiddleware.isLoggedIn, controllerTransportasi.addTransportasi);

    app.route('/wali/add').post(loginMiddleware.isLoggedIn, controllerWali.addWali);
    
    // route update
    app.route('/agama/update').put(loginMiddleware.isLoggedIn, controllerAgama.updateAgama);

    app.route('/ayah/update').put(loginMiddleware.isLoggedIn, controllerAyah.updateAyah);

    app.route('/bank/update').put(loginMiddleware.isLoggedIn, controllerBank.updateBank);

    app.route('/detailbeasiswa/update').put(loginMiddleware.isLoggedIn, controllerDetailBeasiswa.updateDetailBeasiswa);

    app.route('/detailprestasi/update').put(loginMiddleware.isLoggedIn, controllerDetailPrestasi.updateDetailPrestasi);

    app.route('/disabilitas/update').put(loginMiddleware.isLoggedIn, controllerDisabilitas.updateDisabilitas);

    app.route('/ibu/update').put(loginMiddleware.isLoggedIn, controllerIbu.updateIbu);

    app.route('/jenisalasan/update').put(loginMiddleware.isLoggedIn, controllerJenisAlasan.updateJenisAlasan);

    app.route('/kecamatan/update').put(loginMiddleware.isLoggedIn, controllerKecamatan.updateKecamatan);

    app.route('/kelurahan/update').put(loginMiddleware.isLoggedIn, controllerKelurahan.updateKelurahan);

    app.route('/pekerjaan/update').put(loginMiddleware.isLoggedIn, controllerPekerjaan.updatePekerjaan);

    app.route('/pendidikan/update').put(loginMiddleware.isLoggedIn, controllerPendidikan.updatePendidikan);

    app.route('/penghasilan/update').put(loginMiddleware.isLoggedIn, controllerPenghasilan.updatePenghasilan);

    app.route('/pip/update').put(loginMiddleware.isLoggedIn, controllerPIP.updatePIP);

    app.route('/priodiksiswa/update').put(loginMiddleware.isLoggedIn, controllerPriodikSiswa.updatePriodikSiswa);

    app.route('/siswa/update').put(loginMiddleware.isLoggedIn, controllerSiswa.updateSiswa);

    app.route('/siswakeluar/update').put(loginMiddleware.isLoggedIn, controllerSiswaKeluar.updateSiswaKeluar);

    app.route('/siswamasuk/update').put(loginMiddleware.isLoggedIn, controllerSiswaMasuk.updateSiswaMasuk);

    app.route('/statustinggal/update').put(loginMiddleware.isLoggedIn, controllerStatusTinggal.updateStatusTinggal);

    app.route('/transportasi/update').put(loginMiddleware.isLoggedIn, controllerTransportasi.updateTransportasi);

    app.route('/wali/update').put(loginMiddleware.isLoggedIn, controllerWali.updateWali);

    // route delete
    app.route('/agama/delete/:id_agama').delete(loginMiddleware.isLoggedIn, controllerAgama.deleteAgama);
    
    app.route('/ayah/delete/:id_ayah').delete(loginMiddleware.isLoggedIn, controllerAyah.deleteAyah);
    
    app.route('/bank/delete/:id_bank').delete(loginMiddleware.isLoggedIn, controllerBank.deleteBank);

    app.route('/detailbeasiswa/delete/:id_detail_beasiswa').delete(loginMiddleware.isLoggedIn, controllerDetailBeasiswa.deleteDetailBeasiswa);

    app.route('/detailprestasi/delete/:id_detailprestasi').delete(loginMiddleware.isLoggedIn, controllerDetailPrestasi.deleteDetailPrestasi);

    app.route('/disabilitas/delete/:id_beasiswa').delete(loginMiddleware.isLoggedIn, controllerDisabilitas.deleteDisabilitas);
    
    app.route('/ibu/delete/:id_ibu').delete(loginMiddleware.isLoggedIn, controllerIbu.deleteIbu);
    
    app.route('/jenisalasan/delete/:id_jenisalasan').delete(loginMiddleware.isLoggedIn, controllerJenisAlasan.deleteJenisAlasan);

    app.route('/kecamatan/delete/:id_kecamatan').delete(loginMiddleware.isLoggedIn, controllerKecamatan.deleteKecamatan);

    app.route('/kelurahan/delete/:id_kelurahan').delete(loginMiddleware.isLoggedIn, controllerKelurahan.deleteKelurahan);

    app.route('/pekerjaan/delete/:id_kelurahan').delete(loginMiddleware.isLoggedIn, controllerPekerjaan.deletePekerjaan);

    app.route('/pendidikan/delete/:id_pendidikan').delete(loginMiddleware.isLoggedIn, controllerPendidikan.deletePendidikan);

    app.route('/penghasilan/delete/:id_penghasilan').delete(loginMiddleware.isLoggedIn, controllerPenghasilan.deletePenghasilan);

    app.route('/pip/delete/:id_pip').delete(loginMiddleware.isLoggedIn, controllerPIP.deletePIP);

    app.route('/priodiksiswa/delete/:id_siswa').delete(loginMiddleware.isLoggedIn, controllerPriodikSiswa.deletePriodikSiswa);

    app.route('/siswa/delete/:id_siswa').delete(loginMiddleware.isLoggedIn, controllerSiswa.deleteSiswa);

    app.route('/siswamasuk/delete/:id_siswa').delete(loginMiddleware.isLoggedIn, controllerSiswaMasuk.deleteSiswaMasuk);

    app.route('/siswakeluar/delete/:id_siswakeluar').delete(loginMiddleware.isLoggedIn, controllerSiswaKeluar.deleteSiswaKeluar);

    app.route('/statustinggal/delete/:id_statustinggal').delete(loginMiddleware.isLoggedIn, controllerStatusTinggal.deleteStatusTinggal);

    app.route('/transportasi/delete/:id_transportasi').delete(loginMiddleware.isLoggedIn, controllerTransportasi.deleteTransportasi);

    app.route('/wali/delete/:id_wali').delete(loginMiddleware.isLoggedIn, controllerWali.deleteWali);

}