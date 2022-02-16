const express=require('express');
const app=express();

const errorHandler=require('./middleware/errorHandler');
const connectDB=require('./db/connection');
const bodyParser=require('body-parser')
PORT=8001

//database connection
connectDB();
const userRoute=require('./routes/user');
const classRoute=require('./routes/class');

//external middlewares
app.use(bodyParser.json());//    application/json parser

//all routes
app.use('/api/v1/user',userRoute);
app.use('/api/v1/class',classRoute);
app.use(errorHandler);

app.listen(PORT,console.log('server started listening'))