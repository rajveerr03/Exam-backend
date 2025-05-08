const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    facultyId: String,
    department: String,
    name: String,
    code: String,
    type: String,
    semester: Number,
    year: Number,
    status: String,
    paper: String,
}, { timestamps: true });

const subject = mongoose.model('Subject', subjectSchema);

module.exports = subject;