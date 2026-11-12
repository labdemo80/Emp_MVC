
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// EJS configuration
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static("public"));

// Employee routes
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/employees", employeeRoutes);

// Home page
app.get("/", (req, res) => {
    res.redirect("/employees");
});

// 404 page
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Start server after database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();