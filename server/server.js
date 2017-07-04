const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');
const api = require('./routes');
const app = express();
app.use(cors());
const port = process.env.Port || 3000;
app.set('secret', config.secret);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log(`Server running on localhost:${port}`));
