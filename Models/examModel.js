const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    subjectId: String,
    facultyId: String,
    date: String,
    type: String,
    paper: String,
}, { timestamps: true });

let exam = mongoose.model('Exam', examSchema);

module.exports = exam;