// import module mysql
var mysql = require('mysql');

// mmebuat koneksi
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bsp_siswa"
});

// test koneksi
conn.connect((err) =>{
    if(err) throw err;
    console.log("MySQL Connected!");
});

// export variabel conn utk digunakan pada file lain
module.exports = conn;