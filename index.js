const express = require('express');
const app = new express();

app.use(express.static(__dirname + '/dist/shoepping'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/dist/shoepping/index.html');
});

//////////////////// IN  CASE OF  EMERGENCY ////////////////////////////
// app.use(cors()); /////

const PORT = process.env.PORT || 80;

app.listen(PORT, () =>{
    console.log('Server running at port ${PORT}');
}) 