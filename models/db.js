const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(!err) { console.log("MongoDB connection succeeded")}
    else{ console.log("Couldn't connect to MongoDB: ", err) }
});

require('./employee.model');