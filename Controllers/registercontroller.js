const register = require('../Models/registerModel');
const { sendStatusEmail } = require('../utils/email');

let createRegister = async (req, res) => {
    try{

        let { name, employeeId, email, mobile, role, department, password } = req.body;

        const user = await register.findOne({ email });

        // if (user.role === role) return res.send({
        //     success : false,
        //     message: "User Already Exist"
        // });

        let registerData = new register({
            name,
            employeeId,
            email,
            mobile,
            role,
            department,
            password,
            action: null
        });
        await registerData.save();
        res.send({
            success: true,
            message: "Register created successfully",
            data: registerData
        });

    }catch(err){
        console.log(err);
        res.send({
            success: false,
            message: "Error on creating register",
            error: err.message
        });
    }
}

let getAllRegister = async (req, res) => {
    try{
        let registerData = await register.find();
        res.send({
            success: true,
            message: "All register data",
            data: registerData
        });
    }catch(err){
        console.log(err);
        res.send({
            success: false,
            message: "Error on getting all register data",
            error: err.message
        });
    }
}

let getRegisterById = async (req, res) => {
    try{
        let { id } = req.params;
        let registerData = await register.findById(id);
        res.send({
            success: true,
            message: "Register data",
            data: registerData
        });
    }catch(err){
        console.log(err);
        res.send({
            success: false,
            message: "Error on getting register data",
            error: err.message
        });
    }
}

let updateRegister = async (req, res) => {  
    try{
        let { id } = req.params;
        let { name, employeeId, email, mobile, role, department, password } = req.body;
        let registerData = await register.findByIdAndUpdate(id, {
            name,
            employeeId,
            email,
            mobile,
            role,
            department,
            password
        }, { new: true });
        res.send({
            success: true,
            message: "Register updated successfully",
            data: registerData
        });
    }catch(err){
        console.log(err);
        res.send({
            success: false,
            message: "Error on updating register",
            error: err.message
        });
    }
}

let deleteRegister = async (req, res) => {
    try{
        let { id } = req.params;
        let registerData = await register.findByIdAndDelete(id);
        res.send({
            success: true,
            message: "Register deleted successfully",
            data: registerData
        });
    }catch(err){
        console.log(err);
        res.send({
            success: false,
            message: "Error on deleting register",
            error: err.message
        });
    }
}

let updateActive = async (req, res) => {
    try{
        let { id } = req.params;
        let { action } = req.body;
        let registerData = await register.findByIdAndUpdate(id, {
            action
        }, { new: true });

        if (action === "Accepted" || action === "Rejected") {
            await sendStatusEmail(registerData.email, registerData.name, action);
          }

       if(action === "Accepted"){
            res.send({
                success: true,
                message: "Register approved successfully",
                data: registerData
            });
        }else{
            res.send({
                success: true,
                message: "Register rejected successfully",
                data: registerData
            });
        }

    }catch(err){
        console.log(err);
        res.send({
            success: false,
            message: "Error on approving register",
            error: err.message
        });
    }
}

module.exports = { createRegister , getAllRegister , getRegisterById, updateRegister, deleteRegister, updateActive };