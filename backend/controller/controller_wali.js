'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua wali
exports.viewWali = function(req,res){
    connection.query(`SELECT id_wali, nik, DATE_FORMAT(tgl_lahir, '%d %M %Y') AS tgl_lahir, nama_wali, pendidikan, pekerjaan FROM wali
                        INNER JOIN pendidikan ON pendidikan.id_pendidikan = wali.id_pendidikan
                        INNER JOIN pekerjaan ON pekerjaan.id_pekerjaan = wali.id_pekerjaan
                        INNER JOIN penghasilan ON penghasilan.id_penghasilan = wali.id_penghasilan
                        INNER JOIN disabilitas ON disabilitas.id_disabilitas = wali.id_disabilitas`, function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data wali berdasarkan id
exports.viewWaliById = function(req,res){
    let id_wali = req.params.id_wali;
    connection.query(`SELECT  id_wali, nik, DATE_FORMAT(tgl_lahir, '%Y-%m-%d') AS tgl_lahir, nama_wali, jenis_kelamin, id_pendidikan, id_penghasilan,      
                        id_pekerjaan, id_disabilitas
                        FROM wali WHERE id_wali = ?`, [id_wali],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewWaliLastId = function(req,res){
    connection.query('SELECT * FROM wali ORDER BY id_wali DESC LIMIT 1',
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data wali
exports.addWali = function(req,res){

    var id_wali = req.body.id_wali;
    var nama_wali = req.body.nama_wali;
    var jenis_kelamin = req.body.jenis_kelamin;
    var nik = req.body.nik;
    var tgl_lahir = req.body.tgl_lahir;
    var id_pendidikan = req.body.id_pendidikan;
    var id_pekerjaan = req.body.id_pekerjaan;
    var id_penghasilan = req.body.id_penghasilan;
    var id_disabilitas = req.body.id_disabilitas;

    connection.query('INSERT INTO wali (id_wali, nama_wali, jenis_kelamin, nik, tgl_lahir, id_pendidikan, id_pekerjaan, id_penghasilan, id_disabilitas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id_wali, nama_wali, jenis_kelamin, nik, tgl_lahir, id_pendidikan, id_pekerjaan, id_penghasilan, id_disabilitas],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data wali!",res)
            }
        }
    );

};

// update data wali
exports.updateWali = function(req,res) {

    var id_wali = req.body.id_wali;
    var nama_wali = req.body.nama_wali;
    var jenis_kelamin = req.body.jenis_kelamin;
    var nik = req.body.nik;
    var tgl_lahir = req.body.tgl_lahir;
    var id_pendidikan = req.body.id_pendidikan;
    var id_pekerjaan = req.body.id_pekerjaan;
    var id_penghasilan = req.body.id_penghasilan;
    var id_disabilitas = req.body.id_disabilitas;

    connection.query('UPDATE wali SET nama_wali=?, jenis_kelamin=?, nik=?, tgl_lahir=?, id_pendidikan=?, id_pekerjaan=?, id_penghasilan=?, id_disabilitas=? WHERE id_wali=?',
        [nama_wali, jenis_kelamin, nik, tgl_lahir, id_pendidikan, id_pekerjaan, id_penghasilan, id_disabilitas, id_wali],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data wali!",res)
            }
        }

    );
};

// delete wali
exports.deleteWali = function(req,res) {

    var id_wali = req.params.id_wali;

    connection.query('DELETE FROM wali WHERE id_wali=?',
        [id_wali],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data wali!",res)
            }
        }

    );

};