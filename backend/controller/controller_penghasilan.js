'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua penghasilan
exports.viewPenghasilan = function(req,res){
    connection.query("SELECT * FROM penghasilan", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data penghasilan berdasarkan id
exports.viewPenghasilanById = function(req,res){
    let id_penghasilan = req.params.id_penghasilan;
    connection.query('SELECT * FROM penghasilan WHERE id_penghasilan = ?', [id_penghasilan],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data penghasilan
exports.addPenghasilan = function(req,res){

    var penghasilan = req.body.penghasilan;

    connection.query('INSERT INTO penghasilan (penghasilan) VALUES (?)',
        [penghasilan],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data penghasilan!",res)
            }
        }
    );

};

// update data penghasilan
exports.updatePenghasilan = function(req,res) {

    var id_penghasilan = req.body.id_penghasilan;
    var penghasilan = req.body.penghasilan;

    connection.query('UPDATE penghasilan SET penghasilan=? WHERE id_penghasilan=?',
        [penghasilan, id_penghasilan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data penghasilan!",res)
            }
        }

    );
};

// delete penghasilan
exports.deletePenghasilan = function(req,res) {

    var id_penghasilan = req.params.id_penghasilan;

    connection.query('DELETE FROM penghasilan WHERE id_penghasilan=?',
        [id_penghasilan],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data penghasilan!",res)
            }
        }

    );

};