const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./auth');
const logs = require('./logs');
const app = express();
const PORT = 3030;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());
app.use('/auth', auth);
app.use('/logs', logs);

app.listen(PORT, () =>{
    console.log(`Backend started on port ${PORT}`);
});