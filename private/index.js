const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const config = require(`${__dirname}/config.js`);

const app = express();

const port = 3000;
app.listen( port, () => { console.log('Server listening on port 3000.'); } );

