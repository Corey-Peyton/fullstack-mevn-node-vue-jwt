'use strict';

// import function file response
var response = require('./../response');
// import function file connection
var connection = require('./../connection');

exports.index = function(req,res){
    response.ok("REST API app succesfully loaded!",res)
};