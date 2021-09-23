const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = 3030;

app.get('/', (req, res) =>{
    res.send('This is being fetched from the backend');
});

app.listen(PORT, () =>{
    console.log(`Backend started on port ${PORT}`);
});