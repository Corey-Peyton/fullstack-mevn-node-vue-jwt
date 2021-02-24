'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua kelurahan
exports.viewKelurahan = function(req,res){
    connection.query("SELECT * FROM kelurahan", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data kelurahan berdasarkan id
exports.viewKelurahanById = function(req,res){
    let id_kelurahan = req.params.id_kelurahan;
    connection.query('SELECT * FROM kelurahan WHERE id_kelurahan = ?', [id_kelurahan],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data kelurahan
exports.addKelurahan = function(req,res){

    var id_kecamatan    = req.body.id_kecamatan;
    var kelurahan       = req.body.kelurahan;
    var kode_pos        = req.body.kode_pos;

    connection.query('INSERT INTO kelurahan (id_kecamatan, kelurahan, kode_pos) VALUES (?, ?, ?)',
        [id_kecamatan, kelurahan, kode_pos],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data kelurahan!",res)
            }
        }
    );

};

// update data kelurahan
exports.updateKelurahan = function(req,res) {

    var id_kelurahan    = req.body.id_kelurahan;
    var id_kecamatan    = req.body.id_kecamatan;
    var kelurahan       = req.body.kelurahan;
    var kode_pos        = req.body.kode_pos;

    connection.query('UPDATE kelurahan SET id_kecamatan=?, kelurahan=?, kode_pos=? WHERE id_kelurahan=?',
        [id_kecamatan, kelurahan, kode_pos, id_kelurahan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data kelurahan!",res)
            }
        }

    );
};

// delete kelurahan
exports.deleteKelurahan = function(req,res) {

    var id_kelurahan = req.params.id_kelurahan;

    connection.query('DELETE FROM kelurahan WHERE id_kelurahan=?',
        [id_kelurahan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data kelurahan!",res)
            }
        }

    );

};