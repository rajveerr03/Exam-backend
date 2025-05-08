const express = require('express');
const { createSubject, getAllSubjects, getSubjectByFacultyId, deleteSubject } = require('../Controllers/subjectConteroller');
const router = express.Router();

router.post('/subject', createSubject);
router.get('/subject', getAllSubjects);
router.get('/subject/:facultyId', getSubjectByFacultyId);
router.delete('/subject/:subjectId', deleteSubject );

module.exports = router;