const express = require('express');
const cors = require('cors');
const app = express();
const port =process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{

    res.send('find job server is runing')
})

app.listen(port,() => {
    console.log (`job find server is runing on port ${port} `)
})