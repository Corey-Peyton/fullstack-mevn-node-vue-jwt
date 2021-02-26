'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');
const loginMiddleware = require('./../middleware/login.js');

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

// select data agama berdasarkan id
exports.viewAgamaById = function(req,res){
    let id_agama = req.params.id_agama;
    connection.query('SELECT * FROM agama WHERE id_agama = ?', [id_agama],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// select data agama berdasarkan id
exports.viewAgamaBySearch = function(req,res){
    let agama_params = req.params.agama;
    let agama = "%" + agama_params + "%";
    connection.query('SELECT * FROM agama WHERE agama LIKE ?', [agama],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data agama
exports.addAgama = function(req,res){

    var agama = req.body.agama;

    connection.query('INSERT INTO agama (agama) VALUES (?)',
        [agama],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data agama!",res)
            }
        }
    );

};

// update data agama
exports.updateAgama = function(req,res) {

    var id_agama = req.body.id_agama;
    var agama = req.body.agama;

    connection.query('UPDATE agama SET agama=? WHERE id_agama=?',
        [agama, id_agama],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data agama!",res)
            }
        }

    );
};

// delete agama
exports.deleteAgama = function(req,res) {

    let id_agama = req.params.id_agama;

    connection.query('DELETE FROM agama WHERE id_agama=?',
        [id_agama],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data agama!",res)
            }
        }

    );

};