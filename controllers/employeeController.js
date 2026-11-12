
const Employee = require("../models/Employee");

// READ: Display all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });

        res.render("employees/index", {
            employees,
            error: null,
            success: null
        });

    } catch (error) {
        res.status(500).send("Unable to fetch employees");
    }
};


// CREATE: Display employee form
exports.createForm = (req, res) => {
    res.render("employees/create", {
        error: null,
        employee: {}
    });
};


// CREATE: Insert employee
exports.createEmployee = async (req, res) => {
    try {
        await Employee.create({
            name: req.body.name,
            email: req.body.email,
            salary: req.body.salary,
            department: req.body.department
        });

        res.redirect("/employees?success=created");

    } catch (error) {
        res.status(400).render("employees/create", {
            error: error.code === 11000
                ? "Email already exists"
                : error.message,
            employee: req.body
        });
    }
};


// UPDATE: Display edit form
exports.editForm = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        res.render("employees/edit", {
            employee,
            error: null
        });

    } catch (error) {
        res.status(400).send("Invalid employee ID");
    }
};


// UPDATE: Save changes
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                salary: req.body.salary,
                department: req.body.department
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        res.redirect("/employees?success=updated");

    } catch (error) {
        const employee = {
            ...req.body,
            _id: req.params.id
        };

        res.status(400).render("employees/edit", {
            employee,
            error: error.code === 11000
                ? "Email already exists"
                : error.message
        });
    }
};


// DELETE: Remove employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        res.redirect("/employees?success=deleted");

    } catch (error) {
        res.status(400).send("Unable to delete employee");
    }
};
