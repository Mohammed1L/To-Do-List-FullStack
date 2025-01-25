 const express = require('express');
 const app = express();
 const cors = require('cors');
 require('dotenv').config();
 const mongoose = require('mongoose')
 const authRoutes = require('./route/authRoutes')
 const toDoRoute = require('./route/ToDoRoutes')
const PORT = process.env.PORT || 5000; // if .env file is not added 5000 will be used
app.use(cors());
app.use(express.json());

app.use('/api',authRoutes); 
app.use('/api/todo', toDoRoute); // prefix for autRoute will always be /api
mongoose.connect(process.env.DB_URL).then((result)=>{
    console.log("MongoDb Connected")}).catch(err=>{
        console.log.apply(err);
    })



app.listen(PORT,()=>{
    console.log('Server starting at port ' + PORT)
})