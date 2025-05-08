const department = require('../Models/departmentModel');

const createDepartment = async (req, res) => {
    try {
    
        console.log(req.body)
        let { departmentName } = req.body;
    
        let departmentData = new department({
            departmentName
        });
        await departmentData.save();
        res.send({
            success: true,
            message: "Department created successfully",
            data: departmentData
        });
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: "Error on creating department",
            error: err.message
        });
    }
}

let getAllDepartments = async (req, res) => {
    try {
        let departments = await department.find({});
        res.send({
            success: true,
            message: "Departments fetched successfully",
            data: departments
        });
    } catch (err) {
        console.log(err);
        res.send({
            success: false,
            message: "Error on fetching departments",
            error: err.message
        });
    }
}

module.exports = { createDepartment , getAllDepartments };