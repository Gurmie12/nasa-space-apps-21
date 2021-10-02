const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const auth = require('./auth');
const app = express();
const PORT = 3030;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());
app.use('/posts', expressJwt({ secret: process.env.TOKEN_KEY,  algorithms: ['HS256'] }));
app.use('/auth', auth);


app.listen(PORT, () =>{
    console.log(`Backend started on port ${PORT}`);
});