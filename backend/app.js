const express = require('express');
const {connectDB} = require('./database/db');
const router = require('./routes/expRouter');
const cors = require('cors');

const app = express()
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/exp",router);

app.listen(4000, ()=>{
    console.log("Server is Running")
})