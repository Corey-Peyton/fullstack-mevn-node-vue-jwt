'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua siswa keluar
exports.viewSiswaKeluar = function(req,res){
    connection.query(`SELECT *, DATE_FORMAT(siswa.tgl_lahir, '%Y-%m-%d') AS 
    tgl_lahir FROM siswa_keluar
                        LEFT JOIN siswa ON siswa_keluar.id_siswa = siswa.id_siswa
                        INNER JOIN jenis_alasan ON jenis_alasan.id_jenisalasan = siswa_keluar.id_jenisalasan`, function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data siswa keluar berdasarkan id
exports.viewSiswaKeluarById = function(req,res){
    let id_siswa = req.params.id_siswa;
    connection.query(`SELECT id_siswakeluar, id_siswa, siswa_keluar.id_jenisalasan, DATE_FORMAT(tgl_keluar, '%Y-%m-%d') AS 
                        tgl_keluar, keterangan
                        FROM siswa_keluar INNER JOIN jenis_alasan ON jenis_alasan.id_jenisalasan = siswa_keluar.id_jenisalasan WHERE id_siswa = ?`, [id_siswa],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewSiswaKeluarLastId = function(req,res){
    connection.query(`SELECT id_siswakeluar, id_siswa, id_jenisalasan, DATE_FORMAT(tgl_keluar, '%Y-%m-%d') AS tgl_keluar, 
                        keterangan FROM siswa_keluar ORDER BY id_siswakeluar DESC LIMIT 1`,
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data siswa keluar
exports.addSiswaKeluar = function(req,res){

    var id_siswakeluar      = req.body.id_siswakeluar;
    var id_siswa            = req.body.id_siswa;
    var id_jenisalasan      = req.body.id_jenisalasan;
    var tgl_keluar          = req.body.tgl_keluar;
    var keterangan          = req.body.keterangan;

    connection.query('INSERT INTO siswa_keluar (id_siswakeluar, id_siswa, id_jenisalasan, tgl_keluar, keterangan) VALUES (?, ?, ?, ?, ?)',
        [id_siswakeluar, id_siswa, id_jenisalasan, tgl_keluar, keterangan],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data siswa keluar!",res)
            }
        }
    );

};

// update data siswa keluar
exports.updateSiswaKeluar = function(req,res) {

    var id_siswakeluar      = req.body.id_siswakeluar;
    var id_jenisalasan      = req.body.id_jenisalasan;
    var tgl_keluar          = req.body.tgl_keluar;
    var keterangan          = req.body.keterangan;

    connection.query('UPDATE siswa_keluar SET id_jenisalasan=?, tgl_keluar=?, keterangan=? WHERE id_siswakeluar=?',
        [id_jenisalasan, tgl_keluar, keterangan, id_siswakeluar],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data siswa keluar!",res)
            }
        }

    );
};

// delete siswa keluar
exports.deleteSiswaKeluar = function(req,res) {

    var id_siswakeluar = req.params.id_siswakeluar;

    connection.query('DELETE FROM siswa_keluar WHERE id_siswakeluar=?',
        [id_siswakeluar],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data siswa keluar!",res)
            }
        }

    );

};