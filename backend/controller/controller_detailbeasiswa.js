'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua data detail beasiswa
exports.viewDetailBeasiswa = function(req,res){
    connection.query("SELECT * FROM detail_beasiswa", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data detail beasiswa berdasarkan id
exports.viewDetailBeasiswaById = function(req,res){
    let id_detail_beasiswa = req.params.id_detail_beasiswa;
    connection.query('SELECT * FROM detail_beasiswa WHERE id_detail_beasiswa = ?', [id_detail_beasiswa],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data detail beasiswa
exports.addDetailBeasiswa = function(req,res){

    var id_siswa        = req.body.id_siswa;
    var jenis           = req.body.jenis;
    var keterangan      = req.body.keterangan;
    var tahun_mulai     = req.body.tahun_mulai;
    var tahun_selesai   = req.body.tahun_selesai;

    connection.query('INSERT INTO detail_beasiswa (id_siswa, jenis, keterangan, tahun_mulai, tahun_selesai) VALUES (?, ?, ?, ?, ?)',
        [id_siswa, jenis, keterangan, tahun_mulai, tahun_selesai],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data detail beasiswa!",res)
            }
        }
    );

};

// update data detail beasiswa
exports.updateDetailBeasiswa = function(req,res) {

    var id_detail_beasiswa = req.body.id_detail_beasiswa;
    var id_siswa        = req.body.id_siswa;
    var jenis           = req.body.jenis;
    var keterangan      = req.body.keterangan;
    var tahun_mulai     = req.body.tahun_mulai;
    var tahun_selesai   = req.body.tahun_selesai;

    connection.query('UPDATE detail_beasiswa SET id_siswa=?, jenis=?, keterangan=?, tahun_mulai=?, tahun_selesai=? WHERE id_detail_beasiswa=?',
        [id_siswa, jenis, keterangan, tahun_mulai, tahun_selesai, id_detail_beasiswa],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data detail beasiswa!",res)
            }
        }

    );
};

// delete detail beasiswa
exports.deleteDetailBeasiswa = function(req,res) {

    var id_detail_beasiswa = req.params.id_detail_beasiswa;

    connection.query('DELETE FROM detail_beasiswa WHERE id_detail_beasiswa=?',
        [id_detail_beasiswa],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data detail beasiswa!",res)
            }
        }

    );

};