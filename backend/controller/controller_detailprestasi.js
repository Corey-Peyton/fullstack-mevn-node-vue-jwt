'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua data detail prestasi
exports.viewDetailPrestasi = function(req,res){
    connection.query("SELECT * FROM detail_prestasi", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data detail prestasi berdasarkan id
exports.viewDetailPrestasiById = function(req,res){
    let id_detailprestasi = req.params.id_detailprestasi;
    connection.query('SELECT * FROM detail_prestasi WHERE id_detailprestasi = ?', [id_detailprestasi],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data detail prestasi
exports.addDetailPrestasi = function(req,res){

    var id_siswa            = req.body.id_siswa;
    var jenis_prestasi      = req.body.jenis_prestasi;
    var tingkat_prestasi    = req.body.tingkat_prestasi;
    var nama_prestasi       = req.body.nama_prestasi;
    var tahun               = req.body.tahun;
    var penyelenggara       = req.body.penyelenggara;

    connection.query('INSERT INTO detail_prestasi (id_siswa, jenis_prestasi, tingkat_prestasi, nama_prestasi, tahun, penyelenggara) VALUES (?, ?, ?, ?, ?, ?)',
        [id_siswa, jenis_prestasi, tingkat_prestasi, nama_prestasi, tahun, penyelenggara],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data detail prestasi!",res)
            }
        }
    );

};

// update data detail prestasi
exports.updateDetailPrestasi = function(req,res) {

    var id_detailprestasi   = req.body.id_detailprestasi;
    var id_siswa            = req.body.id_siswa;
    var jenis_prestasi      = req.body.jenis_prestasi;
    var tingkat_prestasi    = req.body.tingkat_prestasi;
    var nama_prestasi       = req.body.nama_prestasi;
    var tahun               = req.body.tahun;
    var penyelenggara       = req.body.penyelenggara;

    connection.query('UPDATE detail_prestasi SET id_siswa=?, jenis_prestasi=?, tingkat_prestasi=?, nama_prestasi=?, tahun=?, penyelenggara=? WHERE id_detailprestasi=?',
        [id_siswa, jenis_prestasi, tingkat_prestasi, nama_prestasi, tahun, penyelenggara, id_detailprestasi],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data detail prestasi!",res)
            }
        }

    );
};

// delete detail prestasi
exports.deleteDetailPrestasi = function(req,res) {

    var id_detailprestasi = req.params.id_detailprestasi;

    connection.query('DELETE FROM detail_prestasi WHERE id_detailprestasi=?',
        [id_detailprestasi],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data detail prestasi!",res)
            }
        }

    );

};