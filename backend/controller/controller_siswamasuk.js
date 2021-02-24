'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua siswa masuk
exports.viewSiswaMasuk = function(req,res){
    connection.query("SELECT * FROM siswa_masuk", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data siswa masuk berdasarkan id
exports.viewSiswaMasukById = function(req,res){
    let id_siswa = req.params.id_siswa;
    connection.query(`SELECT *, DATE_FORMAT(siswa_masuk.tgl_masuk, '%Y-%m-%d') AS tgl_masuk FROM siswa_masuk WHERE id_siswa = ?`, [id_siswa],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewSiswaMasukLastId = function(req,res){
    connection.query('SELECT * FROM siswa_masuk ORDER BY id_siswamasuk DESC LIMIT 1',
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data siswa masuk
exports.addSiswaMasuk = function(req,res){

    var id_siswamasuk      = req.body.id_siswamasuk;
    var id_siswa            = req.body.id_siswa;
    var jenis_daftar      = req.body.jenis_daftar;
    var tgl_masuk          = req.body.tgl_masuk;
    var nis          = req.body.nis;
    var no_ujian           = req.body.no_ujian;
    var no_ijasah           = req.body.no_ijasah;
    var no_skhus            = req.body.no_skhus;

    connection.query('INSERT INTO siswa_masuk (id_siswamasuk, id_siswa, jenis_daftar, tgl_masuk, nis, no_ujian, no_ijasah, no_skhus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id_siswamasuk, id_siswa, jenis_daftar, tgl_masuk, nis, no_ujian, no_ijasah, no_skhus],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data siswa masuk!",res)
            }
        }
    );

};

// update data siswa keluar
exports.updateSiswaMasuk = function(req,res) {

    var id_siswamasuk      = req.body.id_siswamasuk;
    var id_siswa            = req.body.id_siswa;
    var jenis_daftar      = req.body.jenis_daftar;
    var tgl_masuk          = req.body.tgl_masuk;
    var nis          = req.body.nis;
    var no_ujian           = req.body.no_ujian;
    var no_ijasah           = req.body.no_ijasah;
    var no_skhus            = req.body.no_skhus;

    connection.query('UPDATE siswa_masuk SET id_siswa=?, jenis_daftar=?, tgl_masuk=?, nis=?, no_ujian=?, no_ijasah=?, no_skhus=? WHERE id_siswamasuk=?',
        [id_siswa, jenis_daftar, tgl_masuk, nis, no_ujian, no_ijasah, no_skhus, id_siswamasuk],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data siswa masuk!",res)
            }
        }

    );
};

// delete siswa masuk
exports.deleteSiswaMasuk = function(req,res) {

    var id_siswa = req.params.id_siswa;

    connection.query('DELETE FROM siswa_masuk WHERE id_siswa=?',
        [id_siswa],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data siswa masuk!",res)
            }
        }

    );

};