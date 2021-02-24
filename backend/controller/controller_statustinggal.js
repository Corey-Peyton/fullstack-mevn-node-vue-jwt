'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua status tinggal
exports.viewStatusTinggal = function(req,res){
    connection.query("SELECT * FROM status_tinggal", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data status tinggal berdasarkan id
exports.viewStatusTinggalById = function(req,res){
    let id_statustinggal = req.params.id_statustinggal;
    connection.query('SELECT * FROM status_tinggal WHERE id_statustinggal = ?', [id_statustinggal],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data status tinggal
exports.addStatusTinggal = function(req,res){

    var status_tinggal = req.body.status_tinggal;

    connection.query('INSERT INTO status_tinggal (status_tinggal) VALUES (?)',
        [status_tinggal],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data status tinggal!",res)
            }
        }
    );

};

// update data status tinggal
exports.updateStatusTinggal = function(req,res) {

    var id_statustinggal = req.body.id_statustinggal;
    var status_tinggal = req.body.status_tinggal;

    connection.query('UPDATE status_tinggal SET status_tinggal=? WHERE id_statustinggal=?',
        [status_tinggal, id_statustinggal],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data status tinggal!",res)
            }
        }

    );
};

// delete status tinggal
exports.deleteStatusTinggal = function(req,res) {

    var id_statustinggal = req.params.id_statustinggal;

    connection.query('DELETE FROM status_tinggal WHERE id_statustinggal=?',
        [id_statustinggal],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data status tinggal!",res)
            }
        }

    );

};