const express=require('express');
const app=express();
const userRoutes=require('./routes/user');
const errorHandler=require('./middleware/errorHandler');
const connectDB=require('./db/connection');
const bodyParser=require('body-parser')
PORT=8001

//database connection
connectDB();

//external middlewares
app.use(bodyParser.json());//    application/json parser

//all routes
app.use('/api/v1/user',userRoutes)

app.use(errorHandler);

app.listen(PORT,console.log('server started listening'))