const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, unique: true

    },
    pass: {
        type: Number,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("employee", EmployeeSchema);