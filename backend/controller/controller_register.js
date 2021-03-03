'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

const bcrypt = require('bcryptjs');
const uuid = require('uuid');

exports.registerUser = function(req, res, next) {
connection.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${connection.escape(
    req.body.username
    )});`,
    (err, result) => {
    if (result.length) {
        return res.status(409).send({
        msg: 'This username is already in use!'
        });
    } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send({
            msg: err
            });
        } else {
            // has hashed pw => add to database
            connection.query(
            `INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4()}', ${connection.escape(
                req.body.username
            )}, ${connection.escape(hash)}, now())`,
            (err, result) => {
                if (err) {
                throw err;
                return res.status(400).send({
                    msg: err
                });
                }
                return res.status(201).send({
                msg: 'Registered!'
                });
            }
            );
        }
        });
    }
    }
);
};

exports.deleteUser = function(req,res) {

    var username = req.params.username;

    connection.query(`DELETE FROM users WHERE username=?`,
        [username],
        function(error, rows, fields){
            if(error){
                console.log(error);
            } else {
                response.ok("Berhasil delete data user!",res)
            }
        }

    );

};