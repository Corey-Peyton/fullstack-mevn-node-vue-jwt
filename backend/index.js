// import module express js
const express = require('express');
// import module body parser
const bodyParser = require('body-parser');
// import cors
const cors = require('cors');
// fungsi global untuk memanggil fungsi express
const app = express();
// use cors
app.use(cors());

// parser aplication
app.use(bodyParser.urlencoded({extended: true}));
// parser json
app.use(bodyParser.json());

// memanggil route dari file routes.js
var routes = require('./routes');
routes(app);

// set port
app.listen(8800, () => {
    console.log(`Server started on port 8800`);
});