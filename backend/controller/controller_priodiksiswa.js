'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua priodik siswa
exports.viewPriodikSiswa = function(req,res){
    connection.query("SELECT * FROM priodik_siswa", function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};


// select data priodik siswa berdasarkan id
exports.viewPriodikSiswaById = function(req,res){
    let id_siswa = req.params.id_siswa;
    connection.query('SELECT * FROM priodik_siswa WHERE id_siswa = ?', [id_siswa],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewPriodikSiswaLastId = function(req,res){
    connection.query('SELECT * FROM priodik_siswa ORDER BY id_priodik_siswa DESC LIMIT 1',
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data priodik siswa
exports.addPriodikSiswa = function(req,res){

    var id_priodik_siswa        = req.body.id_priodik_siswa;
    var id_siswa        = req.body.id_siswa;
    var tinggi_badan    = req.body.tinggi_badan;
    var berat_badan     = req.body.berat_badan;
    var jarak_kesekolah = req.body.jarak_kesekolah;
    var detail_jarak    = req.body.detail_jarak;
    var jml_saudarakandung = req.body.jml_saudarakandung;

    connection.query('INSERT INTO priodik_siswa (id_priodik_siswa, id_siswa, tinggi_badan, berat_badan, jarak_kesekolah, detail_jarak, jml_saudarakandung) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id_priodik_siswa, id_siswa, tinggi_badan, berat_badan, jarak_kesekolah, detail_jarak, jml_saudarakandung],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data priodik siswa!",res)
            }
        }
    );

};

// update data priodik siswa
exports.updatePriodikSiswa = function(req,res) {

    var id_priodik_siswa = req.body.id_priodik_siswa;
    var id_siswa        = req.body.id_siswa;
    var tinggi_badan    = req.body.tinggi_badan;
    var berat_badan     = req.body.berat_badan;
    var jarak_kesekolah = req.body.jarak_kesekolah;
    var detail_jarak    = req.body.detail_jarak;
    var jml_saudarakandung = req.body.jml_saudarakandung;

    connection.query('UPDATE priodik_siswa SET tinggi_badan=?, berat_badan=?, jarak_kesekolah=?, detail_jarak=?,  jml_saudarakandung=? WHERE id_siswa=?',
        [tinggi_badan, berat_badan, jarak_kesekolah, detail_jarak, jml_saudarakandung, id_siswa],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data priodik siswa!",res)
            }
        }

    );
};

// delete priodik siswa
exports.deletePriodikSiswa = function(req,res) {

    var id_siswa = req.params.id_siswa;

    connection.query('DELETE FROM priodik_siswa WHERE id_siswa=?',
        [id_siswa],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data priodik siswa!",res)
            }
        }

    );

};