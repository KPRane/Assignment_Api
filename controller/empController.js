const express = require('express');
const employeemodel = require('../db/EmployeeSchema')
function getPost() {
    console.log("Get Post Called")
    
}

async function login(name, pass) {
    // let ins = await new employeemodel({ name: name, pass: pass });
    // ins.save((err) => {
    //     if (err) {
    //         console.log(err)

    //         console.log("Already added")
    //     }
    //     else {

    //         console.log("ok")
    //     }
    // })
    // employeemodel.findOne({ name: name, pass: pass }, (err, data) => {
    //     if (err) {
    //         res.json({ "err": 1, "msg": "name and pass  is not correct" })
    //     }
    //     else {

    //         console.log("ok")
    //     }

    // })

}
async function postdata(name, pass, email) {
    let ins = await new employeemodel({ name: name, pass: pass, email: email });
    ins.save((err) => {
        if (err) {
            console.log(err)

            console.log("Already added")
        }
        else {

            console.log("DATA ADDED SUCESSFULLY")
        }
    })

}
async function editdata(id, name, pass, email) {
    await employeemodel.updateOne({ _id: id }, { $set: { name: name, pass: pass, email: email } }, (err) => {
        if (err) throw err;
        else {

            console.log("DATA UPDATED SUCESSFULLY")
        }
    })
}
async function deletedata(id) {
    await employeemodel.deleteOne({ _id: id }, (err) => {
        if (err) throw err
        console.log("DATA DELETED")
    })
}
module.exports = { getPost, postdata, editdata, deletedata, login }