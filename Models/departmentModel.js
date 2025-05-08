const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: String,
}, { timestamps: true });

const department = mongoose.model('Department', departmentSchema);

module.exports = department;