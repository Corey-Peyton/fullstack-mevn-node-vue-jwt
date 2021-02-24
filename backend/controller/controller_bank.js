'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua data bank
exports.viewBank = function(req,res){
    connection.query("SELECT * FROM bank", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data bank berdasarkan id
exports.viewBankById = function(req,res){
    let id_bank = req.params.id_bank;
    connection.query('SELECT * FROM bank WHERE id_bank = ?', [id_bank],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data bank
exports.addBank = function(req,res){

    var id_bank     = req.body.id_bank;
    var nama_bank   = req.body.nama_bank;
    var norek       = req.body.norek;
    var atas_nama   = req.body.atas_nama;

    connection.query('INSERT INTO bank (id_bank, nama_bank, norek, atas_nama) VALUES (?, ?, ?, ?)',
        [id_bank, nama_bank, norek, atas_nama],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data bank!",res)
            }
        }
    );

};

// update data bank
exports.updateBank = function(req,res) {

    var id_bank     = req.body.id_bank;
    var nama_bank   = req.body.nama_bank;
    var norek       = req.body.norek;
    var atas_nama   = req.body.atas_nama;

    connection.query('UPDATE bank SET nama_bank=?, norek=?, atas_nama=? WHERE id_bank=?',
        [nama_bank, norek, atas_nama, id_bank],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data bank!",res)
            }
        }

    );
};

// delete bank
exports.deleteBank = function(req,res) {

    var id_bank = req.params.id_bank;

    connection.query('DELETE FROM bank WHERE id_bank=?',
        [id_bank],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data bank!",res)
            }
        }

    );

};