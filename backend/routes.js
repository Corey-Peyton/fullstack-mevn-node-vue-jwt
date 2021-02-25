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

    app.route('/secret-route').get(loginMiddleware.isLoggedIn, (req, res, next) => {
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

    // router.post('/login', (req, res, next) => {});
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
    app.route('/').get(controllerDefault.index);

    // route view
    // app.route('/agama/view').get(controllerAgama.viewAgama);
    app.route('/agama/view').get(loginMiddleware.isLoggedIn, controllerAgama.viewAgama);

    app.route('/ayah/view').get(controllerAyah.viewAyah);

    app.route('/bank/view').get(controllerBank.viewBank);

    app.route('/detailprestasi/view').get(controllerDetailPrestasi.viewDetailPrestasi);
    
    app.route('/detailbeasiswa/view').get(controllerDetailBeasiswa.viewDetailBeasiswa);

    app.route('/disabilitas/view').get(controllerDisabilitas.viewDisabilitas);

    app.route('/ibu/view').get(controllerIbu.viewIbu);

    app.route('/jenisalasan/view').get(controllerJenisAlasan.viewJenisAlasan);

    app.route('/kecamatan/view').get(controllerKecamatan.viewKecamatan);

    app.route('/kelurahan/view').get(controllerKelurahan.viewKelurahan);

    app.route('/pekerjaan/view').get(controllerPekerjaan.viewPekerjaan);

    app.route('/pendidikan/view').get(controllerPendidikan.viewPendidikan);

    app.route('/penghasilan/view').get(controllerPenghasilan.viewPenghasilan);

    app.route('/pip/view').get(controllerPIP.viewPIP);

    app.route('/priodiksiswa/view').get(controllerPriodikSiswa.viewPriodikSiswa);

    app.route('/siswa/view').get(controllerSiswa.viewSiswa);

    app.route('/siswakeluar/view').get(controllerSiswaKeluar.viewSiswaKeluar);

    app.route('/siswamasuk/view').get(controllerSiswaMasuk.viewSiswaMasuk);

    app.route('/statustinggal/view').get(controllerStatusTinggal.viewStatusTinggal);

    app.route('/transportasi/view').get(controllerTransportasi.viewTransportasi);

    app.route('/wali/view').get(controllerWali.viewWali);

    app.route('/siswa/viewrekap').get(controllerSiswa.viewRekapSiswa);

    app.route('/siswa/viewtotall').get(controllerSiswa.viewTotalSiswaL);

    app.route('/siswa/viewtotalp').get(controllerSiswa.viewTotalSiswaP);

    app.route('/siswa/viewtotal').get(controllerSiswa.viewTotalSiswa);

    // route view by ID / Primary Key
    app.route('/agama/view/:id_agama').get(controllerAgama.viewAgamaById);
    
    app.route('/ayah/view/:id_ayah').get(controllerAyah.viewAyahById);
    
    app.route('/bank/view/:id_bank').get(controllerBank.viewBankById);

    app.route('/detailbeasiswa/view/:id_detail_beasiswa').get(controllerDetailBeasiswa.viewDetailBeasiswaById);
    
    app.route('/detailprestasi/view/:id_detailprestasi').get(controllerDetailPrestasi.viewDetailPrestasiById);

    app.route('/disabilitas/view/:id_disabilitas').get(controllerDisabilitas.viewDisabilitasById);
    
    app.route('/ibu/view/:id_ibu').get(controllerIbu.viewIbuById);
    
    app.route('/jenisalasan/view/:id_jenisalasan').get(controllerJenisAlasan.viewJenisAlasanById);

    app.route('/kecamatan/view/:id_kecamatan').get(controllerKecamatan.viewKecamatanById);
    
    app.route('/kelurahan/view/:id_kelurahan').get(controllerKelurahan.viewKelurahanById);

    app.route('/pekerjaan/view/:id_pekerjaan').get(controllerPekerjaan.viewPekerjaanById);
    
    app.route('/pendidikan/view/:id_pendidikan').get(controllerPendidikan.viewPendidikanById);
    
    app.route('/penghasilan/view/:id_penghasilan').get(controllerPenghasilan.viewPenghasilanById);
    
    app.route('/pip/view/:id_pip').get(controllerPIP.viewPIPById);

    app.route('/priodiksiswa/view/:id_siswa').get(controllerPriodikSiswa.viewPriodikSiswaById);

    app.route('/siswa/view/:id_siswa').get(controllerSiswa.viewSiswaById);
    
    app.route('/siswakeluar/view/:id_siswa').get(controllerSiswaKeluar.viewSiswaKeluarById);
    
    app.route('/siswamasuk/view/:id_siswa').get(controllerSiswaMasuk.viewSiswaMasukById);
    
    app.route('/statustinggal/view/:id_statustinggal').get(controllerStatusTinggal.viewStatusTinggalById);
    
    app.route('/transportasi/view/:id_transportasi').get(controllerTransportasi.viewTransportasiById);
    
    app.route('/wali/view/:id_wali').get(controllerWali.viewWaliById);

    // route view last ID
    app.route('/ayah/viewlast').get(controllerAyah.viewAyahLastId);

    app.route('/ibu/viewlast').get(controllerIbu.viewIbuLastId);

    app.route('/wali/viewlast').get(controllerWali.viewWaliLastId);

    app.route('/siswa/viewlast').get(controllerSiswa.viewSiswaLastId);

    app.route('/siswakeluar/viewlast').get(controllerSiswaKeluar.viewSiswaKeluarLastId);

    app.route('/priodiksiswa/viewlast').get(controllerPriodikSiswa.viewPriodikSiswaLastId);

    app.route('/siswamasuk/viewlast').get(controllerSiswaMasuk.viewSiswaMasukLastId);
    
    // route add
    app.route('/agama/add').post(controllerAgama.addAgama);

    app.route('/ayah/add').post(controllerAyah.addAyah);

    app.route('/bank/add').post(controllerBank.addBank);

    app.route('/detailbeasiswa/add').post(controllerDetailBeasiswa.addDetailBeasiswa);

    app.route('/detailprestasi/add').post(controllerDetailPrestasi.addDetailPrestasi);

    app.route('/disabilitas/add').post(controllerDisabilitas.addDisabilitas);

    app.route('/ibu/add').post(controllerIbu.addIbu);

    app.route('/jenisalasan/add').post(controllerJenisAlasan.addJenisAlasan);

    app.route('/kecamatan/add').post(controllerKecamatan.addKecamatan);

    app.route('/kelurahan/add').post(controllerKelurahan.addKelurahan);

    app.route('/pekerjaan/add').post(controllerPekerjaan.addPekerjaan);

    app.route('/pendidikan/add').post(controllerPendidikan.addPendidikan);

    app.route('/penghasilan/add').post(controllerPenghasilan.addPenghasilan);

    app.route('/pip/add').post(controllerPIP.addPIP);

    app.route('/priodiksiswa/add').post(controllerPriodikSiswa.addPriodikSiswa);

    app.route('/siswa/add').post(controllerSiswa.addSiswa);

    app.route('/siswakeluar/add').post(controllerSiswaKeluar.addSiswaKeluar);

    app.route('/siswamasuk/add').post(controllerSiswaMasuk.addSiswaMasuk);

    app.route('/statustinggal/add').post(controllerStatusTinggal.addStatusTinggal);

    app.route('/transportasi/add').post(controllerTransportasi.addTransportasi);

    app.route('/wali/add').post(controllerWali.addWali);
    
    // route update
    app.route('/agama/update').put(controllerAgama.updateAgama);

    app.route('/ayah/update').put(controllerAyah.updateAyah);

    app.route('/bank/update').put(controllerBank.updateBank);

    app.route('/detailbeasiswa/update').put(controllerDetailBeasiswa.updateDetailBeasiswa);

    app.route('/detailprestasi/update').put(controllerDetailPrestasi.updateDetailPrestasi);

    app.route('/disabilitas/update').put(controllerDisabilitas.updateDisabilitas);

    app.route('/ibu/update').put(controllerIbu.updateIbu);

    app.route('/jenisalasan/update').put(controllerJenisAlasan.updateJenisAlasan);

    app.route('/kecamatan/update').put(controllerKecamatan.updateKecamatan);

    app.route('/kelurahan/update').put(controllerKelurahan.updateKelurahan);

    app.route('/pekerjaan/update').put(controllerPekerjaan.updatePekerjaan);

    app.route('/pendidikan/update').put(controllerPendidikan.updatePendidikan);

    app.route('/penghasilan/update').put(controllerPenghasilan.updatePenghasilan);

    app.route('/pip/update').put(controllerPIP.updatePIP);

    app.route('/priodiksiswa/update').put(controllerPriodikSiswa.updatePriodikSiswa);

    app.route('/siswa/update').put(controllerSiswa.updateSiswa);

    app.route('/siswakeluar/update').put(controllerSiswaKeluar.updateSiswaKeluar);

    app.route('/siswamasuk/update').put(controllerSiswaMasuk.updateSiswaMasuk);

    app.route('/statustinggal/update').put(controllerStatusTinggal.updateStatusTinggal);

    app.route('/transportasi/update').put(controllerTransportasi.updateTransportasi);

    app.route('/wali/update').put(controllerWali.updateWali);

    // route delete
    app.route('/agama/delete/:id_agama').delete(controllerAgama.deleteAgama);
    
    app.route('/ayah/delete/:id_ayah').delete(controllerAyah.deleteAyah);
    
    app.route('/bank/delete/:id_bank').delete(controllerBank.deleteBank);

    app.route('/detailbeasiswa/delete/:id_detail_beasiswa').delete(controllerDetailBeasiswa.deleteDetailBeasiswa);

    app.route('/detailprestasi/delete/:id_detailprestasi').delete(controllerDetailPrestasi.deleteDetailPrestasi);

    app.route('/disabilitas/delete/:id_beasiswa').delete(controllerDisabilitas.deleteDisabilitas);
    
    app.route('/ibu/delete/:id_ibu').delete(controllerIbu.deleteIbu);
    
    app.route('/jenisalasan/delete/:id_jenisalasan').delete(controllerJenisAlasan.deleteJenisAlasan);

    app.route('/kecamatan/delete/:id_kecamatan').delete(controllerKecamatan.deleteKecamatan);

    app.route('/kelurahan/delete/:id_kelurahan').delete(controllerKelurahan.deleteKelurahan);

    app.route('/pekerjaan/delete/:id_kelurahan').delete(controllerPekerjaan.deletePekerjaan);

    app.route('/pendidikan/delete/:id_pendidikan').delete(controllerPendidikan.deletePendidikan);

    app.route('/penghasilan/delete/:id_penghasilan').delete(controllerPenghasilan.deletePenghasilan);

    app.route('/pip/delete/:id_pip').delete(controllerPIP.deletePIP);

    app.route('/priodiksiswa/delete/:id_siswa').delete(controllerPriodikSiswa.deletePriodikSiswa);

    app.route('/siswa/delete/:id_siswa').delete(controllerSiswa.deleteSiswa);

    app.route('/siswamasuk/delete/:id_siswa').delete(controllerSiswaMasuk.deleteSiswaMasuk);

    app.route('/siswakeluar/delete/:id_siswakeluar').delete(controllerSiswaKeluar.deleteSiswaKeluar);

    app.route('/statustinggal/delete/:id_statustinggal').delete(controllerStatusTinggal.deleteStatusTinggal);

    app.route('/transportasi/delete/:id_transportasi').delete(controllerTransportasi.deleteTransportasi);

    app.route('/wali/delete/:id_wali').delete(controllerWali.deleteWali);

}