'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua jenis_alasan
exports.viewJenisAlasan = function(req,res){
    connection.query("SELECT * FROM jenis_alasan", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data jenis alasan berdasarkan id
exports.viewJenisAlasanById = function(req,res){
    let id_jenisalasan = req.params.id_jenisalasan;
    connection.query('SELECT * FROM jenis_alasan WHERE id_jenisalasan = ?', [id_jenisalasan],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data jenis alasan
exports.addJenisAlasan = function(req,res){

    var alasan = req.body.alasan;

    connection.query('INSERT INTO jenis_alasan (alasan) VALUES (?)',
        [alasan],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data jenis alasan!",res)
            }
        }
    );

};

// update data jenis alasan
exports.updateJenisAlasan = function(req,res) {

    var id_jenisalasan  = req.body.id_jenisalasan;
    var alasan = req.body.alasan;

    connection.query('UPDATE jenis_alasan SET alasan=? WHERE id_jenisalasan=?',
        [alasan, id_jenisalasan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data jenis alasan!",res)
            }
        }

    );
};

// delete jenis alasan
exports.deleteJenisAlasan = function(req,res) {

    var id_jenisalasan = req.params.id_jenisalasan;

    connection.query('DELETE FROM jenis_alasan WHERE id_jenisalasan=?',
        [id_jenisalasan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data jenis alasan!",res)
            }
        }

    );

};