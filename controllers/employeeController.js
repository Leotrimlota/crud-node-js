const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", { 
        viewTitle: "Insert Employee" 
    })
});

router.post('/', (req, res) => {
    if(req.body._id == ""){
        insertRecord(req, res);
    }else{
        updateRecord(req, res);
    }
});

function insertRecord(req, res) {
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc)=>{
        if(!err){
            res.redirect('employee/list');
        }else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle : "Insert Employee",
                    employee : req.body
                })
            }
            console.log("Error during insert record: ",err);
        }
    })
}

function updateRecord(req,res){
    Employee.findOneAndUpdate({_id : req.body._id},req.body, (err,doc)=> {
        if(!err){ 
            res.redirect("employee/list")
        }else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit",{
                    viewTitle : "Update Employee",
                    employee : req.body
                })
            }
            console.log("Error during update record: ",err);
        }
    } )
}

router.get('/list', (req, res)=>{
    Employee.find({}).lean().exec((err, doc)=>{
        if(!err){
            res.render("employee/list",{
                list : doc,
            })
        }else{
            console.log("Error in retrieving employee list : ", err)
        }
    })
})

function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case "fullName":
                body['fullNameError'] = err.errors[field].message;
            case "email":
                body['emailError'] = err.errors[field].message;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res)=>{
    Employee.findById(req.params.id).lean().exec((err,doc)=>{
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle : "Update Employee",
                employee : doc,
            })
        }
    })
})

router.get('/delete/:id', (req, res)=>{
    Employee.findByIdAndRemove(req.params.id).lean().exec((err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }else{
            console.log("Error in deleting employee: ", err)
        }
    })
})
module.exports = router;