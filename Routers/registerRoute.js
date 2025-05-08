const express = require('express');
const { createRegister, getAllRegister, getRegisterById, updateRegister, deleteRegister, updateActive } = require('../Controllers/registercontroller');
const router = express.Router();

router.post("/register", createRegister)
router.get("/register", getAllRegister)
router.get("/register/:id", getRegisterById)
router.put("/register/:id", updateRegister)
router.delete("/register/:id", deleteRegister)
router.patch("/register/:id", updateActive)

module.exports = router;