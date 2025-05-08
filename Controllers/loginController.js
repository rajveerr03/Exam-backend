const register = require('../Models/registerModel');
const { sendOTPEmail } = require('../utils/email'); 


const otpStore = {};
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

let login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body)
        const user = await register.findOne({ email });
        const userPassword = await register.findOne({ password });

        if (!user || !userPassword) {
            res.send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        console.log(user)
        if( user.role !== "admin"){
            const active = await user.action;
            if (active !== "Accepted") {
                return res.send({
                    success: false,
                    message: "User is not active",
                });
            }
            
            
            // const otp = 123456;
            const otp = generateOTP();
            const expires = Date.now() + 5 * 60 * 1000;
            
            otpStore[email] = { otp, expires };
            // console.log(user)
            await sendOTPEmail(email, otp, user.name);
        }
            
        res.send({
            success: true,
            message: "OTP sent to email"
        });

    } catch (err) {
        console.log("Login Error:", err);
        res.send({
            success: false,
            message: "An error occurred during login",
        });
    }
}

let verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;
        
        const user = await register.findOne({ email });

        const record = otpStore[email];

        if (!record) return res.send({ 
            success:false,
            message: "No OTP found" 
        });

        if (record.expires < Date.now())
            return res.send({ success:false, message: "OTP expired" });

        if (record.otp != otp) return res.send({success:false, message: "Invalid OTP" });

        res.send({
            success:true,
            message: "OTP verified",
            userId : user._id,
            role : user.role,
        });

    } catch (err) {
        res.send({
            success: false,
            message: err.message || "Server Error",
        });
    }
}


let resetReq = async (req, res) => {

    try {
        const { email , employeeId } = req.body;
        // console.log(req.body)
        const user = await register.findOne({ email });
        const id = await register.findOne({ employeeId })

        if (!user || !id ) return res.send({
            success : false,
            message: "User not found"
        });

        // const otp = 123456;
        const otp = generateOTP();
        const expires = Date.now() + 5 * 60 * 1000;

        otpStore[email] = { otp, expires };

        await sendOTPEmail(email, otp , user.name);

        res.send({
            success: true,
            message: "OTP sent to email"
        });

    } catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: err.message || "Server Error",
        });
    }

}

let resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // let hashPassword = await bcrypt.hash(newPassword , 10)

        await register.findOneAndUpdate({ email }, { password: newPassword});
        delete otpStore[email];

        res.send({
            success:true,
            message: "Password reset successful"
        });
    }
    catch (err) {
        console.log(err)
        res.send({
            success: false,
            message: err.message || "Server Error",
        });
    }
}


module.exports = { login , verifyOtp , resetReq , resetPassword };
