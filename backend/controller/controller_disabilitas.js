'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua data disabilitas
exports.viewDisabilitas = function(req,res){
    connection.query("SELECT * FROM disabilitas", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data disabilitas berdasarkan id
exports.viewDisabilitasById = function(req,res){
    let id_disabilitas = req.params.id_disabilitas;
    connection.query('SELECT * FROM disabilitas WHERE id_disabilitas = ?', [id_disabilitas],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data disabilitas
exports.addDisabilitas = function(req,res){

    var status_disabilitas = req.body.status_disabilitas;

    connection.query('INSERT INTO disabilitas (status_disabilitas) VALUES (?)',
        [status_disabilitas],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data disabilitas!",res)
            }
        }
    );

};

// update data disabilitas
exports.updateDisabilitas = function(req,res) {

    var id_disabilitas      = req.body.id_disabilitas;
    var status_disabilitas  = req.body.status_disabilitas;

    connection.query('UPDATE disabilitas SET status_disabilitas=? WHERE id_disabilitas=?',
        [status_disabilitas, id_disabilitas],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data disabilitas!",res)
            }
        }

    );
};

// delete disabilitas
exports.deleteDisabilitas = function(req,res) {

    var id_disabilitas = req.params.id_disabilitas;

    connection.query('DELETE FROM disabilitas WHERE id_disabilitas=?',
        [id_disabilitas],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data disabilitas!",res)
            }
        }

    );

};