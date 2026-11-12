
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Employee name is required"],
        minlength: [3, "Name must contain at least 3 characters"],
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Enter a valid email address"
        ]
    },

    salary: {
        type: Number,
        required: [true, "Salary is required"],
        min: [1, "Salary must be greater than zero"]
    },

    department: {
        type: String,
        required: [true, "Department is required"],
        enum: {
            values: ["IT", "HR", "Finance", "Marketing"],
            message: "Select a valid department"
        }
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Employee", employeeSchema);
