'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua ibu
exports.viewIbu = function(req,res){
    connection.query(`SELECT id_ibu, nik, DATE_FORMAT(tgl_lahir, '%d %M %Y') AS tgl_lahir, nama_ibu, pendidikan, pekerjaan FROM ibu
                        INNER JOIN pendidikan ON pendidikan.id_pendidikan = ibu.id_pendidikan
                        INNER JOIN pekerjaan ON pekerjaan.id_pekerjaan = ibu.id_pekerjaan
                        INNER JOIN penghasilan ON penghasilan.id_penghasilan = ibu.id_penghasilan
                        INNER JOIN disabilitas ON disabilitas.id_disabilitas = ibu.id_disabilitas`, function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data ibu berdasarkan id
exports.viewIbuById = function(req,res){
    let id_ibu = req.params.id_ibu;
    connection.query(`SELECT id_ibu, nik, DATE_FORMAT(tgl_lahir, '%Y-%m-%d') AS tgl_lahir, nama_ibu, id_pendidikan, id_penghasilan, id_pekerjaan,             
                        id_disabilitas
                        FROM ibu WHERE id_ibu = ?`, [id_ibu],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewIbuLastId = function(req,res){
    connection.query('SELECT * FROM ibu ORDER BY id_ibu DESC LIMIT 1',
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data ibu
exports.addIbu = function(req,res){

    var id_ibu = req.body.id_ibu;
    var nama_ibu = req.body.nama_ibu;
    var nik = req.body.nik;
    var tgl_lahir = req.body.tgl_lahir;
    var id_pendidikan = req.body.id_pendidikan;
    var id_pekerjaan = req.body.id_pekerjaan;
    var id_penghasilan = req.body.id_penghasilan;
    var id_disabilitas = req.body.id_disabilitas;

    connection.query('INSERT INTO ibu (id_ibu, nama_ibu, nik, tgl_lahir, id_pendidikan, id_pekerjaan, id_penghasilan, id_disabilitas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [id_ibu, nama_ibu, nik, tgl_lahir, id_pendidikan, id_pekerjaan, id_penghasilan, id_disabilitas],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data ibu!",res)
            }
        }
    );

};

// update data ibu
exports.updateIbu = function(req,res) {

    var id_ibu = req.body.id_ibu;
    var nama_ibu = req.body.nama_ibu;
    var nik = req.body.nik;
    var tgl_lahir = req.body.tgl_lahir;
    var id_pendidikan = req.body.id_pendidikan;
    var id_pekerjaan = req.body.id_pekerjaan;
    var id_penghasilan = req.body.id_penghasilan;
    var id_disabilitas = req.body.id_disabilitas;

    connection.query('UPDATE ibu SET nama_ibu=?, nik=?, tgl_lahir=?, id_pendidikan=?, id_pekerjaan=?, id_penghasilan=?, id_disabilitas=? WHERE id_ibu=?',
        [nama_ibu, nik, tgl_lahir, id_pendidikan, id_pekerjaan, id_penghasilan, id_disabilitas, id_ibu],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data ibu!",res)
            }
        }

    );
};

// delete ibu
exports.deleteIbu = function(req,res) {

    var id_ibu = req.params.id_ibu;

    connection.query('DELETE FROM ibu WHERE id_ibu=?',
        [id_ibu],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data ibu!",res)
            }
        }

    );

};