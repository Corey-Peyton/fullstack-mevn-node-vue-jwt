'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua pendidikan
exports.viewPendidikan = function(req,res){
    connection.query("SELECT * FROM pendidikan", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// add data pendidikan
exports.addPendidikan = function(req,res){

    var pendidikan = req.body.pendidikan;

    connection.query('INSERT INTO pendidikan (pendidikan) VALUES (?)',
        [pendidikan],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data pendidikan!",res)
            }
        }
    );

};

// update data pendidikan
exports.updatePendidikan = function(req,res) {

    var id_pendidikan = req.body.id_pendidikan;
    var pendidikan = req.body.pendidikan;

    connection.query('UPDATE pendidikan SET pendidikan=? WHERE id_pendidikan=?',
        [pendidikan, id_pendidikan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data pendidikan!",res)
            }
        }

    );
};

// select data pendidikan berdasarkan id
exports.viewPendidikanById = function(req,res){
    let id_pendidikan = req.params.id_pendidikan;
    connection.query('SELECT * FROM pendidikan WHERE id_pendidikan = ?', [id_pendidikan],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// delete pendidikan
exports.deletePendidikan = function(req,res) {

    var id_pendidikan = req.params.id_pendidikan;

    connection.query('DELETE FROM pendidikan WHERE id_pendidikan=?',
        [id_pendidikan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data pendidikan!",res)
            }
        }

    );

};