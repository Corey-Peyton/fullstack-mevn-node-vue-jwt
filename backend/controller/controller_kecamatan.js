'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua data agama
exports.viewAgama = function(req,res){
    connection.query("SELECT * FROM agama", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select semua kecamatan
exports.viewKecamatan = function(req,res){
    connection.query("SELECT * FROM kecamatan", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data kecamatan berdasarkan id
exports.viewKecamatanById = function(req,res){
    let id_kecamatan = req.params.id_kecamatan;
    connection.query('SELECT * FROM kecamatan WHERE id_kecamatan = ?', [id_kecamatan],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data kecamatan
exports.addKecamatan = function(req,res){

    var kecamatan = req.body.kecamatan;

    connection.query('INSERT INTO kecamatan (kecamatan) VALUES (?)',
        [kecamatan],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data kecamatan!",res)
            }
        }
    );

};

// update data kecamatan
exports.updateKecamatan = function(req,res) {

    var id_kecamatan = req.body.id_kecamatan;
    var kecamatan = req.body.kecamatan;

    connection.query('UPDATE kecamatan SET kecamatan=? WHERE id_kecamatan=?',
        [kecamatan, id_kecamatan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data kecamatan!",res)
            }
        }

    );
};

// delete kecamatan
exports.deleteKecamatan = function(req,res) {

    var id_kecamatan = req.params.id_kecamatan;

    connection.query('DELETE FROM kecamatan WHERE id_kecamatan=?',
        [id_kecamatan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data kecamatan!",res)
            }
        }

    );

};