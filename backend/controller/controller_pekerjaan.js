'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua pekerjaan
exports.viewPekerjaan = function(req,res){
    connection.query("SELECT * FROM pekerjaan", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data pekerjaan berdasarkan id
exports.viewPekerjaanById = function(req,res){
    let id_pekerjaan = req.params.id_pekerjaan;
    connection.query('SELECT * FROM pekerjaan WHERE id_pekerjaan = ?', [id_pekerjaan],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data pekerjaan
exports.addPekerjaan = function(req,res){

    var pekerjaan = req.body.pekerjaan;

    connection.query('INSERT INTO pekerjaan (pekerjaan) VALUES (?)',
        [pekerjaan],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data pekerjaan!",res)
            }
        }
    );

};

// update data pekerjaan
exports.updatePekerjaan = function(req,res) {

    var id_pekerjaan    = req.body.id_pekerjaan;
    var pekerjaan       = req.body.pekerjaan;

    connection.query('UPDATE pekerjaan SET pekerjaan=? WHERE id_pekerjaan=?',
        [pekerjaan, id_pekerjaan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data pekerjaan!",res)
            }
        }

    );
};

// delete pekerjaan
exports.deletePekerjaan = function(req,res) {

    var id_pekerjaan = req.params.id_pekerjaan;

    connection.query('DELETE FROM pekerjaan WHERE id_pekerjaan=?',
        [id_pekerjaan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data pekerjaan!",res)
            }
        }

    );

};