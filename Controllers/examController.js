const exam = require("../Models/examModel");
const subject = require("../Models/subjectModel")

let createExam = async (req, res) => {
    try {
        let { subjectId, facultyId, date, type } = req.body;

        // console.log(req.file)

        let paper  = req.file.path

        let newExam = new exam({
            subjectId,
            facultyId,
            date,
            type,
            paper
        });
        let savedExam = await newExam.save();

        let data = {
            paper,
            status : "Submitted"
        }

        let updateSubject = await subject.findByIdAndUpdate(subjectId , data )

        res.send({
            success: true,
            message: "Exam created successfully",
            data: savedExam
        })

    } catch (error) {
        res.send({
            success: false,
            message: "Error creating exam",
            error: error.message
        })
    }
}

let getAllExams = async (req, res) => {
    try{
        let exams = await exam.find();
        res.send({
            success: true,
            message: "Exams fetched successfully",
            data: exams
        })
    }
    catch (error) {
        res.send({
            success: false,
            message: "Error fetching exams",
            error: error.message
        })
    }
}

let getExamById = async (req, res) => {
    try {
        let { id } = req.params;
        let examData = await exam.findById(id);
        if (!examData) {
            return res.send({
                success: false,
                message: "Exam not found"
            })
        }
        res.send({
            success: true,
            message: "Exam fetched successfully",
            data: examData
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Error fetching exam",
            error: error.message
        })
    }
}

let getExamsByFacultyId = async (req, res) => {
    try{
        let { facultyId } = req.params;
        let exams = await exam.find({ facultyId });
        if (exams.length === 0) {
            return res.send({
                success: false,
                message: "No exams found for this faculty"
            })
        }
        res.send({
            success: true,
            message: "Exams fetched successfully",
            data: exams
        })
    }catch (error) {
        res.send({
            success: false,
            message: "Error fetching exams",
            error: error.message
        })
    }
}

let getExamBySubjectId = async (req, res) => {
    try{

        let { subjectId } = req.params;
        let exams = await exam.find({ subjectId });
        if (exams.length === 0) {
            return res.send({
                success: false,
                message: "No exams found for this subject"
            })
        }
        res.send({
            success: true,
            message: "Exams fetched successfully",
            data: exams
        })

    }catch (error) {
        res.send({
            success: false,
            message: "Error fetching exam",
            error: error.message
        })
    }
}

let deleteExam = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedExam = await exam.findByIdAndDelete(id);
        if (!deletedExam) {
            return res.send({
                success: false,
                message: "Exam not found"
            })
        }
        res.send({
            success: true,
            message: "Exam deleted successfully",
            data: deletedExam
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Error deleting exam",
            error: error.message
        })
    }
}

module.exports = { createExam, getAllExams, getExamById, getExamsByFacultyId, getExamBySubjectId, deleteExam };