
const express = require("express");

const router = express.Router();

const employeeController = require("../controllers/employeeController");

// READ
router.get("/", employeeController.getEmployees);

// CREATE
router.get("/create", employeeController.createForm);
router.post("/create", employeeController.createEmployee);

// UPDATE
router.get("/edit/:id", employeeController.editForm);
router.post("/edit/:id", employeeController.updateEmployee);

// DELETE
router.post("/delete/:id", employeeController.deleteEmployee);

module.exports = router;
