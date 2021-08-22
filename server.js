require('./models/db');

const express = require('express');

const employeeController = require('./controllers/employeeController');

var app = express();

app.listen(3000, ()=> {
    console.log("Express server listening on port: 3000")
});

app.use('/employee', employeeController);