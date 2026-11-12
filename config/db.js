
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Atlas Connected Successfully");
    } catch (error) {
        console.log("Database Connection Failed:", error.message);
        throw error;
    }
};

module.exports = connectDB;
