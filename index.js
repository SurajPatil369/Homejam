const express=require('express');
const app=express();
const userRoutes=require('./routes/user');

const connectDB=require('./db/connection');
PORT=8001

//database connection
connectDB();

//all routes
app.use('/api/v1/user',userRoutes)

app.listen(PORT,console.log('server started listening'))