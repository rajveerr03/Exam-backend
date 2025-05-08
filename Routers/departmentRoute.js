const express = require('express');
const { createDepartment, getAllDepartments } = require('../Controllers/departmentController');
const router = express.Router();

router.post("/department", createDepartment)
router.get("/department", getAllDepartments)


module.exports = router;