const mongoose = require('mongoose');

const connection = async () => {   
    try {
        await mongoose.connect('mongodb+srv://rathorerajveer854:3eWddTAVv7brG1e2@examportal.3gnq3ee.mongodb.net/' );
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

module.exports = connection;