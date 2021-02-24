// 'use strict' adalah fitur di ES5 yang mengaharuskan penulisan program menggunakan strict mode, maksudnya jika kita ingin menulis variabel ataupun fungsi harus di definisikan terlebih dahulu menggunakan kata var atau function.
'use strict';

// function response
exports.ok = function(values, res){
    var data = {
        'status': 200,
        'values': values
    };
     res.json(data);
     res.end();
}