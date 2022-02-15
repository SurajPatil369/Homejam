const express=require('express');
const app=express();

const connectDB=require('./db/connection');
PORT=8001

//database connection
connectDB();

app.listen(PORT,console.log('server started listening'))