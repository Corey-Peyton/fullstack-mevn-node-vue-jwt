'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

// select semua siswa
exports.viewSiswa = function(req,res){
    connection.query(`SELECT
	A.id_siswa, A.nama_lengkap, A.jenis_kelamin, CONCAT(A.tmp_lahir, ", ", DATE_FORMAT(A.tgl_lahir, "%d-%m-%Y")) AS tempat_tgl_lahir,
	B.nama_ayah, E.nama_ibu, f.nama_wali,
	CONCAT(A.alamat_lengkap, " dusun ", A.nama_dusun, " RT ", A.no_rt, " RW ", A.no_rw, " kelurahan ", C.kelurahan, " Kecamatan ", D.kecamatan) AS alamat_lengkap_banget
FROM siswa A
	LEFT JOIN ayah B ON B.id_ayah=A.id_ayah
	INNER JOIN kelurahan C ON A.id_kelurahan=C.id_kelurahan
	INNER JOIN kecamatan D ON C.id_kecamatan=D.id_kecamatan
	LEFT JOIN ibu E ON A.id_ibu=E.id_ibu
    LEFT JOIN wali F ON A.id_wali=F.id_wali
WHERE A.id_siswa NOT IN (SELECT id_siswa FROM siswa_keluar)
ORDER BY A.nama_lengkap ASC`, function(error, rows, field){
    if(error){
        connection.log(error);
    } else {
        response.ok(rows,res)
    }
    });
};

// select data siswa berdasarkan id
exports.viewSiswaById = function(req,res){
    let id_siswa = req.params.id_siswa;
    connection.query(`SELECT *, DATE_FORMAT(siswa.tgl_lahir, '%Y-%m-%d') AS tgl_lahir FROM siswa 
                        INNER JOIN agama ON agama.id_agama = siswa.id_agama
                        INNER JOIN disabilitas ON disabilitas.id_disabilitas = siswa.id_disabilitas
                        INNER JOIN kelurahan ON kelurahan.id_kelurahan = siswa.id_kelurahan
                        INNER JOIN status_tinggal ON status_tinggal.id_statustinggal = siswa.id_statustinggal
                        INNER JOIN transportasi ON transportasi.id_transportasi = siswa.id_transportasi
                        INNER JOIN pip ON pip.id_pip = siswa.id_pip
                        INNER JOIN bank ON bank.id_bank = siswa.id_bank
                        INNER JOIN ayah ON ayah.id_ayah = siswa.id_ayah
                        INNER JOIN ibu ON ibu.id_ibu = siswa.id_ibu
                        INNER JOIN wali ON wali.id_wali = siswa.id_wali
                        INNER JOIN siswa_masuk ON siswa_masuk.id_siswa = siswa.id_siswa
                        WHERE siswa.id_siswa = ?`, [id_siswa],
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewRekapSiswa = function(req,res){
    connection.query(`SELECT
                        CASE
                            WHEN umur > 7 AND jenis_kelamin='L' THEN 'Laki-Laki > 7 Tahun' 
                            WHEN umur > 7 AND jenis_kelamin='P' THEN 'Perempuan > 7 Tahun' 
                            WHEN umur > 7 AND (jenis_kelamin='L' OR jenis_kelamin='P') THEN 'Siswa > 7 Tahun'
                            WHEN umur < 6 AND jenis_kelamin='L' THEN 'Laki-Laki < 6 Tahun' 
                            WHEN umur < 6 AND jenis_kelamin='P' THEN 'Perempuan < 6 Tahun'
                            WHEN umur BETWEEN 6 and 7 AND jenis_kelamin='L' THEN 'Laki-Laki 6-7 Tahun'
                            WHEN umur BETWEEN 6 and 7 AND jenis_kelamin='P' THEN 'Perempuan 6-7 Tahun'
                            WHEN umur IS NULL THEN '(NULL)'
                        END as range_usia,
                    COUNT(*) AS jumlah
                    FROM (SELECT jenis_kelamin, TIMESTAMPDIFF(YEAR, tgl_lahir, CURDATE()) AS umur FROM siswa) as temp_table
                    GROUP BY range_usia`,
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewTotalSiswaL = function(req,res){
    connection.query(`SELECT COUNT(*) as total_laki FROM siswa WHERE jenis_kelamin='L'`,
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewTotalSiswaP = function(req,res){
    connection.query(`SELECT COUNT(*) as total_perempuan FROM siswa WHERE jenis_kelamin='P'`,
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewTotalSiswa = function(req,res){
    connection.query(`SELECT COUNT(*) as total_siswa FROM siswa`,
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

exports.viewSiswaLastId = function(req,res){
    connection.query('SELECT * FROM siswa ORDER BY id_siswa DESC LIMIT 1',
        function(error, rows, field){
            if(error){
                connection.log(error);
            } else {
                response.ok(rows,res)
            }
        }
    );
};

// add data siswa
exports.addSiswa = function(req,res){

    var id_siswa = req.body.id_siswa;
    var nama_lengkap = req.body.nama_lengkap;
    var jenis_kelamin = req.body.jenis_kelamin;
    var nisn = req.body.nisn;
    var nik = req.body.nik;
    var tmp_lahir = req.body.tmp_lahir;
    var tgl_lahir = req.body.tgl_lahir;
    var id_agama = req.body.id_agama;
    var kewarganegaraan = req.body.kewarganegaraan;
    var id_disabilitas = req.body.id_disabilitas;
    var alamat_lengkap = req.body.alamat_lengkap;
    var id_kelurahan = req.body.id_kelurahan;
    var nama_dusun = req.body.nama_dusun;
    var no_rt = req.body.no_rt;
    var no_rw = req.body.no_rw;
    var id_statustinggal = req.body.id_statustinggal;
    var id_transportasi = req.body.id_transportasi;
    var no_kps = req.body.no_kps;
    var id_pip = req.body.id_pip;
    var no_kks = req.body.no_kks;
    var no_akta = req.body.no_akta;
    var id_bank = req.body.id_bank;
    var id_ayah = req.body.id_ayah;
    var id_ibu = req.body.id_ibu;
    var id_wali = req.body.id_wali;
    var no_telp = req.body.no_telp;
    var no_hp = req.body.no_hp;
    var email = req.body.email;

    connection.query('INSERT INTO siswa (id_siswa, nama_lengkap, jenis_kelamin, nisn, nik, tmp_lahir, tgl_lahir, id_agama, kewarganegaraan, id_disabilitas, alamat_lengkap, id_kelurahan, nama_dusun, no_rt, no_rw, id_statustinggal, id_transportasi, no_kps, id_pip, no_kks, no_akta, id_bank, id_ayah, id_ibu, id_wali, no_telp, no_hp, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id_siswa, nama_lengkap, jenis_kelamin, nisn, nik, tmp_lahir, tgl_lahir, id_agama, kewarganegaraan, id_disabilitas, alamat_lengkap, id_kelurahan, nama_dusun, no_rt, no_rw, id_statustinggal, id_transportasi, no_kps, id_pip, no_kks, no_akta, id_bank, id_ayah, id_ibu, id_wali, no_telp, no_hp, email],
        function(error, rows, field){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil menambah data siswa!",res)
            }
        }
    );

};

// update data siswa
exports.updateSiswa = function(req,res) {

    var id_siswa = req.body.id_siswa;
    var nama_lengkap = req.body.nama_lengkap;
    var jenis_kelamin = req.body.jenis_kelamin;
    var nisn = req.body.nisn;
    var nik = req.body.nik;
    var tmp_lahir = req.body.tmp_lahir;
    var tgl_lahir = req.body.tgl_lahir;
    var id_agama = req.body.id_agama;
    var kewarganegaraan = req.body.kewarganegaraan;
    var id_disabilitas = req.body.id_disabilitas;
    var alamat_lengkap = req.body.alamat_lengkap;
    var id_kelurahan = req.body.id_kelurahan;
    var nama_dusun = req.body.nama_dusun;
    var no_rt = req.body.no_rt;
    var no_rw = req.body.no_rw;
    var id_statustinggal = req.body.id_statustinggal;
    var id_transportasi = req.body.id_transportasi;
    var no_kps = req.body.no_kps;
    var id_pip = req.body.id_pip;
    var no_kks = req.body.no_kks;
    var no_akta = req.body.no_akta;
    var id_bank = req.body.id_bank;
    var id_ayah = req.body.id_ayah;
    var id_ibu = req.body.id_ibu;
    var id_wali = req.body.id_wali;
    var no_telp = req.body.no_telp;
    var no_hp = req.body.no_hp;
    var email = req.body.email;

    connection.query('UPDATE siswa SET nama_lengkap=?, jenis_kelamin=?, nisn=?, nik=?, tmp_lahir=?, tgl_lahir=?, id_agama=?, kewarganegaraan=?, id_disabilitas=?, alamat_lengkap=?, id_kelurahan=?, nama_dusun=?, no_rt=?, no_rw=?, id_statustinggal=?, id_transportasi=?, no_kps=?, id_pip=?, no_kks=?, no_akta=?, id_bank=?, id_ayah=?, id_ibu=?, id_wali=?, no_telp=?, no_hp=?, email=? WHERE id_siswa=?',
        [nama_lengkap, jenis_kelamin, nisn, nik, tmp_lahir, tgl_lahir, id_agama, kewarganegaraan, id_disabilitas, alamat_lengkap, id_kelurahan, nama_dusun, no_rt, no_rw, id_statustinggal, id_transportasi, no_kps, id_pip, no_kks, no_akta, id_bank, id_ayah, id_ibu, id_wali, no_telp, no_hp, email, id_siswa],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil update data siswa!",res)
            }
        }

    );
};

// delete siswa
exports.deleteSiswa = function(req,res) {

    var id_siswa = req.params.id_siswa;

    connection.query('DELETE FROM siswa WHERE id_siswa=?',
        [id_siswa],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data siswa!",res)
            }
        }

    );

};