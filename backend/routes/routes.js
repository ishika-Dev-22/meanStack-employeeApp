const express = require('express');
const router = express.Router();


const ObjectId = require('mongoose').Types.ObjectId;
const Employee = require('../models/employee.js');

//base path: http://localhost:3000/employee

//get APi
router.get('/', (req, res) => {
    Employee.find((err,doc)=>{
        if(err){
            console.log("error in get data"+err);
        }else{
            res.send(doc);
        }
    })
});

//single user get API call
router.get('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){

        Employee.findById(req.params.id, (err,doc)=>{
            if(err){
                console.log("error in get emplyee by id data"+err);
            }else{
                res.send(doc);
            }
        })
    }else{
        return res.status(400).send("No record found with id" + req.params.id);
    }
});

//delete Api
router.delete('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){

        Employee.findByIdAndRemove(req.params.id, (err,doc)=>{
            if(err){
                console.log("error in delete employee by id data"+err);
            }else{
                res.send(doc);
            }
        })
    }else{
        return res.status(400).send("No record found with id" + req.params.id);
    }
});

//Put API

router.put('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        let emp = {
            name: req.body.name,
            designation: req.body.designation,
            department: req.body.department
        };

        Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err,doc)=>{
            if(err){
                console.log("error in delete employee by id data"+err);
            }else{
                res.send(doc);
            }
        })
    }
})

//Post Api
router.post('/', (req, res) => {
    let emp = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        department: req.body.department
    });

    emp.save((err,doc) => {
        if(err){
            console.log("error in post data"+err);
        }else{
            res.send(doc);
        }
    })
})
module.exports = router;