const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
module.exports = app;


