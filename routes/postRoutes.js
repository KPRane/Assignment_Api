const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const controller = require('../controller/empController')
const jwt = require("jsonwebtoken");
const jwtSecret = "wewr32vsdfgswfwr2343ert";

const employeemodel = require('../db/EmployeeSchema')
function autenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        res.json({ "err": 1, "msg": "Token not match" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ "err": 1, "msg": "Token incorrect" })
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}
const { check, validationResult } = require('express-validator');
router.get("/get", (req, res) => {

    controller.getPost()
    res.send("Working!!")
})
router.post("/login", [
    check('name').isLength({ min: 3 }),

    check('pass').isNumeric().isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let name = req.body.name;
    let pass = req.body.pass;


    employeemodel.findOne({ name: name, pass: pass }, (err, data) => {
        if (err) {
            res.json({ "err": 1, "msg": "Username and Password is not correct" })
        }
        else if (data == null) {
            res.json({ "err": 1, "msg": "Username and Password is not correct" })
        }
        else {
            let payload = {
                uid: name
            }
            const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 })
            res.json({ "err": 0, "msg": "Login Success", "token": token })
        }
    })
    // controller.login(name, pass)

})
router.post("/post", autenticateToken, [
    check('name', 'Usename is not valid').isLength({ min: 3 }),

    check('pass', 'Password must be greater than 6 letter').isNumeric().isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail().normalizeEmail(),
], (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let name = req.body.name;
    let pass = req.body.pass
    let email = req.body.email
    controller.postdata(name, pass, email)
    res.send("DATA ADDED SUCCESFULLY")
})
router.put("/update/:id", autenticateToken, [
    check('name', 'Usename is not valid').isLength({ min: 3 }),

    check('pass', 'Password must be greater than 6 letter').isNumeric().isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail().normalizeEmail(),
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let id = req.params.id
    let name = req.body.name
    let pass = req.body.pass
    let email = req.body.email
    controller.editdata(id, name, pass, email)
    res.send("DATA UPDATED SUCCESFULLY")
})
router.delete("/delete/:id", autenticateToken, (req, res) => {

    let id = req.params.id
    controller.deletedata(id)
    res.send("DATA DELETED SUCCESFULLY")
})




module.exports = router;