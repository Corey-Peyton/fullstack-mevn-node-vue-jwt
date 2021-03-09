'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

exports.loginUser = function(req, res, next) {
connection.query(
    `SELECT * FROM users WHERE username = ${connection.escape(req.body.username)};`,
    (err, result) => {
    // user does not exists
    // if (err) {
    //     throw err;
    //     return res.status(400).send({
    //     msg: err
    //     });
    // }

    if (!result.length) {
        return res.status(401).send({
        msg: 'Username or password is incorrect!'
        });
    }

    // check password
    bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
        // wrong password
        // if (bErr) {
        //     throw bErr;
        //     return res.status(401).send({
        //     msg: 'Username or password is incorrect!'
        //     });
        // }

        if (bResult) {
            // header, payload, signature
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
            },
            'SECRETKEY', {
                expiresIn: '1d'
            }
            );

            connection.query(
            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
            msg: 'Logged in!',
            token,
            user: result[0]
            });
        }
        return res.status(401).send({
            msg: 'Username or password is incorrect!'
        });
        }
    );
    }
);
};