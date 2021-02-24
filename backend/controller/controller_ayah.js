'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua data ayah
exports.viewAyah = function(req,res){
    connection.query(`SELECT id_ayah, nik, DATE_FORMAT(tgl_lahir, '%d %M %Y') AS tgl_lahir, nama_ayah, pendidikan, pekerjaan FROM ayah
                        INNER JOIN pendidikan ON pendidikan.id_pendidikan = ayah.id_pendidikan
                        INNER JOIN pekerjaan ON pekerjaan.id_pekerjaan = ayah.id_pekerjaan
                        INNER JOIN penghasilan ON penghasilan.id_penghasilan = ayah.id_penghasilan
                        INNER JOIN disabilitas ON disabilitas.id_disabilitas = ayah.id_disabilitas`, function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data ayah berdasarkan id
exports.viewAyahById = function(req,res){
    let id_ayah = req.params.id_ayah;
    connection.query(`SELECT id_ayah, nik, DATE_FORMAT(tgl_lahir, '%Y-%m-%d') AS tgl_lahir, nama_ayah, id_pendidikan, id_penghasilan, id_pekerjaan,             
                        id_disabilitas
                        FROM ayah WHERE id_ayah = ?`, [id_ayah],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewAyahLastId = function(req,res){
    connection.query('SELECT * FROM ayah ORDER BY id_ayah DESC LIMIT 1',
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data ayah
exports.addAyah = function(req,res){

    var lastDigit = connection.query('SELECT * FROM ayah ORDER BY id_ayah DESC LIMIT 1',
    function(error, rows, field){
        if(error){
            connection.log(error);
        } else {
            response.ok(rows,res)
        }
    }
    );
    var id_ayah = req.body.id_ayah;
    var nama_ayah = req.body.nama_ayah;
    var nik = req.body.nik;
    var tgl_lahir = req.body.tgl_lahir;
    var id_pendidikan = req.body.id_pendidikan;
    var id_pekerjaan = req.body.id_pekerjaan;
    var id_penghasilan = req.body.id_penghasilan;
    var id_disabilitas = req.body.id_disabilitas;

    connection.query('INSERT INTO ayah (id_ayah, nama_ayah, nik, tgl_lahir, id_pendidikan, id_pekerjaan, id_penghasilan, id_disabilitas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id_ayah, nama_ayah, nik, tgl_lahir, id_pendidikan, id_pekerjaan, id_penghasilan, id_disabilitas],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data ayah!",res)
            }
        }
    );

};

// update data agama
exports.updateAyah = function(req,res) {

    var id_ayah = req.body.id_ayah;
    var nama_ayah = req.body.nama_ayah;
    var nik = req.body.nik;
    var tgl_lahir = req.body.tgl_lahir;
    var id_pendidikan = req.body.id_pendidikan;
    var id_pekerjaan = req.body.id_pekerjaan;
    var id_penghasilan = req.body.id_penghasilan;
    var id_disabilitas = req.body.id_disabilitas;

    connection.query('UPDATE ayah SET nama_ayah=?, nik=?, tgl_lahir=?, id_pendidikan=?, id_pekerjaan=?, id_penghasilan=?, id_disabilitas=? WHERE id_ayah=?',
        [nama_ayah, nik, tgl_lahir, id_pendidikan, id_pekerjaan, id_penghasilan, id_disabilitas, id_ayah],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data ayah!",res)
            }
        }

    );
};

// delete ayah
exports.deleteAyah = function(req,res) {

    var id_ayah = req.params.id_ayah;

    connection.query('DELETE FROM ayah WHERE id_ayah=?',
        [id_ayah],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data ayah!",res)
            }
        }

    );

};