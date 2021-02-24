'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua pip
exports.viewPIP = function(req,res){
    connection.query("SELECT * FROM pip", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data pip berdasarkan id
exports.viewPIPById = function(req,res){
    let id_pip = req.params.id_pip;
    connection.query('SELECT * FROM pip WHERE id_pip = ?', [id_pip],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data pip
exports.addPIP = function(req,res){

    var id_siswa        = req.body.id_siswa;
    var alasan_layakpip = req.body.alasan_layakpip;
    var no_kip       = req.body.no_kip;
    var nama_kip        = req.body.nama_kip;

    connection.query('INSERT INTO pip (id_siswa, alasan_layakpip, no_kip, nama_kip) VALUES (?, ?, ?, ?)',
        [id_siswa, alasan_layakpip, no_kip, nama_kip],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data pip!",res)
            }
        }
    );

};

// update data agama
exports.updatePIP = function(req,res) {

    var id_pip          = req.body.id_pip;
    var id_siswa        = req.body.id_siswa;
    var alasan_layakpip = req.body.alasan_layakpip;
    var no_kip       = req.body.no_kip;
    var nama_kip        = req.body.nama_kip;

    connection.query('UPDATE pip SET id_siswa=?, alasan_layakpip=?, no_kip=?, nama_kip=? WHERE id_pip=?',
        [id_siswa, alasan_layakpip, no_kip, nama_kip, id_pip],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data pip!",res)
            }
        }

    );
}; 

// delete pip
exports.deletePIP = function(req,res) {

    var id_pip = req.params.id_pip;

    connection.query('DELETE FROM pip WHERE id_pip=?',
        [id_pip],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data PIP!",res)
            }
        }

    );

};