const subject = require("../Models/subjectModel");

const createSubject = async (req, res) => {
    try {
        let { name, code, type, semester, year, facultyId , department } = req.body;

        let newSubject = new subject({
            name,
            code,
            type,
            semester,
            year,
            facultyId,
            department,
            status: "Pending",
            paper: null
        });
        let savedSubject = await newSubject.save();

        res.send({
            success: true,
            message: "Subject created successfully",
            data: savedSubject
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Error creating subject",
            error: error.message
        })
    }
}

let getAllSubjects = async (req, res) => {
    try {
        let subjects = await subject.find({})
        res.send({
            success: true,
            message: "Subjects fetched successfully",
            data: subjects
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Error fetching subjects",
            error: error.message
        })
    }
}

let getSubjectByFacultyId = async (req, res) => {
    try {
        let { facultyId } = req.params;
        let subjects = await subject.find({ facultyId })
        res.send({
            success: true,
            message: "Subjects fetched successfully",
            data: subjects
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Error fetching subjects",
            error: error.message
        })
    }
}

let deleteSubject = async (req, res) => {
    try {
        let { subjectId } = req.params;
        let deletedSubject = await subject.findByIdAndDelete(subjectId);
        if (!deletedSubject) {
            res.send({
                success: false,
                message: "Subject not found"
            });
        }
        res.send({
            success: true,
            message: "Subject deleted successfully",
            data: deletedSubject
        })
    }
    catch (error) {
        res.send({
            success: false,
            message: "Error deleting subject",
            error: error.message
        })
    }
}

module.exports = { createSubject, getAllSubjects, getSubjectByFacultyId , deleteSubject };