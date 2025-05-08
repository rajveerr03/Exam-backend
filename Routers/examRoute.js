const express = require("express");
const { createExam, getAllExams, getExamById, getExamsByFacultyId, getExamBySubjectId, deleteExam } = require("../Controllers/examController");
// const { upload } = require("../Connection/cloudinary");
const upload = require("../Connection/multer")
const router = express.Router();


router.post("/exam" , upload.single("paper") , createExam);
router.get("/exam", getAllExams);
router.get("/exam/:id" , getExamById);
router.get("/exam/fauculty/:facultyId", getExamsByFacultyId);
router.get("/exam/subject/:subjectId", getExamBySubjectId);
router.delete("/exam/:id", deleteExam);

module.exports = router;