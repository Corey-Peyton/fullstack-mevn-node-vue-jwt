'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua transportasi
exports.viewTransportasi = function(req,res){
    connection.query("SELECT * FROM transportasi", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data transportasi berdasarkan id
exports.viewTransportasiById = function(req,res){
    let id_transportasi = req.params.id_transportasi;
    connection.query('SELECT * FROM transportasi WHERE id_transportasi = ?', [id_transportasi],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data transportasi
exports.addTransportasi = function(req,res){

    var status_transportasi = req.body.status_transportasi;

    connection.query('INSERT INTO transportasi (status_transportasi) VALUES (?)',
        [status_transportasi],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data transportasi!",res)
            }
        }
    );

};

// update data transportasi
exports.updateTransportasi = function(req,res) {

    var id_transportasi = req.body.id_transportasi;
    var status_transportasi = req.body.status_transportasi;

    connection.query('UPDATE transportasi SET status_transportasi=? WHERE id_transportasi=?',
        [status_transportasi, id_transportasi],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data transportasi!",res)
            }
        }

    );
};

// delete transportasi
exports.deleteTransportasi = function(req,res) {

    var id_transportasi = req.params.id_transportasi;

    connection.query('DELETE FROM transportasi WHERE id_transportasi=?',
        [id_transportasi],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data transportasi!",res)
            }
        }

    );

};