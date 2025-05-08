const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    name: String,
    employeeId: String,
    email: String,
    mobile: String,
    role:String,
    department: String,
    password: String,
    action:String,
}, { timestamps: true });

const register = mongoose.model('Register', registerSchema);

module.exports = register;